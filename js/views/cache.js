/**
 * cache.js: the Crest Cache (#/cache), every test a student has added.
 *
 * Each Bluebook upload and diagnostic is saved with its breakdown, error log,
 * and Gemini analysis, so studying never has to be a one-time thing: open an
 * old test, re-read what went wrong, or download its error log again.
 */
import { getState, getResult, deleteResult } from '../store.js';
import { analyzeResult } from '../lib/bluebookAnalyzer.js';
import { formatDate } from '../lib/dates.js';
import { onAction, esc, toast } from '../lib/dom.js';
import { printErrorLog, rowHasContent } from '../components/errorLog.js';
import { ICONS } from '../components/icons.js';

/** Points gained or lost since the student's previous scored test. */
function changeSince(results, index) {
  const score = results[index].scores?.total;
  const before = results.slice(index + 1).find((r) => r.scores?.total);
  if (!score || !before) return '';
  const diff = score - before.scores.total;
  if (!diff) return `<span class="delta">same as ${esc(before.label)}</span>`;
  return `<span class="delta ${diff > 0 ? 'up' : 'down'}">${diff > 0 ? '+' : '−'}${Math.abs(diff)} since ${esc(before.label)}</span>`;
}

function rowHTML(result, index, results) {
  const missed = analyzeResult(result).total;
  const logCount = (result.errorLog || []).filter(rowHasContent).length;
  const facts = [
    { bluebook: 'Bluebook practice test', crestprep: 'CrestPrep practice test' }[result.source] || 'CrestPrep diagnostic',
    `${missed} missed`,
    logCount ? `${logCount} in the error log` : '',
    result.ai?.analysis ? 'Gemini’s take saved' : '',
  ].filter(Boolean).join(', ');
  return `<li class="cache-row">
    <time class="cache-date mono" datetime="${result.date}">${formatDate(result.date, { month: 'short', day: 'numeric', year: 'numeric' })}</time>
    <div class="cache-main">
      <h2><a href="#/results/${result.id}">${esc(result.label)}</a></h2>
      <p class="small muted">${facts}</p>
    </div>
    <div class="cache-score">${result.scores ? `<b class="mono">${result.scores.total}</b>${changeSince(results, index)}` : '<span class="muted small">no score</span>'}</div>
    <div class="cache-actions">
      <a class="btn btn-outline btn-sm" href="#/results/${result.id}">Open breakdown</a>
      ${logCount || result.errorLogPdf ? `<button type="button" class="btn btn-ghost btn-sm" data-action="pdf" data-id="${result.id}">Error log PDF</button>` : ''}
      <button type="button" class="btn btn-ghost btn-sm cache-delete" data-action="delete" data-id="${result.id}">Delete</button>
    </div>
  </li>`;
}

export function render(view) {
  const draw = () => {
    const { results } = getState();
    view.innerHTML = `
    <div class="page"><div class="wrap-narrow cache">
      <header class="page-head">
        <h1>Crest Cache</h1>
        <p>Every Bluebook test and diagnostic you’ve added, with its breakdown, error log, and Gemini’s take. Newest first.</p>
      </header>
      ${results.length
        ? `<ol class="cache-list">${results.map((r, i) => rowHTML(r, i, results)).join('')}</ol>`
        : `<div class="empty">
            <p>nothing here yet. add your first Bluebook test and it’ll show up here :)</p>
            <a class="btn btn-primary" href="#/upload">${ICONS.upload} Go to Crest Ingest</a>
          </div>`}
      ${results.length ? `<p class="small muted cache-note">Your Crest Cache is saved in this browser. The study calendar always follows your newest test.</p>` : ''}
    </div></div>`;
  };

  onAction(view, {
    pdf: (el) => printErrorLog(getResult(el.dataset.id)),
    delete: (el) => {
      if (!el.dataset.armed) {
        el.dataset.armed = 'true';
        el.textContent = 'Click again to delete';
        setTimeout(() => { if (el.isConnected) { delete el.dataset.armed; el.textContent = 'Delete'; } }, 4000);
        return;
      }
      const label = getResult(el.dataset.id)?.label;
      deleteResult(el.dataset.id);
      toast(`Deleted ${label}`);
      draw();
    },
  });
  draw();
}
