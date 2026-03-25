import { useState, useEffect } from 'react';
import './index.css';
import Landing from './components/Landing';
import PortfolioHeader from './components/PortfolioHeader';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Activity from './components/Activity';
import Contact from './components/Contact';
import DeveloperPortfolio from './components/DeveloperPortfolio';

function App() {
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('light');
  
  const [inputUsername, setInputUsername] = useState('');
  
  // Phase 2 state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [githubData, setGithubData] = useState(null);

  const fetchGitHubData = async (user) => {
    setLoading(true);
    setError(null);
    try {
      // Check cache first
      const cacheKey = `githubData_${user}`;
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setGithubData(JSON.parse(cached));
        setLoading(false);
        return;
      }

      const headers = { Accept: 'application/vnd.github.v3+json' };

      const getApi = (endpoint) => fetch(`https://api.github.com${endpoint}`, { headers }).then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
        return res.json();
      });

      const [profile, repos, events] = await Promise.all([
        getApi(`/users/${user}`),
        getApi(`/users/${user}/repos?sort=stars&per_page=30`),
        getApi(`/users/${user}/events?per_page=10`)
      ]);

      const data = { profile, repos, events };
      sessionStorage.setItem(cacheKey, JSON.stringify(data));
      setGithubData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. Parse URL params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlUsername = params.get('username') || '';
    const urlMode = params.get('mode') || 'light';
    
    setUsername(urlUsername);
    setMode(urlMode);
    
    document.documentElement.setAttribute('data-theme', urlMode);
    
    const isDeveloperMode = window.location.pathname.startsWith('/developer');
    
    if (urlUsername && !isDeveloperMode) {
      fetchGitHubData(urlUsername);
    }
  }, []);

  const handleStart = (e) => {
    e.preventDefault();
    if (!inputUsername.trim()) return;

    const newUrl = new URL(window.location);
    newUrl.searchParams.set('username', inputUsername.trim());
    newUrl.searchParams.set('mode', mode);
    window.history.pushState({}, '', newUrl);

    setUsername(inputUsername.trim());
    fetchGitHubData(inputUsername.trim());
  };


  const transformData = (data) => {
    if (!data) return null;
    const { profile, repos, events } = data;

    // Top Projects: top 6 non-forks (or forks if all are forks) sorted by stars
    let projectContenders = repos.filter(r => !r.fork);
    if (projectContenders.length === 0) projectContenders = repos;
    const topProjects = projectContenders.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);

    // Skills
    const langCounts = {};
    repos.forEach(r => {
      if (r.language) {
        // size in GitHub repos API is generally KB but it works as a relative weight proxy
        langCounts[r.language] = (langCounts[r.language] || 0) + (r.size || 1); 
      }
    });
    const topSkills = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(entry => entry[0]);

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
        avatar: profile.avatar_url,
        bio: profile.bio,
        location: profile.location,
        githubUrl: profile.html_url,
        followers: profile.followers,
      },
      projects: topProjects.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        stars: p.stargazers_count,
        forks: p.forks_count,
        language: p.language,
        url: p.html_url,
        homepage: p.homepage
      })),
      skills: topSkills,
      activity: meaningfulEvents,
      links
    };
  };

  const parsedPortfolio = transformData(githubData);


  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode);
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('mode', newMode);
    window.history.pushState({}, '', newUrl);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Portfolio URL copied to clipboard!');
  };

  if (window.location.pathname.startsWith('/developer')) {
    return <DeveloperPortfolio mode={mode} toggleTheme={toggleTheme} handleShare={handleShare} />;
  }

  if (!username) {
    return <Landing handleStart={handleStart} inputUsername={inputUsername} setInputUsername={setInputUsername} />;
  }

  if (loading) {
    return (
      <div className="container loading-view">
        <div className="spinner"></div>
        <h2>Building portfolio for {username}...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container loading-view">
        <h2 style={{color: 'var(--error)'}}>Whoops! Error loading data.</h2>
        <p>{error}</p>
        <button onClick={() => window.location.href = '/'} className="btn-primary" style={{marginTop: '2rem', maxWidth: '200px'}}>Go Back</button>
      </div>
    );
  }

  if (!parsedPortfolio) return null;

  const { profile, projects, skills, activity, links } = parsedPortfolio;
  const isDeveloperMode = window.location.pathname.startsWith('/developer');

  return (
    <div className="container">
      <PortfolioHeader profile={profile} mode={mode} toggleTheme={toggleTheme} handleShare={handleShare} />
      <Hero profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Activity activity={activity} />
      <Contact links={links} />

      <div className={`toast ${toast ? 'show' : ''}`}>{toast}</div>
    </div>
  );
}

export default App;
