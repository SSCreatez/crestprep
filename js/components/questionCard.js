/**
 * questionCard.js: one component renders every question in the app.
 *
 * Modes:
 *   'learn'   → grade on click, award XP, save misses to Review (course + practice sets)
 *   'preview' → grade on click but record nothing (landing page samples)
 *   'select'  → only mark the chosen answer; grading happens later (tests, end-of-set feedback)
 */
import { getQuestion } from '../data/questions.js';
import { SKILLS, DIFFICULTY_LABEL } from '../data/skills.js';
import { recordAnswer } from '../store.js';
import { renderMath, toast } from '../lib/dom.js';
import { t } from '../i18n.js';
import { ICONS } from './icons.js';

export const LETTERS = ['A', 'B', 'C', 'D'];

export function questionCardHTML(q, { number = 1, mode = 'learn', tools = false, selected = null } = {}) {
  return `
  <article class="q-card" data-qid="${q.id}" data-mode="${mode}" data-number="${number}">
    <header class="q-head">
      <span class="q-num">Question ${number}</span>
      <span class="q-meta">${SKILLS[q.skill].label}<span class="q-diff" data-level="${q.difficulty}">${DIFFICULTY_LABEL[q.difficulty]}</span></span>
    </header>
    ${q.passage ? `<div class="q-passage">${q.passage}</div>` : ''}
    <div class="q-stem">${q.stem}</div>
    <ol class="q-choices">
      ${q.choices.map((choice, i) => `
        <li><button type="button" class="choice" data-choice="${i}" aria-pressed="${selected === i}">
          <span class="choice-letter">${LETTERS[i]}</span><span class="choice-text">${choice}</span>
        </button></li>`).join('')}
    </ol>
    ${tools ? `
    <div class="q-tools">
      <button type="button" class="btn btn-outline btn-sm" data-action="tool" data-tool="tutor" data-qid="${q.id}">${ICONS.tutor} ${t('q.hint')}</button>
      ${q.desmos ? `<button type="button" class="btn btn-outline btn-sm" data-action="tool" data-tool="desmos" data-qid="${q.id}">${ICONS.calculator} Desmos</button>` : ''}
      <button type="button" class="btn btn-outline btn-sm" data-action="tool" data-tool="esl" data-qid="${q.id}">${ICONS.globe} ${t('tool.esl')}</button>
    </div>` : ''}
    <div class="q-result" hidden></div>
  </article>`;
}

/** The written step-by-step explanation shown after grading. */
export function explanationHTML(q, choice, { saved = false } = {}) {
  const correct = choice === q.answer;
  const verdict = correct
    ? `<p class="verdict verdict-good">${t('q.correct')} The answer is ${LETTERS[q.answer]}.</p>`
    : `<p class="verdict verdict-bad">${t('q.incorrect')} ${choice >= 0 ? `You chose ${LETTERS[choice]}; ` : 'You skipped this one; '}the answer is ${LETTERS[q.answer]}.</p>`;
  return `${verdict}
    <h4>${t('q.explain')}</h4>
    <ol class="q-steps">${q.steps.map((step) => `<li>${step}</li>`).join('')}</ol>
    <p class="q-note q-note-trap"><strong>The trap:</strong> ${q.trap}</p>
    ${q.section === 'math' && q.desmosTip ? `<p class="q-note q-note-desmos"><strong>Desmos shortcut:</strong> ${q.desmosTip}</p>` : ''}
`;
}

/** Color the choices green/red, lock the card, and show the explanation. */
export function gradeCard(card, q, choice, opts = {}) {
  card.dataset.locked = 'true';
  card.querySelectorAll('.choice').forEach((button, i) => {
    button.disabled = true;
    if (i === q.answer) button.classList.add('is-correct');
    else if (i === choice) button.classList.add('is-wrong');
  });
  const result = card.querySelector('.q-result');
  result.hidden = false;
  result.innerHTML = explanationHTML(q, choice, opts);
  renderMath(result);
}

export function selectChoice(card, choice) {
  card.dataset.selected = String(choice);
  card.querySelectorAll('.choice').forEach((button, i) => button.setAttribute('aria-pressed', String(i === choice)));
}

/** Show "+10 XP" (and a level-up message if one happened). */
export function announce(result) {
  if (!result) return;
  if (result.xp) toast(`+${result.xp} XP${result.correct === false ? ' for trying' : ''}`, result.correct === false ? 'info' : 'good');
  if (result.levelUp) setTimeout(() => toast(`Level ${result.levelUp.level}: ${result.levelUp.title}`, 'gold'), 500);
}

/**
 * Make every question card inside `root` clickable (one listener for all of them).
 * onAnswer(question, choice, card, result) runs after each answer.
 */
export function wireQuestionCards(root, { source = 'Practice', onAnswer } = {}) {
  root.addEventListener('click', (event) => {
    const button = event.target.closest('.choice');
    if (!button || !root.contains(button)) return;
    const card = button.closest('.q-card');
    if (!card || card.dataset.locked) return;

    const q = getQuestion(card.dataset.qid);
    const choice = Number(button.dataset.choice);
    const mode = card.dataset.mode;

    if (mode === 'select') {
      selectChoice(card, choice);
      onAnswer?.(q, choice, card, null);
      return;
    }

    let result = null;
    if (mode === 'learn') {
      result = recordAnswer(q, choice, source);
      announce(result);
    }
    gradeCard(card, q, choice, { saved: result?.savedToReview });
    onAnswer?.(q, choice, card, result);
  });
}
