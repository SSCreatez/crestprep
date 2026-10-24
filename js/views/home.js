/**
 * home.js: the logged-out homepage. Logo, one line, then sign in.
 * Also handles #/login/<next>: after signing in, the student goes to <next>.
 */
import { CONFIG } from '../config.js';
import { isLoggedIn, loginDemo, setPref, getState } from '../store.js';
import { googleSignInReady, signInWithGoogle } from '../auth.js';
import { navigate } from '../router.js';
import { onAction } from '../lib/dom.js';
import { langSelect, themeToggle } from '../components/topbar.js';
import { CREST } from '../components/icons.js';

const GOOGLE_G = `<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`;

export function render(view, { name, params }) {
  const next = name === 'login' && params.length ? params.join('/') : 'home';
  if (isLoggedIn()) { navigate(next); return; }

  view.innerHTML = `
  <div class="home">
    <section class="home-top">
      <h1 class="home-logo">${CREST}<span>CrestPrep</span></h1>
      <p class="home-sub">Upload your Bluebook practice test, see exactly what to fix, and follow a day-by-day plan to your goal score.</p>
      <button type="button" class="btn-google" data-action="google">${GOOGLE_G}<span>Continue with Google</span></button>
      <p class="home-demo"><button type="button" class="link-btn" data-action="demo">Try the demo account</button></p>
      <p class="form-error" role="alert" data-auth-error></p>
    </section>

    <section class="band home-band" aria-label="What you get">
      <div class="wrap home-previews">
        <article class="preview-card">
          <p class="preview-label">Your Bluebook breakdown <span>Example</span></p>
          <div class="mini-bars">
            <div><span>Advanced Math</span><i style="width:100%"></i><b>5</b></div>
            <div><span>Craft and Structure</span><i style="width:60%"></i><b>3</b></div>
            <div><span>Standard English Conventions</span><i style="width:40%"></i><b>2</b></div>
          </div>
          <p class="preview-note"><strong>Start with:</strong> Question Bank → Math → Advanced Math → Nonlinear functions</p>
        </article>
        <article class="preview-card">
          <p class="preview-label">Your study calendar <span>Example</span></p>
          <p class="preview-day">Thursday <b>35 min</b></p>
          <ul class="preview-tasks">
            <li><span>Nonlinear functions: Question Bank practice</span><b>25 min</b></li>
            <li><span>CrestPrep drill: hard questions set 1</span><b>10 min</b></li>
          </ul>
          <div class="preview-week">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => `<span class="${i === 3 ? 'is-today' : ''}">${d}<b>${[35, 35, 35, 35, 35, 35, 0][i] || '–'}</b></span>`).join('')}</div>
        </article>
      </div>
    </section>

    <section class="wrap home-bluebook">
      <h2>What is Bluebook?</h2>
      <p>Bluebook is College Board's app for the Digital SAT. You take the real test in it, and it also has free full-length practice tests that adapt like the real exam: how you do in Module 1 decides whether Module 2 is easier or harder.</p>
      <p>After a practice test, your score and a review of every question appear on College Board's My Practice site. Add the questions you missed to CrestPrep and it turns them into a plan. Haven't taken one yet? Start with the CrestPrep diagnostic instead.</p>
    </section>

    <footer class="home-foot">
      <div class="wrap">
        <p><strong>Made for the Congressional App Challenge (${CONFIG.district})</strong> by ${CONFIG.creator.name}.</p>
        <p class="small muted">SAT® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this site.</p>
        <p class="small"><a href="privacy.html">Privacy Policy</a> &nbsp;|&nbsp; <a href="terms.html">Terms of Service</a></p>
        <div class="home-prefs">${langSelect()}${themeToggle()}</div>
      </div>
    </footer>
  </div>`;

  const showError = (text) => { view.querySelector('[data-auth-error]').textContent = text; };

  onAction(view, {
    google: async (button) => {
      if (CONFIG.previewMode) return showError('Google sign-in works on crestprep.com. In this preview, use the demo account.');
      if (!googleSignInReady()) return showError('Google sign-in isn’t connected yet: add the Supabase keys to js/config.js (see README). The demo account works now.');
      button.disabled = true;
      button.querySelector('span').textContent = 'Opening Google…';
      try {
        await signInWithGoogle();                 // the browser leaves for Google here
      } catch (error) {
        button.disabled = false;
        button.querySelector('span').textContent = 'Continue with Google';
        showError(`Couldn't reach Google sign-in (${error.message}). Check your connection, or use the demo account.`);
      }
    },
    demo: () => { loginDemo(); navigate(next); },
  });

  // Footer language and theme controls (the same ones the app bar uses)
  view.addEventListener('change', (event) => {
    if (event.target.matches('[data-top="lang"]')) setPref('lang', event.target.value);
  });
  view.addEventListener('click', (event) => {
    if (event.target.closest('[data-top="theme"]')) setPref('theme', getState().prefs.theme === 'academic' ? 'obsidian' : 'academic');
  });
}
