// URL handling. Portfolios live at /<username>.

// GitHub usernames: alphanumerics and single hyphens, up to 39 chars
export const USERNAME_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;

export const isValidUsername = (name) => USERNAME_RE.test(name);

// "  @torvalds " -> "torvalds"
export const normalizeUsername = (raw) => raw.trim().replace(/^@/, '');

// Returns the username in the current path, or '' for / and any non-username path (e.g. /a/b).
export function readUsernameFromPath() {
  const segments = window.location.pathname.split('/').filter(Boolean);
  if (segments.length !== 1) return '';
  let segment = segments[0];
  try {
    segment = decodeURIComponent(segment);
  } catch {
    return '';
  }
  return isValidUsername(segment) ? segment : '';
}

// Old links looked like /?username=foo — rewrite them to /foo. Call once before rendering.
export function redirectLegacyUrl() {
  const params = new URLSearchParams(window.location.search);
  const legacyUser = (params.get('username') || '').trim();
  if (window.location.pathname === '/' && isValidUsername(legacyUser)) {
    window.history.replaceState({}, '', `/${legacyUser}`);
  }
}

export const pushUserPath = (name) => window.history.pushState({}, '', `/${encodeURIComponent(name)}`);
export const pushHomePath = () => window.history.pushState({}, '', '/');
