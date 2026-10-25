/**
 * errorLog.js: the error log, an already-formatted sheet for the questions a
 * student missed on a Bluebook practice test.
 *
 *   errorLogEditorHTML(rows) → the editable sheet on Crest Ingest
 *   errorLogViewHTML(rows)   → the read-only version on a saved breakdown
 *   printErrorLog(result)    → opens the print dialog, where "Save as PDF" exports it
 *
 * A row: { id, section, module, number, skill, mine, correct, reason, text, note }
 */
import { CB_DOMAINS, getSkill } from '../data/cbSkills.js';
import { formatDate } from '../lib/dates.js';
import { esc } from '../lib/dom.js';

export const MISS_REASONS = [
  ['content', 'Didn’t know the content'],
  ['careless', 'Careless mistake'],
  ['misread', 'Misread the question'],
  ['trap', 'Fell for a trap answer'],
  ['time', 'Ran out of time or rushed'],
  ['guess', 'Guessed'],
];
export const reasonLabel = (key) => MISS_REASONS.find(([k]) => k === key)?.[1] || '';
const SECTION_NAME = { rw: 'Reading and Writing', math: 'Math' };

export const newRow = (section = 'rw') => ({
  id: `q${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
  section, module: '', number: '', skill: '', mine: '', correct: '', reason: '', text: '', note: '',
});

/** True once a row has anything worth saving. */
export const rowHasContent = (row) => ['number', 'skill', 'mine', 'correct', 'reason', 'text', 'note'].some((key) => String(row[key] || '').trim());

function skillOptions(section, selected) {
  return CB_DOMAINS.filter((d) => d.section === section).map((domain) => `
    <optgroup label="${domain.label}">
      ${domain.skills.map((name) => {
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return `<option value="${id}" ${id === selected ? 'selected' : ''}>${name}</option>`;
      }).join('')}
    </optgroup>`).join('');
}

const option = (value, label, selected) => `<option value="${value}" ${value === selected ? 'selected' : ''}>${label}</option>`;

/** One row of the editable sheet. */
export function errorLogRowHTML(row, index) {
  return `
  <li class="log-row" data-row="${row.id}">
    <div class="log-row-head">
      <span class="log-num">Question ${index + 1}</span>
      <button type="button" class="link-btn" data-action="log-remove" data-id="${row.id}">Remove</button>
    </div>
    <div class="log-grid">
      <label class="field log-section">Section
        <select class="input" data-log="section">${option('rw', 'Reading and Writing', row.section)}${option('math', 'Math', row.section)}</select>
      </label>
      <label class="field">Module
        <select class="input" data-log="module">${option('', '–', row.module)}${option('1', '1', row.module)}${option('2', '2', row.module)}</select>
      </label>
      <label class="field">Question #
        <input class="input" data-log="number" inputmode="numeric" maxlength="3" value="${esc(row.number)}" placeholder="e.g. 7">
      </label>
      <label class="field">Your answer
        <input class="input" data-log="mine" maxlength="20" value="${esc(row.mine)}" placeholder="e.g. B">
      </label>
      <label class="field">Correct answer
        <input class="input" data-log="correct" maxlength="20" value="${esc(row.correct)}" placeholder="e.g. D">
      </label>
      <label class="field log-skill">Skill
        <select class="input" data-log="skill"><option value="">Pick the skill (listed with the question)</option>${skillOptions(row.section, row.skill)}</select>
      </label>
      <label class="field log-reason">Why I missed it
        <select class="input" data-log="reason">${option('', 'Pick one', row.reason)}${MISS_REASONS.map(([k, label]) => option(k, label, row.reason)).join('')}</select>
      </label>
    </div>
    <label class="field"><span>Question, answer choices, and explanation <span class="muted">(paste from My Practice)</span></span>
      <textarea class="input log-text" data-log="text" rows="4" maxlength="6000" placeholder="Paste the passage or question, the answer choices, and the explanation here.">${esc(row.text)}</textarea>
    </label>
    <label class="field"><span>What I’ll do differently next time <span class="muted">(optional)</span></span>
      <input class="input" data-log="note" maxlength="300" value="${esc(row.note)}" placeholder="e.g. Read every choice before picking one.">
    </label>
  </li>`;
}

export function errorLogEditorHTML(rows) {
  return `<ol class="log-list" data-log-list>${rows.map(errorLogRowHTML).join('')}</ol>
    <p class="log-empty" ${rows.length ? 'hidden' : ''}>No questions in your error log yet. Add one for each question you missed.</p>`;
}

/** Re-number the rows after one is removed. */
export function renumberRows(list) {
  list.querySelectorAll('.log-num').forEach((el, i) => { el.textContent = `Question ${i + 1}`; });
}

/* ------------------------------ Read-only view ----------------------------- */
function rowTitle(row) {
  const where = [SECTION_NAME[row.section], row.module && `Module ${row.module}`, row.number && `Q${row.number}`].filter(Boolean).join(', ');
  return where || 'Question';
}

function answerLine(row) {
  const parts = [];
  if (row.mine || row.correct) parts.push(`You picked ${esc(row.mine || '?')}; the answer was ${esc(row.correct || '?')}.`);
  if (row.reason) parts.push(`${reasonLabel(row.reason)}.`);
  return parts.join(' ');
}

export function errorLogViewHTML(rows) {
  return `<ol class="log-view">${rows.map((row) => `
    <li>
      <p class="log-view-head"><b>${rowTitle(row)}</b>${row.skill && getSkill(row.skill) ? `<span class="chip">${getSkill(row.skill).name}</span>` : ''}</p>
      ${answerLine(row) ? `<p class="small">${answerLine(row)}</p>` : ''}
      ${row.note ? `<p class="small"><strong>Next time:</strong> ${esc(row.note)}</p>` : ''}
      ${row.text ? `<details><summary class="small">Question and explanation</summary><div class="log-pasted">${esc(row.text)}</div></details>` : ''}
    </li>`).join('')}</ol>`;
}

/* --------------------------------- PDF export ------------------------------ */
const PRINT_CSS = `
  @page { margin: 16mm; }
  body { font: 11pt/1.5 Georgia, 'Times New Roman', serif; color: #17223F; margin: 0; }
  header { border-bottom: 2px solid #18295C; padding-bottom: 8pt; margin-bottom: 14pt; }
  h1 { font-size: 18pt; margin: 0; }
  .meta { font: 10pt/1.4 Arial, sans-serif; color: #4B5674; margin: 4pt 0 0; }
  .entry { break-inside: avoid; border: 1px solid #CBD3E3; border-radius: 4pt; padding: 8pt 10pt; margin-bottom: 10pt; }
  .entry h2 { font: bold 11pt Arial, sans-serif; margin: 0 0 4pt; }
  .entry p { margin: 0 0 4pt; font: 10pt/1.45 Arial, sans-serif; }
  .pasted { white-space: pre-wrap; font: 10pt/1.5 Georgia, serif; border-left: 3px solid #C9A227; padding-left: 8pt; margin-top: 6pt; }
  footer { margin-top: 16pt; font: 9pt Arial, sans-serif; color: #4B5674; }`;

export function printErrorLog(result) {
  const rows = (result.errorLog || []).filter(rowHasContent);
  const scores = result.scores ? `Total ${result.scores.total} (Reading and Writing ${result.scores.rw}, Math ${result.scores.math})` : '';
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>CrestPrep error log - ${esc(result.label)}</title><style>${PRINT_CSS}</style></head><body>
    <header>
      <h1>Error log: ${esc(result.label)}</h1>
      <p class="meta">Taken ${formatDate(result.date, { month: 'long', day: 'numeric', year: 'numeric' })}${scores ? `. ${scores}` : ''}. ${rows.length} question${rows.length === 1 ? '' : 's'}.</p>
    </header>
    ${rows.map((row, i) => `<section class="entry">
      <h2>${i + 1}. ${rowTitle(row)}${row.skill && getSkill(row.skill) ? `: ${getSkill(row.skill).name}` : ''}</h2>
      ${answerLine(row) ? `<p>${answerLine(row)}</p>` : ''}
      ${row.note ? `<p><strong>Next time:</strong> ${esc(row.note)}</p>` : ''}
      ${row.text ? `<div class="pasted">${esc(row.text)}</div>` : ''}
    </section>`).join('')}
    ${result.errorLogPdf?.text ? `<section class="entry"><h2>From your uploaded error log (${esc(result.errorLogPdf.fileName)})</h2><div class="pasted">${esc(result.errorLogPdf.text)}</div></section>` : ''}
    <footer>Made with CrestPrep, a free Digital SAT course. SAT is a trademark of the College Board, which does not endorse this site.</footer>
  </body></html>`;

  // Print from a hidden frame so pop-up blockers don't get in the way.
  const frame = document.createElement('iframe');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  frame.setAttribute('aria-hidden', 'true');
  document.body.append(frame);
  frame.contentDocument.open();
  frame.contentDocument.write(html);
  frame.contentDocument.close();
  setTimeout(() => {
    frame.contentWindow.focus();
    frame.contentWindow.print();
    setTimeout(() => frame.remove(), 60000);
  }, 250);
}
