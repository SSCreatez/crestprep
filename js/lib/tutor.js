/**
 * tutor.js: the guided tutor.
 *
 * How it works:
 *  1. Read the student's message and decide what they want (an "intent").
 *  2. Answer from the hints written for that question, one step at a time.
 *  3. Never reveal the answer, even if asked directly.
 *
 * Everything goes through respond(question, message). To plug in a live AI
 * model later, keep this function's shape and send the question + hints to
 * an API from a serverless function; the chat screen won't need to change.
 */
import { findTerms } from '../data/glossary.js';

const INTENTS = [
  ['answer',  /\b(answer|solution|which (one|choice|letter)|just tell|correct choice)\b/i],
  ['pattern', /\b(pattern|type of question|what kind|trick|strategy|approach)\b/i],
  ['desmos',  /\b(desmos|graph|calculator)\b/i],
  ['words',   /\b(word|words|mean|meaning|vocab|translate|english|define)\b/i],
  ['check',   /(\bis it\b|\bi got\b|\bi think it'?s\b|^\s*[a-d]\s*\??\s*$|=\s*-?\d)/i],
  ['hint',    /\b(hint|stuck|help|idk|don'?t know|confused|next|lost|start)\b/i],
];

export function detectIntent(message) {
  const match = INTENTS.find(([, pattern]) => pattern.test(message));
  return match ? match[0] : 'other';
}

export function createTutor() {
  const hintsGiven = new Map(); // question id → how many hints shown so far

  function nextHint(q) {
    const used = hintsGiven.get(q.id) || 0;
    if (used >= q.hints.length) {
      return `That was my last hint. Commit to an answer: the explanation will walk through every step, and if you miss it, it goes to your Review bank to retry later.`;
    }
    hintsGiven.set(q.id, used + 1);
    return `<span class="msg-label">Hint ${used + 1} of ${q.hints.length}</span>${q.hints[used]}`;
  }

  function greet(q, number) {
    return `Let's work through Question ${number} together. What have you tried so far? Ask for a hint whenever you want a nudge. I'll never just hand you the answer.`;
  }

  function respond(q, message, intent = detectIntent(message)) {
    switch (intent) {
      case 'hint':
        return nextHint(q);
      case 'answer':
        return `I won't give you the answer. You'll remember it much better if you get there yourself. Here's a nudge instead:<br>${nextHint(q)}`;
      case 'pattern':
        return `This is a <strong>${q.pattern}</strong> question. Once you can spot this pattern, the same steps work on every question like it. Want a hint for the first step?`;
      case 'desmos':
        return q.desmos
          ? `${q.desmosTip} Open the Desmos tab and press "Load this question's graph."`
          : `${q.desmosTip || 'Desmos won’t save time on this one.'}`;
      case 'words': {
        const terms = findTerms([q.passage, q.stem, ...q.choices].join(' '));
        return terms.length
          ? `Words worth knowing here: ${terms.map((term) => `<strong>${term.word}</strong> (${term.def})`).join('; ')}. The Language tab translates them.`
          : `Here it is in plain English: ${q.plain}`;
      }
      case 'check':
        return q.section === 'math'
          ? `I can't confirm an answer before you submit, but you can check it yourself: plug your value back into the original equation or situation and see if everything matches.`
          : `I can't confirm it before you submit, but here's a check: read the whole sentence with your choice in the blank. Does it match the clue in the text, without adding anything the text doesn't say?`;
      default:
        return `Tell me where you're stuck, or try one of the buttons below. If you're not sure where to start: ${q.hints[0]}`;
    }
  }

  return { respond, greet, reset: (qid) => hintsGiven.delete(qid) };
}
