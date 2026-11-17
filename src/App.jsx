import { useState, useEffect, useRef } from 'react';
import './index.css';
import Landing from './components/Landing';
import PortfolioHeader from './components/PortfolioHeader';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activity from './components/Activity';
import Contact from './components/Contact';
import DeveloperPortfolio from './components/DeveloperPortfolio';

const isDeveloperPath = () => window.location.pathname.startsWith('/developer');

// GitHub usernames: alphanumerics and single hyphens, up to 39 chars
const USERNAME_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const RESERVED_PATHS = new Set(['developer']);

// Portfolio URLs look like /<username>. Anything else (/, /developer, /a/b) has no username.
const readUsernameFromPath = () => {
  const segments = window.location.pathname.split('/').filter(Boolean);
  if (segments.length !== 1) return '';
  let seg = segments[0];
  try { seg = decodeURIComponent(seg); } catch { return ''; }
  return USERNAME_RE.test(seg) && !RESERVED_PATHS.has(seg.toLowerCase()) ? seg : '';
};

// Old links looked like /?username=foo — redirect them to /foo once on load.
(() => {
  const params = new URLSearchParams(window.location.search);
  const legacyUser = (params.get('username') || '').trim();
  if (window.location.pathname === '/' && USERNAME_RE.test(legacyUser)) {
    window.history.replaceState({}, '', `/${legacyUser}`);
  }
})();

const friendlyError = (status, user) => {
  if (status === 404) return `We couldn't find a GitHub user named "${user}". Check the spelling and try again.`;
  if (status === 403 || status === 429) return 'GitHub rate limit reached (60 requests per hour without authentication). Please wait a while and try again.';
  return `GitHub returned an unexpected error (${status}). Please try again later.`;
};

function App() {
  // Initialise from the URL so a shared link shows the spinner immediately (no flash of the landing page)
  const [username, setUsername] = useState(readUsernameFromPath);

  const [inputUsername, setInputUsername] = useState('');

  // Phase 2 state
  const [loading, setLoading] = useState(() => !!readUsernameFromPath() && !isDeveloperPath());
  const [error, setError] = useState(null);
  const [githubData, setGithubData] = useState(null);

  const fetchGitHubData = async (user) => {
    setLoading(true);
    setError(null);
    setGithubData(null);
    try {
      // Check cache first
      const cacheKey = `githubData_v2_${user}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setGithubData(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const headers = { Accept: 'application/vnd.github.v3+json' };

      const getApi = (endpoint) => fetch(`https://api.github.com${endpoint}`, { headers }).then(res => {
        if (!res.ok) throw new Error(friendlyError(res.status, user));
        return res.json();
      });

      const [profile, repos, events] = await Promise.all([
        getApi(`/users/${encodeURIComponent(user)}`),
        getApi(`/users/${encodeURIComponent(user)}/repos?sort=pushed&per_page=100`),
        getApi(`/users/${encodeURIComponent(user)}/events?per_page=10`)
      ]);

      const data = { profile, repos, events };
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      setGithubData(data);
    } catch (err) {
      setError(err instanceof TypeError ? 'Network error. Please check your connection and try again.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load: fetch data for a username supplied in the URL
  useEffect(() => {
    if (username && !isDeveloperPath()) {
      fetchGitHubData(username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Browser back/forward: re-sync state from the URL
  useEffect(() => {
    const onPopState = () => {
      const urlUser = readUsernameFromPath();
      setUsername(urlUser);
      if (isDeveloperPath()) return;
      if (urlUser) {
        fetchGitHubData(urlUser);
      } else {
        setGithubData(null);
        setError(null);
        setLoading(false);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    if (!inputUsername.trim()) return;

    const name = inputUsername.trim().replace(/^@/, '');
    if (!USERNAME_RE.test(name)) return;

    window.history.pushState({}, '', `/${encodeURIComponent(name)}`);

    setUsername(name);
    fetchGitHubData(name);
  };


  const transformData = (data) => {
    if (!data) return null;
    const { profile, repos, events } = data;

    // Latest repositories: most recently pushed non-forks (or forks if all are forks)
    let projectContenders = repos.filter(r => !r.fork);
    if (projectContenders.length === 0) projectContenders = repos;
    const latestProjects = [...projectContenders]
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6);

    const mapProject = (p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      stars: p.stargazers_count,
      forks: p.forks_count,
      language: p.language,
      url: p.html_url,
      homepage: p.homepage,
      pushedAt: p.pushed_at,
    });

    // Skills
    const langCounts = {};
    repos.forEach(r => {
      if (r.language) {
        // size in GitHub repos API is generally KB but it works as a relative weight proxy
        langCounts[r.language] = (langCounts[r.language] || 0) + (r.size || 1);
      }
    });
    const rankedLangs = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);
    const langTotal = rankedLangs.reduce((sum, [, size]) => sum + size, 0) || 1;
    const topSkills = rankedLangs.map(([name, size]) => ({ name, pct: Math.max(1, Math.round((size / langTotal) * 100)) }));

    // Activity: last 5-10 meaningful events
    const meaningfulEvents = events.filter(e =>
      ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'ReleaseEvent', 'CreateEvent'].includes(e.type)
    ).slice(0, 10);

    // Links
    const links = [];
    if (profile.blog) {
      const url = profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`;
      links.push({ type: 'website', url });
    }
    if (profile.twitter_username) {
      links.push({ type: 'twitter', url: `https://twitter.com/${profile.twitter_username}`, label: `@${profile.twitter_username}` });
    }
    // Try to parse linkedin/twitter from bio
    if (profile.bio) {
      const liMatch = profile.bio.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/);
      if (liMatch && !links.some(l => l.type === 'linkedin')) {
        links.push({ type: 'linkedin', url: `https://${liMatch[0]}` });
      }
      const xMatch = profile.bio.match(/x\.com\/[a-zA-Z0-9_-]+/);
      if (xMatch && !links.some(l => l.type === 'twitter')) {
        links.push({ type: 'twitter', url: `https://${xMatch[0]}` });
      }
    }

    return {
      profile: {
        name: profile.name || profile.login,
        login: profile.login,
        avatar: profile.avatar_url,
        bio: profile.bio,
        location: profile.location,
        githubUrl: profile.html_url,
        followers: profile.followers,
        publicRepos: profile.public_repos,
        totalStars: repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0),
      },
      projects: latestProjects.map(mapProject),
      skills: topSkills,
      activity: meaningfulEvents,
      links
    };
  };

  const parsedPortfolio = transformData(githubData);


  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3000);
  };

  // Per-portfolio page title
  const portfolioName = parsedPortfolio?.profile.name;
  useEffect(() => {
    if (isDeveloperPath()) document.title = 'Mashroof PP — Developer Portfolio';
    else if (portfolioName) document.title = `${portfolioName} — Portfolio`;
    else document.title = 'PortfolioBuilder — Turn your GitHub into a portfolio';
  }, [portfolioName]);

  const handleGoBack = () => {
    window.history.pushState({}, '', '/');
    setError(null);
    setGithubData(null);
    setUsername('');
    setInputUsername('');
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast('Portfolio URL copied to clipboard!');
    } catch {
      showToast('Could not copy. Copy the URL from the address bar.');
    }
  };

  if (window.location.pathname.startsWith('/developer')) {
    return <DeveloperPortfolio />;
  }

  if (!username) {
    return <Landing handleStart={handleStart} inputUsername={inputUsername} setInputUsername={setInputUsername} />;
  }

  if (loading) {
    return (
      <div className="container loading-view" role="status" aria-live="polite">
        <div className="spinner"></div>
        <h2>Building portfolio for {username}…</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container loading-view">
        <div className="tile error-tile" role="alert">
          <h2>Couldn't load this portfolio</h2>
          <p>{error}</p>
          <button type="button" onClick={handleGoBack} className="btn">Try another username</button>
        </div>
      </div>
    );
  }

  if (!parsedPortfolio) return null;

  const { profile, projects, skills, links } = parsedPortfolio;

  return (
    <div className="container">
      <PortfolioHeader handleShare={handleShare} />
      <main className="pf">
        <aside className="pf-side">
          <Hero profile={profile} />
          <Contact links={links} />
        </aside>
        <div className="pf-main">
          <Skills skills={skills} />
          <Projects projects={projects} />
          {/* <Activity activity={activity} /> */}
        </div>
      </main>

      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}

export default App;
