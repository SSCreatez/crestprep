/**
 * topbar.js: the app bar on every signed-in page: logo, tabs (generated from
 * the route table), streak, coins, level, language, theme, and Sign out.
 * The signed-out homepage has no bar, just the logo, like PrepPros.
 */
import { getState, setPref, signOut, currentStreak } from '../store.js';
import { signOutGoogle } from '../auth.js';
import { levelProgress } from '../lib/scoring.js';
import { t, LANGUAGES } from '../i18n.js';
import { navigate, appTabs } from '../router.js';
import { CREST } from './icons.js';

/** Sub-pages light up their parent tab. */
const PARENT_TAB = { session: 'practice', results: 'upload' };

export function langSelect() {
  const lang = getState().prefs.lang;
  return `<label class="sr-only" for="lang-select">Language</label>
    <select id="lang-select" class="lang-select" data-top="lang">
      ${LANGUAGES.map((l) => `<option value="${l.code}" ${l.code === lang ? 'selected' : ''}>${l.label}</option>`).join('')}
    </select>`;
}

export function themeToggle() {
  const next = getState().prefs.theme === 'academic' ? 'Obsidian & gold' : 'Academic blue';
  return `<button type="button" class="theme-toggle" data-top="theme" aria-label="Switch to ${next} theme" title="Switch to ${next} theme">
    <span class="swatch swatch-academic"></span><span class="swatch swatch-obsidian"></span>
  </button>`;
}

function appBar(active) {
  const s = getState();
  const lp = levelProgress(s.xp);
  const activeTab = PARENT_TAB[active] || active;
  return `<div class="topbar-inner">
    <a class="brand" href="#/home">${CREST}<span>CrestPrep</span></a>
    <nav class="app-nav" aria-label="Main">
      ${appTabs().map(([name, key]) => `<a href="#/${name}" class="${activeTab === name ? 'is-active' : ''}" ${activeTab === name ? 'aria-current="page"' : ''}>${t(key)}</a>`).join('')}
    </nav>
    <div class="top-actions">
      <span class="stat" title="Day streak">🔥 <b>${currentStreak()}</b></span>
      <span class="stat" title="Coins"><span class="coin" aria-hidden="true"></span><b>${s.coins}</b></span>
      <span class="stat stat-level" title="${s.xp} XP total">Lv ${lp.level} · ${lp.title}</span>
      <span class="hide-sm">${langSelect()}</span>
      ${themeToggle()}
      <button type="button" class="btn btn-outline btn-sm" data-top="signout">${t('app.signout')}</button>
    </div>
  </div>`;
}

export function renderTopbar(el, { app, active }) {
  el.hidden = !app;
  el.className = app ? 'topbar-app' : '';
  el.innerHTML = app ? appBar(active) : '';
}

/** Called once at startup. One listener handles every control in the bar. */
export function bindTopbar(el) {
  el.addEventListener('change', (event) => {
    if (event.target.matches('[data-top="lang"]')) setPref('lang', event.target.value);
  });
  el.addEventListener('click', (event) => {
    const control = event.target.closest('[data-top]');
    if (!control) return;
    if (control.dataset.top === 'theme') {
      setPref('theme', getState().prefs.theme === 'academic' ? 'obsidian' : 'academic');
    } else if (control.dataset.top === 'signout') {
      const wasGoogle = getState().user?.provider === 'google';
      signOut();
      if (wasGoogle) signOutGoogle();
      navigate('');
    }
  });
}
