// GitHub REST API access: fetching, caching and error messages. No React in here.

const API_BASE = 'https://api.github.com';
const CACHE_PREFIX = 'githubData_v3_';

export function friendlyError(status, user) {
  if (status === 404) return `We couldn't find a GitHub user named "${user}". Check the spelling and try again.`;
  if (status === 403 || status === 429) {
    return 'GitHub rate limit reached (60 requests per hour without authentication). Please wait a while and try again.';
  }
  return `GitHub returned an unexpected error (${status}). Please try again later.`;
}

// sessionStorage can throw (private mode, quota), so a failure just means "no cache".
const cacheKey = (user) => `${CACHE_PREFIX}${user.toLowerCase()}`;

function readCache(user) {
  try {
    const raw = sessionStorage.getItem(cacheKey(user));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(user, data) {
  try {
    sessionStorage.setItem(cacheKey(user), JSON.stringify(data));
  } catch {
    /* ignore: caching is best-effort */
  }
}

async function getJson(endpoint, user) {
  const res = await fetch(`${API_BASE}${endpoint}`, { headers: { Accept: 'application/vnd.github.v3+json' } });
  if (!res.ok) throw new Error(friendlyError(res.status, user));
  return res.json();
}

// Resolves to { profile, repos } (repos sorted by most recently pushed). Throws Error with a user-facing message.
export async function fetchGitHubData(user) {
  const cached = readCache(user);
  if (cached) return cached;

  const encoded = encodeURIComponent(user);
  try {
    const [profile, repos] = await Promise.all([
      getJson(`/users/${encoded}`, user),
      getJson(`/users/${encoded}/repos?sort=pushed&per_page=100`, user),
    ]);
    const data = { profile, repos };
    writeCache(user, data);
    return data;
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error('Network error. Please check your connection and try again.');
    }
    throw err;
  }
}
