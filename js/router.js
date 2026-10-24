/**
 * router.js: a tiny hash router.
 *
 * The part of the URL after # decides which screen shows:
 *   crestprep.com/#/results/r123  →  { name: 'results', params: ['r123'] }
 * Hash routing needs no server setup, so it works on any static host.
 */
let routeTable = {};

export function parseHash(hash = location.hash) {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  return { name: parts[0] || '', params: parts.slice(1) };
}

export function navigate(path) {
  location.hash = `#/${path}`;
}

/** main.js registers its route table, so other files can read it. */
export function registerRoutes(table) { routeTable = table; }
export const hasRoute = (name) => Boolean(routeTable[name]);

/** Tabs for the app bar: every route with a `tab` label, in table order. */
export const appTabs = () => Object.entries(routeTable).filter(([, r]) => r.tab).map(([name, r]) => [name, r.tab]);
