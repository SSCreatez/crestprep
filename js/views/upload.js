/**
 * upload.js: Crest Ingest (Bluebook practice uploads!) and each test's breakdown.
 *
 *   #/upload        → add a test in four parts:
 *                       1. which test + scores, typed in OR read from the score report PDF
 *                       2. missed questions by official skill (the + and − tally)
 *                       3. the error log: the actual questions, pasted from My Practice
 *                       4. "See my breakdown" saves it all to the Crest Cache
 *   #/results/<id>  → the breakdown: what happened, Gemini's take, the error log,
 *                     and resources for every weak spot
 *
 * The form is saved as a draft while the student works, so a refresh never
 * loses a half-finished error log.
 */
import { CONFIG } from '../config.js';
import { CB_DOMAINS } from '../data/cbSkills.js';
import { addResult, getResult, getState } from '../store.js';
import { analyzeResult, QUESTION_BANK_URL } from '../lib/bluebookAnalyzer.js';
import { readScoreReport, readPdfText } from '../lib/scoreReport.js';
import { formatDate, todayISO } from '../lib/dates.js';
import { navigate } from '../router.js';
import { onAction, esc, toast } from '../lib/dom.js';
import { openGuide } from '../components/guideModal.js';
import { errorLogEditorHTML, errorLogRowHTML, errorLogViewHTML, newRow, rowHasContent, renumberRows, printErrorLog } from '../components/errorLog.js';
import { aiCoachHTML, wireAiCoach } from '../components/aiCoach.js';
import { ICONS } from '../components/icons.js';

const SECTIONS = [['rw', 'Reading and Writing'], ['math', 'Math']];
const skillId = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const SECTION_OF = Object.fromEntries(CB_DOMAINS.flatMap((d) => d.skills.map((name) => [skillId(name), d.section])));
const longDate = (iso) => formatDate(iso, { month: 'long', day: 'numeric', year: 'numeric' });

/* ------------------------------- The draft ------------------------------- */
const blankDraft = () => ({ owner: getState().user?.id, label: '', date: todayISO(), rw: '', math: '', misses: {}, report: null, log: [], logPdf: null });
const draftKey = () => `crestprep:ingest:${getState().user?.id || 'guest'}`;
let draft = null;
let saveTimer = null;

function loadDraft() {
  try { return { ...blankDraft(), ...(JSON.parse(localStorage.getItem(draftKey())) || {}) }; } catch { return blankDraft(); }
}
function saveDraft() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => { try { localStorage.setItem(draftKey(), JSON.stringify(draft)); } catch { /* storage full */ } }, 300);
}
function clearDraft() {
  clearTimeout(saveTimer);
  try { localStorage.removeItem(draftKey()); } catch { /* blocked */ }
  draft = blankDraft();
}

const total = () => Object.values(draft.misses).reduce((sum, n) => sum + n, 0);
const sectionTotal = (section) => Object.entries(draft.misses).filter(([id]) => SECTION_OF[id] === section).reduce((sum, [, n]) => sum + n, 0);

/* --------------------------- Score report pieces --------------------------- */
/** The report's Knowledge and Skills bars, drawn the same way: filled boxes out of 7. */
export function bandsHTML(bands) {
  return `<div class="bands" role="list" aria-label="Knowledge and Skills from your score report">
    ${CB_DOMAINS.filter((d) => bands[d.key]).map((d) => {
      const band = bands[d.key];
      return `<div class="band-row" role="listitem">
        <span>${d.label}</span>
        <span class="band-boxes" aria-label="${band.filled} of ${band.of} boxes filled">${Array.from({ length: band.of }, (_, i) => `<i class="${i < band.filled ? 'on' : ''}"></i>`).join('')}</span>
      </div>`;
    }).join('')}
  </div>`;
}

function reportHTML() {
  const r = draft.report;
  if (!r) {
    return `<label class="dropzone" data-dropzone>
        <input type="file" accept="application/pdf,.pdf" class="sr-only" data-file="report">
        <span class="dz-icon">${ICONS.upload}</span>
        <span><strong>Choose your score report PDF</strong> or drop it here</span>
        <span class="small muted">My Practice → Score Details → Download Score Report. The PDF is read right here in your browser, never uploaded.</span>
      </label>
      <p class="form-error" role="alert" data-report-error></p>`;
  }
  const facts = [
    ['Test', esc(r.testName || '–')],
    ['Taken', r.date ? longDate(r.date) : '–'],
    ['Total', r.total ? `<b class="mono">${r.total}</b>` : '–'],
    ['Reading and Writing', r.rw ? `<b class="mono">${r.rw}</b>${r.correct ? ` <span class="muted">(${r.correct.rw} of 54 right)</span>` : ''}` : '–'],
    ['Math', r.math ? `<b class="mono">${r.math}</b>${r.correct ? ` <span class="muted">(${r.correct.math} of 44 right)</span>` : ''}` : '–'],
  ];
  return `<div class="report-summary">
      <p class="report-file">${ICONS.guide}<span>${esc(r.fileName)}</span><button type="button" class="link-btn" data-action="report-clear">Remove</button></p>
      <dl class="report-facts">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
      ${r.bands ? `<h3 class="h-xs">Knowledge and Skills</h3>${bandsHTML(r.bands)}` : ''}
      <p class="small report-next">${r.missed
        ? `You missed <b>${r.missed.rw}</b> in Reading and Writing and <b>${r.missed.math}</b> in Math. Tap + for each one below so your plan knows which skills they were!`
        : 'We filled in the boxes above from your report. Give them a quick check.'}</p>
    </div>`;
}

function tallyNote(section) {
  const goal = draft.report?.missed?.[section];
  if (goal === undefined) return '';
  const done = sectionTotal(section);
  return `${done} of ${goal} from your score report${done === goal ? ' :)' : ''}`;
}

/* ------------------------------ Entry form ----------------------------- */
function entryHTML() {
  return `
  <div class="page"><div class="wrap-narrow upload">
    <header class="page-head">
      <h1>Crest Ingest (Bluebook practice uploads!)</h1>
      <p>Add a Bluebook practice test you took: your scores, the questions you missed by skill, and your error log. It all gets saved to your <a href="#/cache">Crest Cache</a>, so you can look back at it anytime.</p>
    </header>

    <section class="panel upload-meta" aria-label="Which test and your scores">
      <label class="field">Which practice test?
        <input class="input" name="label" value="${esc(draft.label)}" placeholder="e.g. SAT Practice 4" maxlength="60">
      </label>
      <label class="field">Date taken
        <input class="input" name="date" type="date" max="${todayISO()}" value="${esc(draft.date)}">
      </label>
      <label class="field"><span>Reading and Writing <span class="muted">(optional)</span></span>
        <input class="input" name="rw" type="number" inputmode="numeric" min="200" max="800" step="10" value="${esc(draft.rw)}" placeholder="200–800">
      </label>
      <label class="field"><span>Math <span class="muted">(optional)</span></span>
        <input class="input" name="math" type="number" inputmode="numeric" min="200" max="800" step="10" value="${esc(draft.math)}" placeholder="200–800">
      </label>
    </section>

    <div class="or-rule" role="separator"><span>or</span></div>

    <section class="panel report-panel" aria-labelledby="report-title">
      <div class="panel-title">
        <h2 class="h-sm" id="report-title">Upload your score report</h2>
        <button type="button" class="how-btn" data-action="how" data-guide="report">How?</button>
      </div>
      <div data-report-body>${reportHTML()}</div>
    </section>

    ${SECTIONS.map(([section, label]) => `
      <section class="panel" aria-label="${label} misses by skill">
        <div class="panel-title">
          <h2 class="h-sm">${label}</h2>
          <span class="tally-note" data-tally="${section}">${tallyNote(section)}</span>
        </div>
        ${CB_DOMAINS.filter((d) => d.section === section).map((domain) => `
          <fieldset class="skill-group">
            <legend>${domain.label}</legend>
            ${domain.skills.map((name) => {
              const id = skillId(name);
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

    <section class="panel errlog" id="error-log" aria-labelledby="log-title">
      <div class="panel-title">
        <h2 class="h-sm" id="log-title">Error log</h2>
        <button type="button" class="how-btn" data-action="how" data-guide="errorlog">How?</button>
      </div>
      <p class="small muted">Your missed questions, all in one place. Paste each one in from My Practice, then download it as a PDF to review before your next test.</p>
      <div class="log-sheet">
        <div class="sheet-head"><span>CrestPrep error log</span><span data-log-title>${esc(draft.label || 'Bluebook practice test')}</span></div>
        ${errorLogEditorHTML(draft.log)}
      </div>
      <div class="log-actions">
        <button type="button" class="btn btn-outline btn-sm" data-action="log-add">+ Add a missed question</button>
        <button type="button" class="btn btn-outline btn-sm" data-action="log-sync">Count these in the skill tally</button>
        <button type="button" class="btn btn-outline btn-sm" data-action="log-pdf">Download as PDF</button>
      </div>
      <div class="log-upload">${logPdfHTML()}</div>
    </section>

    <div class="upload-bar">
      <span><b class="mono" data-total>${total()}</b> missed questions<span class="muted" data-of>${draft.report?.missed ? ` of ${draft.report.missed.total} on your report` : ''}</span></span>
      <p class="form-error" role="alert" data-upload-error></p>
      <button type="button" class="btn btn-primary" data-action="analyze">See my breakdown</button>
    </div>
  </div></div>`;
}

function logPdfHTML() {
  return draft.logPdf
    ? `<p class="small">Also using your error log PDF: <strong>${esc(draft.logPdf.fileName)}</strong> (${draft.logPdf.pages} page${draft.logPdf.pages === 1 ? '' : 's'}). <button type="button" class="link-btn" data-action="logpdf-clear">Remove</button></p>`
    : `<label class="file-link small">Already made an error log in Google Docs? <span class="link-btn">Upload the PDF instead</span>
        <input type="file" accept="application/pdf,.pdf" class="sr-only" data-file="logpdf"></label>
       <p class="form-error" role="alert" data-logpdf-error></p>`;
}

function readScores() {
  const rw = String(draft.rw).trim() ? Number(draft.rw) : null;
  const math = String(draft.math).trim() ? Number(draft.math) : null;
  if (rw === null && math === null) return { scores: null };
  if (rw === null || math === null) return { error: 'Add both section scores, or leave both blank.' };
  if ([rw, math].some((n) => n < 200 || n > 800 || n % 10)) return { error: 'Section scores go from 200 to 800, in steps of 10.' };
  return { scores: { rw, math, total: rw + math } };
}

function renderEntry(view) {
  if (!draft || draft.owner !== getState().user?.id) draft = loadDraft();
  // draw() can run again (after reading a PDF); the listeners below are added only once.
  const draw = () => { view.innerHTML = entryHTML(); };
  const $ = (selector) => view.querySelector(selector);
  const error = (text) => { $('[data-upload-error]').textContent = text; };

  const refreshTotals = () => {
    $('[data-total]').textContent = total();
    SECTIONS.forEach(([section]) => { $(`[data-tally="${section}"]`).textContent = tallyNote(section); });
  };
  const setCount = (id, count) => {
    if (count) draft.misses[id] = count; else delete draft.misses[id];
    const counter = $(`[data-count="${id}"]`);
    counter.textContent = count;
    counter.closest('.skill-row').classList.toggle('has-misses', count > 0);
  };

  /* ---- The score report ---- */
  async function takeReport(file) {
    const reportError = (text) => { const el = $('[data-report-error]'); if (el) el.textContent = text; };
    if (!file) return;
    if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') return reportError('That isn’t a PDF. Download the score report from My Practice and choose that file.');
    if (file.size > 15 * 1024 * 1024) return reportError('That PDF is bigger than a score report should be (over 15 MB).');
    $('[data-dropzone]').classList.add('is-busy');
    reportError('');
    try {
      const found = await readScoreReport(file);
      if (!found.hasText && !found.testName) throw new Error('no text');
      draft.report = { fileName: file.name, ...found };
      if (found.testName && (!draft.label || draft.label === draft.autoLabel)) draft.label = draft.autoLabel = found.testName;
      if (found.date) draft.date = found.date;
      if (found.rw && found.math) { draft.rw = String(found.rw); draft.math = String(found.math); }
      saveDraft();
      draw();
      toast(found.total ? `Read your score report: ${found.total}!` : 'Read your score report', 'good');
    } catch {
      $('[data-dropzone]')?.classList.remove('is-busy');
      reportError('Couldn’t read scores from that PDF. Type them in above instead (it only takes a second).');
    }
  }

  /* ---- An error log PDF made somewhere else ---- */
  async function takeLogPdf(file) {
    const logError = (text) => { const el = $('[data-logpdf-error]'); if (el) el.textContent = text; };
    if (!file) return;
    if (!/\.pdf$/i.test(file.name) && file.type !== 'application/pdf') return logError('Choose a PDF file.');
    try {
      const { text, pages } = await readPdfText(file, { maxPages: 30 });
      if (!text.trim()) return logError('That PDF has no text we can read (it may be scanned pictures).');
      draft.logPdf = { fileName: file.name, pages, text: text.slice(0, 20000) };
      saveDraft();
      $('.log-upload').innerHTML = logPdfHTML();
    } catch {
      logError('Couldn’t open that PDF. Try exporting it again.');
    }
  }

  onAction(view, {
    how: (el) => openGuide(el.dataset.guide),
    step: (button) => {
      const id = button.dataset.skill;
      setCount(id, Math.min(30, Math.max(0, (draft.misses[id] || 0) + Number(button.dataset.delta))));
      refreshTotals();
      saveDraft();
      error('');
    },
    'report-clear': () => {
      if (draft.label === draft.autoLabel) draft.label = '';
      draft.report = null;
      saveDraft();
      draw();
    },
    'log-add': () => {
      const last = draft.log[draft.log.length - 1];
      const row = newRow(last?.section || 'rw');
      draft.log.push(row);
      const list = $('[data-log-list]');
      list.insertAdjacentHTML('beforeend', errorLogRowHTML(row, draft.log.length - 1));
      $('.log-empty').hidden = true;
      list.lastElementChild.querySelector('[data-log="number"]').focus();
      saveDraft();
    },
    'log-remove': (button) => {
      const row = draft.log.find((r) => r.id === button.dataset.id);
      if (row && rowHasContent(row) && !button.dataset.armed) {
        button.dataset.armed = 'true';
        button.textContent = 'Click again to remove';
        setTimeout(() => { delete button.dataset.armed; button.textContent = 'Remove'; }, 4000);
        return;
      }
      draft.log = draft.log.filter((r) => r.id !== button.dataset.id);
      button.closest('.log-row').remove();
      renumberRows($('[data-log-list]'));
      $('.log-empty').hidden = draft.log.length > 0;
      saveDraft();
    },
    'log-sync': () => {
      const counts = {};
      draft.log.forEach((row) => { if (row.skill) counts[row.skill] = (counts[row.skill] || 0) + 1; });
      if (!Object.keys(counts).length) return toast('Pick a skill for each error log question first.');
      Object.entries(counts).forEach(([id, n]) => setCount(id, Math.max(draft.misses[id] || 0, n)));
      refreshTotals();
      saveDraft();
      toast('Your error log is in the skill tally now', 'good');
    },
    'log-pdf': () => {
      if (!draft.log.some(rowHasContent) && !draft.logPdf) return toast('Add at least one question to your error log first.');
      const { scores } = readScores();
      printErrorLog({ label: draft.label.trim() || 'Bluebook practice test', date: draft.date || todayISO(), scores, errorLog: draft.log, errorLogPdf: draft.logPdf });
    },
    'logpdf-clear': () => {
      draft.logPdf = null;
      saveDraft();
      $('.log-upload').innerHTML = logPdfHTML();
    },
    analyze: () => {
      // An error log with skills counts even if the tally was skipped.
      if (!total()) draft.log.forEach((row) => { if (row.skill) draft.misses[row.skill] = (draft.misses[row.skill] || 0) + 1; });
      const perfect = draft.report?.missed?.total === 0;
      if (!total() && !perfect) return error('Add at least one missed question first: tap + next to its skill.');
      const { scores, error: scoreError } = readScores();
      if (scoreError) return error(scoreError);
      if (draft.date && draft.date > todayISO()) return error('The date taken can’t be in the future.');
      const report = draft.report && { fileName: draft.report.fileName, correct: draft.report.correct, missed: draft.report.missed, bands: draft.report.bands };
      const result = addResult({
        source: 'bluebook',
        label: draft.label.trim() || 'Bluebook practice test',
        date: draft.date || todayISO(),
        scores,
        misses: { ...draft.misses },
        report: report || null,
        errorLog: draft.log.filter(rowHasContent),
        errorLogPdf: draft.logPdf,
      });
      clearDraft();
      toast('Saved to your Crest Cache! Your calendar now follows this test.', 'good');
      navigate(`results/${result.id}`);
    },
  });

  // Typing in the form
  view.addEventListener('input', (event) => {
    const { target } = event;
    if (['label', 'rw', 'math', 'date'].includes(target.name)) {
      draft[target.name] = target.value;
      if (target.name === 'label') $('[data-log-title]').textContent = target.value || 'Bluebook practice test';
      saveDraft();
      return;
    }
    const field = target.dataset.log;
    const rowEl = target.closest('[data-row]');
    if (!field || !rowEl) return;
    const row = draft.log.find((r) => r.id === rowEl.dataset.row);
    if (!row) return;
    row[field] = target.value;
    if (field === 'section' && rowEl.isConnected) {
      row.skill = '';
      rowEl.outerHTML = errorLogRowHTML(row, draft.log.indexOf(row));
      view.querySelector(`[data-row="${row.id}"] [data-log="skill"]`).focus();
    }
    saveDraft();
  });

  // Choosing or dropping a PDF
  view.addEventListener('change', (event) => {
    if (event.target.dataset.file === 'report') takeReport(event.target.files[0]);
    if (event.target.dataset.file === 'logpdf') takeLogPdf(event.target.files[0]);
  });
  view.addEventListener('dragover', (event) => {
    const zone = event.target.closest('[data-dropzone]');
    if (!zone) return;
    event.preventDefault();
    zone.classList.add('is-over');
  });
  view.addEventListener('dragleave', (event) => event.target.closest('[data-dropzone]')?.classList.remove('is-over'));
  view.addEventListener('drop', (event) => {
    const zone = event.target.closest('[data-dropzone]');
    if (!zone) return;
    event.preventDefault();
    zone.classList.remove('is-over');
    takeReport(event.dataTransfer.files[0]);
  });

  draw();
}

/* ------------------------------ Breakdown ------------------------------ */
function spotHTML(spot, rank) {
  const { recs } = spot;
  const done = getState().lessonsDone;
  return `<article class="panel spot">
    <div class="spot-head">
      <span class="spot-rank mono">${rank}</span>
      <div><h3>${spot.skill.name}</h3><p class="small muted">${recs.questionBank[2]}, ${recs.questionBank[1]}</p></div>
      <span class="spot-miss mono">${spot.misses} missed</span>
    </div>
    <ul class="rec-list">
      <li><span class="rec-kind">College Board Question Bank</span>
        Filter: ${recs.questionBank.join(' → ')}. <a href="${QUESTION_BANK_URL}" target="_blank" rel="noopener">Open the Question Bank</a></li>
      <li><span class="rec-kind">${esc(CONFIG.creator.firstName)} personally recommends!</span>
        <a href="${esc(recs.video.url)}" target="_blank" rel="noopener">${esc(recs.video.title)}</a>${recs.tip ? `<span class="rec-tip">${esc(recs.tip)}</span>` : ''}</li>
      ${recs.lesson ? `<li><span class="rec-kind">CrestPrep lesson</span><a href="${recs.lesson.href}">${recs.lesson.title}</a>${done.includes(recs.lesson.id) ? ' <span class="done-mark">done!</span>' : ''}</li>` : ''}
      ${recs.drill ? `<li><span class="rec-kind">CrestPrep practice set</span><a href="${recs.drill.href}">${recs.drill.title}</a>${done.includes(recs.drill.id) ? ' <span class="done-mark">done!</span>' : ''}</li>` : ''}
      <li><span class="rec-kind">Gemini</span><button type="button" class="link-btn" data-action="ai-ask" data-question="How do I stop missing ${esc(spot.skill.name)} questions?">Ask Gemini how to fix this</button></li>
    </ul>
  </article>`;
}

function errorLogPanelHTML(result) {
  const rows = (result.errorLog || []).filter(rowHasContent);
  if (!rows.length && !result.errorLogPdf) return '';
  return `<section class="panel" id="error-log" aria-labelledby="log-view-title">
    <div class="panel-title">
      <h2 class="h-sm" id="log-view-title">Your error log</h2>
      <button type="button" class="btn btn-outline btn-sm" data-action="log-pdf">Download as PDF</button>
    </div>
    ${rows.length ? errorLogViewHTML(rows) : ''}
    ${result.errorLogPdf ? `<details class="log-pdf-text"><summary class="small">From your uploaded PDF: ${esc(result.errorLogPdf.fileName)}</summary><div class="log-pasted">${esc(result.errorLogPdf.text)}</div></details>` : ''}
  </section>`;
}

function renderResults(view, id) {
  const result = getResult(id) || getState().results[0];
  if (!result) { navigate('upload'); return; }
  const analysis = analyzeResult(result);
  const most = analysis.domains[0]?.misses || 1;
  const c = result.report?.correct;

  view.innerHTML = `
  <div class="page"><div class="wrap-narrow results">
    <p class="crumbs small"><a href="#/cache">Crest Cache</a> / ${esc(result.label)}</p>
    <header class="page-head">
      <p class="lesson-kind">${{ bluebook: 'Bluebook practice test', crestprep: 'CrestPrep practice test' }[result.source] || 'CrestPrep diagnostic'}, ${longDate(result.date)}</p>
      <h1>${esc(result.label)}</h1>
      ${result.scores ? `<p class="score-row"><span>Total <b class="mono">${result.scores.total}</b></span><span>Reading and Writing <b class="mono">${result.scores.rw}</b></span><span>Math <b class="mono">${result.scores.math}</b></span></p>` : ''}
      ${c ? `<p class="small muted report-line">From your score report: ${c.total} of 98 right (Reading and Writing ${c.rw} of 54, Math ${c.math} of 44).</p>` : ''}
    </header>

    <section class="panel">
      <h2 class="h-sm">What happened</h2>
      <p>${analysis.summary}</p>
      <div class="domain-bars">
        ${analysis.domains.map((d) => `<div class="domain-row"><span>${d.domain.label}</span><div class="bar"><span style="width:${Math.round((d.misses / most) * 100)}%"></span></div><b class="mono">${d.misses}</b></div>`).join('')}
      </div>
      ${result.report?.bands ? `<h3 class="h-xs bands-title">Knowledge and Skills, from your score report</h3>${bandsHTML(result.report.bands)}` : ''}
    </section>

    ${aiCoachHTML(result)}
    ${errorLogPanelHTML(result)}

    ${analysis.weakSpots.length ? `<h2 class="h-sm results-sub">Your weak spots, and what to use for each</h2>
      ${analysis.weakSpots.slice(0, 8).map((spot, i) => spotHTML(spot, i + 1)).join('')}` : ''}

    <div class="results-actions">
      <a class="btn btn-primary" href="#/home">Go to my study calendar</a>
      <a class="btn btn-outline" href="#/upload">Add another test</a>
      <a class="btn btn-ghost" href="#/cache">Open my Crest Cache</a>
    </div>
  </div></div>`;

  wireAiCoach(view);
  onAction(view, { 'log-pdf': () => printErrorLog(getResult(result.id)) });
}

export function render(view, { name, params }) {
  if (name === 'results') renderResults(view, params[0]);
  else renderEntry(view);
}
