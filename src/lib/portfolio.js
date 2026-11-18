// Pure functions that turn raw GitHub API data into what the UI displays.

const LATEST_LIMIT = 6;
const LANGUAGE_LIMIT = 8;

export const mapProject = (repo) => ({
  id: repo.id,
  name: repo.name,
  description: repo.description,
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  language: repo.language,
  url: repo.html_url,
  pushedAt: repo.pushed_at,
});

// Most recently pushed non-forks (or forks, if the user only has forks).
export function pickLatestRepos(repos, limit = LATEST_LIMIT) {
  const originals = repos.filter((r) => !r.fork);
  const pool = originals.length > 0 ? originals : repos;
  return [...pool].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, limit);
}

// Top languages as [{ name, pct }], weighted by repo size (KB is a fine relative proxy).
export function computeLanguages(repos, limit = LANGUAGE_LIMIT) {
  const sizes = {};
  repos.forEach((r) => {
    if (r.language) sizes[r.language] = (sizes[r.language] || 0) + (r.size || 1);
  });
  const ranked = Object.entries(sizes).sort((a, b) => b[1] - a[1]).slice(0, limit);
  const total = ranked.reduce((sum, [, size]) => sum + size, 0) || 1;
  return ranked.map(([name, size]) => ({ name, pct: Math.max(1, Math.round((size / total) * 100)) }));
}

export const sumStars = (repos) => repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

const hostnameOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return undefined;
  }
};

// Website, X/Twitter and LinkedIn links found on the profile.
export function extractLinks(profile) {
  const links = [];
  if (profile.blog) {
    const url = profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`;
    links.push({ type: 'website', url, label: hostnameOf(url) });
  }
  if (profile.twitter_username) {
    links.push({ type: 'twitter', url: `https://twitter.com/${profile.twitter_username}`, label: `@${profile.twitter_username}` });
  }
  if (profile.bio) {
    const linkedin = profile.bio.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/);
    if (linkedin) links.push({ type: 'linkedin', url: `https://${linkedin[0]}` });
    const x = profile.bio.match(/x\.com\/[a-zA-Z0-9_-]+/);
    if (x && !links.some((l) => l.type === 'twitter')) links.push({ type: 'twitter', url: `https://${x[0]}` });
  }
  return links;
}

export function buildPortfolio({ profile, repos }) {
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
      totalStars: sumStars(repos),
    },
    projects: pickLatestRepos(repos).map(mapProject),
    skills: computeLanguages(repos),
    links: extractLinks(profile),
  };
}
