# CrestPrep

Digital SAT prep built around a student's own Bluebook practice tests.
Built by Saransh Shekhar for the Congressional App Challenge (TX-26).
Plain HTML, CSS, and JavaScript modules: no framework and no build step.

## Run it on your computer

```bash
python3 -m http.server 8000      # then open http://localhost:8000
```
(Or VS Code's **Live Server** extension → **Go Live**. Double-clicking index.html won't work.)

## What works now

| Screen | What it does |
|---|---|
| Homepage | Logo, one line, **Continue with Google**, **Try the demo account**, a "What is Bluebook?" note, CAC footer |
| Dashboard, first time | Choose: upload a Bluebook practice test or take the diagnostic; set goal score + test date |
| Dashboard, returning | Today's tasks with minutes, the next 7 days, goal, top weak spots |
| Bluebook upload | Mark missed questions by official College Board skill → breakdown + recommendations |
| Tests | Bluebook-style adaptive diagnostic and practice sets: timer, cross-out, mark for review, navigator, Desmos |
| Practice | Course player with note guides, practice sets, tutor hints, Desmos, language helper |

## The files to show on camera

| File | What to highlight |
|---|---|
| `js/views/dashboard.js` | `render()`: the if-statement that picks first-time vs. returning |
| `js/auth.js` | The three-step Google sign-in (send to Google → come back with a code → sign in) |
| `js/lib/bluebookAnalyzer.js` | `analyzeResult()`: misses → ranked weak spots → recommendations |
| `js/lib/calendarGenerator.js` | `dailyMinutes()` and `buildCalendar()`: days left → daily tasks with minutes |
| `js/views/tests.js` | `submitModule()`: Module 1 score routes to the harder or easier Module 2 |

## Your content to fill in

- `js/data/resources.js`: for each official skill, your YouTube pick and a one-line tip. Empty ones stay hidden.
- `js/data/questions.js`: replace the placeholder questions, starting with the ones you show on camera.
- `js/config.js`: your intro video link (optional) and the two Supabase values below.

## Turn on Google sign-in (about 30 minutes)

1. **Supabase.** Create a free project at supabase.com.
2. **Google Cloud Console** (console.cloud.google.com) → create a project → **APIs & Services → OAuth consent screen**: External, app name CrestPrep, your email. Then **Credentials → Create credentials → OAuth client ID → Web application**:
   - Authorized JavaScript origins: `https://crestprep.com` and `http://localhost:8000`
   - Authorized redirect URI: the callback URL Supabase shows on its Google provider page (it looks like `https://YOUR-PROJECT.supabase.co/auth/v1/callback`)
3. **Supabase → Authentication → Sign In / Providers → Google**: turn it on and paste the Client ID and Client Secret.
4. **Supabase → Authentication → URL Configuration**: Site URL `https://crestprep.com`; add redirect URLs `https://crestprep.com/**` and `http://localhost:8000/**`.
5. **Supabase → Project Settings → API**: copy the Project URL and the `anon` public key into `supabaseUrl` and `supabaseAnonKey` in `js/config.js`. Both are safe to publish.
6. Back in Google's consent screen, click **Publish app** so anyone can sign in (in "Testing" mode only listed test users can).

Test it at `http://localhost:8000` before deploying.

## Put it on crestprep.com (Vercel)

Vercel (free) deploys from GitHub and can run the small server function the Gemini tutor needs, which GitHub Pages can't.

1. Push this folder to a GitHub repository.
2. vercel.com → sign in with GitHub → **Add New → Project** → import the repo → Framework preset **Other** → **Deploy**.
3. **Settings → Domains** → add `crestprep.com` and follow the DNS records Vercel shows. Delete any old Wix records first.
4. Later, for Gemini: **Settings → Environment Variables** → `GEMINI_API_KEY`. Never put that key in the website's code.

## Demo tips

- **Try the demo account** opens a returning student with a Bluebook result, a goal, and a calendar.
- **Start over as a new student** (bottom of the dashboard) switches to the first-time view. **Reload demo data** brings the demo back between takes.

## Next

1. Gemini reads an uploaded score-report screenshot and fills in the missed-question counts (the student checks them before saving).
2. Gemini tutor through a Vercel server function, using your system prompt.
3. More questions, then full-length practice tests.

SAT® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this site.
