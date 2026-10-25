/**
 * auth.js: Google sign-in (through Supabase).
 *
 *  1. "Continue with Google" calls signInWithGoogle(), which sends the student
 *     to Google's sign-in page.
 *  2. Google sends them back to crestprep.com/?code=... (the secure PKCE flow).
 *  3. On startup, finishSignIn() trades that one-time code for a session and
 *     logs the student in with their Google first name.
 *
 * Setup: README.md → "Turn on Google sign-in". Until the two keys are in
 * config.js, the button says so and the demo account still works.
 */
import { CONFIG } from './config.js';
import { loadScript } from './lib/dom.js';
import { loginWithGoogle, getState } from './store.js';

const SUPABASE_SDK = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';
let client = null;

export const googleSignInReady = () => Boolean(CONFIG.supabaseUrl && CONFIG.supabaseAnonKey) && !CONFIG.previewMode;

async function getClient() {
  if (!googleSignInReady()) return null;
  if (!client) {
    await loadScript(SUPABASE_SDK);
    client = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey, {
      auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true },
    });
  }
  return client;
}

export async function signInWithGoogle() {
  const supabase = await getClient();
  if (!supabase) throw new Error('Google sign-in is not set up yet');
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${location.origin}${location.pathname}` },
  });
  if (error) throw error;
}

/** Runs once at startup. Returns a message to show if sign-in failed, otherwise null. */
export async function finishSignIn() {
  const params = new URLSearchParams(location.search);
  if (!params.has('code') && !params.has('error')) return null;   // not coming back from Google

  let message = null;
  try {
    if (params.has('error')) throw new Error(params.get('error_description') || 'sign-in was cancelled');
    const supabase = await getClient();
    if (!supabase) throw new Error('Google sign-in is not set up yet');
    const { data, error } = await supabase.auth.getSession();      // waits for the code exchange
    if (error || !data.session) throw error || new Error('no session was returned');
    const { user } = data.session;
    const fullName = user.user_metadata?.full_name || user.user_metadata?.name || user.email || 'Student';
    loginWithGoogle({ id: user.id, name: fullName.split(' ')[0] });
  } catch (error) {
    message = `Google sign-in didn't finish (${error.message}). Try again, or use the demo.`;
  }
  history.replaceState(null, '', `${location.pathname}#/home`);       // remove ?code=... from the address bar
  return message;
}

/**
 * The signed-in student's Supabase token, which the AI tutor's server function
 * checks before it calls Gemini. Returns null for the demo account or if signed out.
 */
export async function getAccessToken() {
  if (getState().user?.provider !== 'google') return null;
  try {
    const supabase = await getClient();
    const { data } = await supabase.auth.getSession();   // refreshes an expired token by itself
    return data.session?.access_token || null;
  } catch {
    return null;
  }
}

export async function signOutGoogle() {
  try {
    const supabase = await getClient();
    await supabase?.auth.signOut();
  } catch { /* already signed out */ }
}
