import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGitHubData } from '../lib/github';
import {
  isValidUsername,
  normalizeUsername,
  pushHomePath,
  pushUserPath,
  readUsernameFromPath,
} from '../lib/routing';

// Owns everything about "which portfolio are we showing": the username (kept in sync with the URL),
// the loading/error state and the fetched data.
export default function usePortfolio() {
  const [username, setUsername] = useState(readUsernameFromPath);
  const [loading, setLoading] = useState(() => !!readUsernameFromPath());
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Incremented on every load/reset so a slow, older response can never overwrite a newer one.
  const requestId = useRef(0);

  const reset = useCallback(() => {
    requestId.current += 1;
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  const load = useCallback(async (user) => {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await fetchGitHubData(user);
      if (id === requestId.current) setData(result);
    } catch (err) {
      if (id === requestId.current) setError(err.message);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }, []);

  // Shared link opened directly: load the username from the URL.
  useEffect(() => {
    const initial = readUsernameFromPath();
    if (initial) load(initial);
  }, [load]);

  // Browser back/forward: re-sync from the URL.
  useEffect(() => {
    const onPopState = () => {
      const user = readUsernameFromPath();
      setUsername(user);
      if (user) load(user);
      else reset();
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [load, reset]);

  // Called from the landing form. Returns false if the input isn't a valid GitHub username.
  const start = useCallback((rawName) => {
    const name = normalizeUsername(rawName);
    if (!isValidUsername(name)) return false;
    pushUserPath(name);
    setUsername(name);
    load(name);
    return true;
  }, [load]);

  const goHome = useCallback(() => {
    pushHomePath();
    setUsername('');
    reset();
  }, [reset]);

  return { username, loading, error, data, start, goHome };
}
