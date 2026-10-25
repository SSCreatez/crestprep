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
| Home (first time) | Choose: add a Bluebook practice test in Crest Ingest or take the diagnostic; set goal score + test date |
| Home (returning) | The study calendar (tap any of the next 7 days), goal, top weak spots, Crest Cache, today's question |
| Crest Ingest | Upload the College Board score report PDF (read in the browser: test, date, scores, right/wrong counts, Knowledge and Skills bars) or type the scores; tally misses by official skill; fill in the error log; download it as a PDF. "How?" opens the tutorials |
| Breakdown | What happened, Gemini's take + follow-up chat, the error log, and for every weak spot: Question Bank filters, "Saransh personally recommends!", the CrestPrep lesson and practice set |
| Crest Cache | Every test added, newest first, with score changes, error log PDFs, and delete |
| Tests | Bluebook-style adaptive diagnostic and practice sets: timer, cross-out, mark for review, navigator, Desmos |
| Ultimate Course | Course player with note guides, practice sets, the AI tutor (Gemini, hints only), Desmos, language helper |

## The files to show on camera

| File | What to highlight |
|---|---|
| `js/views/dashboard.js` | `render()`: the if-statement that picks first-time vs. returning |
| `js/auth.js` | The three-step Google sign-in (send to Google → come back with a code → sign in) |
| `js/lib/scoreReport.js` | `readScoreReport()`: reads the PDF in the browser, then finds the scores and the 7-box bars |
| `js/lib/bluebookAnalyzer.js` | `analyzeResult()`: misses → ranked weak spots → recommendations |
| `js/lib/calendarGenerator.js` | `buildCalendar()`: anchored to the day the test was added, so each day's plan stays the same |
| `api/tutor.js` | The hint-only rules at the top, the sign-in check, and `leaksAnswer()`, the answer guard |
| `js/views/tests.js` | `submitModule()`: Module 1 score routes to the harder or easier Module 2 |

## The AI tutor (Gemini)

`api/tutor.js` runs on Vercel, so the Gemini key never reaches the browser. Students must be signed in with Google. If the AI can't answer (signed out, out of free requests, or running on your computer with `python -m http.server`), the written hints answer instead, so nothing breaks.

1. Get a key at aistudio.google.com → **Get API key** → **Create API key**.
2. Vercel → your project → **Settings → Environment Variables** → add `GEMINI_API_KEY` with the key as its value.
3. **Deployments** → the newest one → **⋯ → Redeploy**.
4. Optional: `GEMINI_MODEL` switches the model. The default, `gemini-3.5-flash-lite`, has the biggest free daily allowance; `gemini-3.8-flash` is smarter but has far fewer free requests per day.

The tutor's rules are plain sentences at the top of `api/tutor.js` (`HINT_RULES`, `COACH_RULES`): edit them to change how it coaches.

## Your content to fill in

- `js/data/resources.js`: each skill opens a YouTube search for now. Paste a specific video into `video` (and its name into `videoTitle`) to use it instead.
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

Vercel (free) deploys from GitHub and runs the small server function the Gemini tutor needs.

1. Push this folder to a GitHub repository (done: `SSCreatez/crestprep`).
2. vercel.com → **Add New → Project** → import the repo → preset **Other** → **Deploy** (done).
3. **Settings → Domains** → add `crestprep.com` (and `www`). In Cloudflare → **DNS → Records**, replace the old A/AAAA/CNAME records for `@` and `www` with the ones Vercel shows, and set each to **DNS only** (gray cloud). Leave MX and TXT records alone.
4. Add `GEMINI_API_KEY` (see "The AI tutor" above). Never put that key in the website's code.

Every push to `main` redeploys automatically.

## Demo tips

- **Try the demo account** opens a returning student with a Bluebook result, a goal, and a calendar.
- **Start over as a new student** (bottom of the dashboard) switches to the first-time view. **Reload demo data** brings the demo back between takes.

## Next

1. Questions reworded from official practice tests, a longer diagnostic, and full-length CrestPrep practice tests.
2. Sync the Crest Cache across devices (Supabase table) instead of one browser.

Third-party code: `js/vendor/pdfjs` is Mozilla's PDF.js (Apache 2.0, license included).

SAT® is a trademark registered by the College Board, which is not affiliated with, and does not endorse, this site.

## Question bank (October 2026)
- `js/data/bank/drills.js`: 87 skill drills, 3 per official College Board skill (easy, medium, hard). They power the course's skill drills, the 24-question diagnostic, the short practice sets, and today's question.
- `js/data/bank/test1.js` to `test3.js`: three full-length adaptive CrestPrep Practice Tests (110 questions each: Module 1 plus a Module 2 pool that `bank/tests.js` splits into an easier and a harder route). Each follows the skill sequence of one College Board practice test (Tests 4, 5, 6), with original passages and numbers.
- `js/data/bank/build.js`: turns each compact question line into a full question (official skill, pattern, hints, plain-English text) from a skill code.
- Test questions stay out of the practice pool so the full tests are unseen until a student takes them.
