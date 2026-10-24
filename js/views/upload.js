/**
 * upload.js: add a Bluebook practice test, then see its breakdown.
 *   #/upload        → mark missed questions by official skill (+ optional scores)
 *   #/results/<id>  → breakdown, weak spots, and recommendations for one result
 *
 * Next step: Gemini reads a screenshot of the score report and fills in the
 * same counts automatically. The student still checks them here before saving.
 */
import { CONFIG } from '../config.js';
import { CB_DOMAINS } from '../data/cbSkills.js';
import { addResult, getResult, getState } from '../store.js';
import { analyzeResult, QUESTION_BANK_URL } from '../lib/bluebookAnalyzer.js';
import { formatDate } from '../lib/dates.js';
import { navigate } from '../router.js';
import { onAction, esc } from '../lib/dom.js';

let draft = { label: '', rw: '', math: '', misses: {} };   // kept if the page re-draws

const SECTIONS = [['rw', 'Reading and Writing'], ['math', 'Math']];
const total = () => Object.values(draft.misses).reduce((sum, n) => sum + n, 0);

/* ------------------------------ Entry form ----------------------------- */
function entryHTML() {
  return `
  <div class="page"><div class="wrap-narrow upload">
    <header class="page-head">
      <h1>Add a Bluebook practice test</h1>
      <p>Open the test's results on College Board's My Practice site. For each question you missed, tap + next to its skill (the skill is listed with every question). It takes about five minutes.</p>
    </header>

    <section class="panel upload-meta">
      <label class="field">Which practice test?
        <input class="input" name="label" value="${esc(draft.label)}" placeholder="e.g. Bluebook Practice Test 4" maxlength="60">
      </label>
      <label class="field">Reading and Writing score <span class="muted">(optional)</span>
        <input class="input" name="rw" type="number" inputmode="numeric" min="200" max="800" step="10" value="${esc(draft.rw)}" placeholder="200–800">
      </label>
      <label class="field">Math score <span class="muted">(optional)</span>
        <input class="input" name="math" type="number" inputmode="numeric" min="200" max="800" step="10" value="${esc(draft.math)}" placeholder="200–800">
      </label>
    </section>

    ${SECTIONS.map(([section, label]) => `
      <section class="panel">
        <h2 class="h-sm">${label}</h2>
        ${CB_DOMAINS.filter((d) => d.section === section).map((domain) => `
          <fieldset class="skill-group">
            <legend>${domain.label}</legend>
            ${domain.skills.map((name) => {
              const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
              const count = draft.misses[id] || 0;
              return `<div class="skill-row ${count ? 'has-misses' : ''}">
                <span>${name}</span>
                <div class="stepper">
                  <button type="button" data-action="step" data-skill="${id}" data-delta="-1" aria-label="One fewer missed: ${name}">−</button>
                  <b class="mono" data-count="${id}">${count}</b>
                  <button type="button" data-action="step" data-skill="${id}" data-delta="1" aria-label="One more missed: ${name}">+</button>
                </div>
              </div>`;
            }).join('')}
          </fieldset>`).join('')}
      </section>`).join('')}

    <div class="upload-bar">
      <span><b class="mono" data-total>${total()}</b> missed questions</span>
      <p class="form-error" role="alert" data-upload-error></p>
      <button type="button" class="btn btn-primary" data-action="analyze">See my breakdown</button>
    </div>
  </div></div>`;
}

function readScores() {
  const rw = draft.rw.trim() ? Number(draft.rw) : null;
  const math = draft.math.trim() ? Number(draft.math) : null;
  if (rw === null && math === null) return { scores: null };
  if (rw === null || math === null) return { error: 'Add both section scores, or leave both blank.' };
  if ([rw, math].some((n) => n < 200 || n > 800)) return { error: 'Section scores go from 200 to 800.' };
  return { scores: { rw, math, total: rw + math } };
}

function renderEntry(view) {
  view.innerHTML = entryHTML();
  const error = (text) => { view.querySelector('[data-upload-error]').textContent = text; };

  onAction(view, {
    step: (button) => {
      const id = button.dataset.skill;
      const count = Math.min(30, Math.max(0, (draft.misses[id] || 0) + Number(button.dataset.delta)));
      if (count) draft.misses[id] = count; else delete draft.misses[id];
      view.querySelector(`[data-count="${id}"]`).textContent = count;
      button.closest('.skill-row').classList.toggle('has-misses', count > 0);
      view.querySelector('[data-total]').textContent = total();
      error('');
    },
    analyze: () => {
      if (!total()) return error('Add at least one missed question first.');
      const { scores, error: scoreError } = readScores();
      if (scoreError) return error(scoreError);
      const result = addResult({
        source: 'bluebook',
        label: draft.label.trim() || 'Bluebook practice test',
        scores,
        misses: { ...draft.misses },
      });
      draft = { label: '', rw: '', math: '', misses: {} };
      navigate(`results/${result.id}`);
    },
  });
  view.addEventListener('input', (event) => {
    if (['label', 'rw', 'math'].includes(event.target.name)) draft[event.target.name] = event.target.value;
  });
}

/* ------------------------------ Breakdown ------------------------------ */
function spotHTML(spot, rank) {
  const { recs } = spot;
  return `<article class="panel spot">
    <div class="spot-head">
      <span class="spot-rank mono">${rank}</span>
      <div><h3>${spot.skill.name}</h3><p class="small muted">${recs.questionBank[2]}, ${recs.questionBank[1]}</p></div>
      <span class="spot-miss mono">${spot.misses} missed</span>
    </div>
    <ul class="rec-list">
      <li><span class="rec-kind">College Board Question Bank</span>
        Filter: ${recs.questionBank.join(' → ')}. <a href="${QUESTION_BANK_URL}" target="_blank" rel="noopener">Open the Question Bank</a></li>
      ${recs.video ? `<li><span class="rec-kind">${esc(CONFIG.creator.firstName)}'s pick</span><a href="${esc(recs.video.url)}" target="_blank" rel="noopener">${esc(recs.video.title)}</a></li>` : ''}
      ${recs.tip ? `<li><span class="rec-kind">${esc(CONFIG.creator.firstName)}'s tip</span>${esc(recs.tip)}</li>` : ''}
      ${recs.drill ? `<li><span class="rec-kind">CrestPrep drill</span><a href="${recs.drill.href}">${recs.drill.title}</a></li>` : ''}
    </ul>
  </article>`;
}

function renderResults(view, id) {
  const result = getResult(id) || getState().results[0];
  if (!result) { navigate('upload'); return; }
  const analysis = analyzeResult(result);
  const most = analysis.domains[0]?.misses || 1;

  view.innerHTML = `
  <div class="page"><div class="wrap-narrow results">
    <header class="page-head">
      <p class="lesson-kind">${result.source === 'bluebook' ? 'Bluebook practice test' : 'CrestPrep diagnostic'}, ${formatDate(result.date, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      <h1>${esc(result.label)}</h1>
      ${result.scores ? `<p class="score-row"><span>Total <b class="mono">${result.scores.total}</b></span><span>Reading and Writing <b class="mono">${result.scores.rw}</b></span><span>Math <b class="mono">${result.scores.math}</b></span></p>` : ''}
    </header>

    <section class="panel">
      <h2 class="h-sm">What happened</h2>
      <p>${analysis.summary}</p>
      <div class="domain-bars">
        ${analysis.domains.map((d) => `<div class="domain-row"><span>${d.domain.label}</span><div class="bar"><span style="width:${Math.round((d.misses / most) * 100)}%"></span></div><b class="mono">${d.misses}</b></div>`).join('')}
      </div>
    </section>

    ${analysis.weakSpots.length ? `<h2 class="h-sm results-sub">Your weak spots, and what to use for each</h2>
      ${analysis.weakSpots.slice(0, 8).map((spot, i) => spotHTML(spot, i + 1)).join('')}` : ''}

    <div class="results-actions">
      <a class="btn btn-primary" href="#/home">Go to my study calendar</a>
      <a class="btn btn-outline" href="#/upload">Add another test</a>
    </div>
  </div></div>`;
}

export function render(view, { name, params }) {
  if (name === 'results') renderResults(view, params[0]);
  else renderEntry(view);
}
