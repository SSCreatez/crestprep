/**
 * main.js: where the app starts.
 *
 * 1. The ROUTES table maps a URL (#/upload) to a view file. Each route with a
 *    `tab` shows up in the app bar automatically.
 * 2. render() reads the URL, checks sign-in, and draws that view.
 * 3. The store says when data changes, so the app bar (XP, coins, streak)
 *    stays live; a language or theme change re-draws the page.
 */
import { parseHash, navigate, registerRoutes } from './router.js';
import { getState, subscribe, isLoggedIn } from './store.js';
import { finishSignIn } from './auth.js';
import { renderTopbar, bindTopbar } from './components/topbar.js';
import { renderMath, toast } from './lib/dom.js';

import * as home from './views/home.js';
import * as dashboard from './views/dashboard.js';
import * as upload from './views/upload.js';
import * as player from './views/player.js';
import * as tests from './views/tests.js';
import * as cache from './views/cache.js';

const ROUTES = {
  '':       { view: home,      public: true },
  login:    { view: home,      public: true },     // #/login/<next>: sign in, then go to <next>
  home:     { view: dashboard, tab: 'app.home' },
  upload:   { view: upload,    tab: 'app.upload' },
  results:  { view: upload },                      // #/results/<id>: one test's breakdown
  cache:    { view: cache },                       // the Crest Cache: every test added so far
  practice: { view: player,    tab: 'app.practice' },
  session:  { view: player },                      // personal practice sets reuse the course player
  tests:    { view: tests,     tab: 'app.tests' },
};
registerRoutes(ROUTES);

const topbar = document.getElementById('topbar');
const viewRoot = document.getElementById('view');
let current = { name: '', params: [], route: ROUTES[''] };

function applyPrefs() {
  const { theme, lang } = getState().prefs;
  document.documentElement.dataset.theme = theme;
  document.documentElement.lang = lang;
}

function drawTopbar() {
  renderTopbar(topbar, { app: !current.route.public, active: current.name });
}

function render({ rerender = false } = {}) {
  const { name, params } = parseHash();
  const route = ROUTES[name];

  if (!route) return navigate(isLoggedIn() ? 'home' : '');                                 // unknown page
  if (!route.public && !isLoggedIn()) return navigate(['login', name, ...params].join('/')); // sign in first

  current = { name, params, route };
  applyPrefs();
  drawTopbar();

  const view = document.createElement('div');
  view.className = `view view-${name || 'start'}`;
  viewRoot.replaceChildren(view);
  route.view.render(view, { name, params, rerender });
  renderMath(view);
  if (!rerender) window.scrollTo(0, 0);
}

bindTopbar(topbar);
subscribe((kind) => (kind === 'prefs' ? render({ rerender: true }) : drawTopbar()));
window.addEventListener('hashchange', () => render());

// Coming back from Google? Finish signing in first, then draw the page.
finishSignIn().then((message) => {
  render();
  if (message) toast(message);
});
