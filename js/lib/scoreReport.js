/**
 * scoreReport.js: reads PDFs in the browser for Crest Ingest.
 *
 *  readPdfText(file)        → the text inside a PDF (pdf.js, bundled in js/vendor/pdfjs)
 *  parseScoreReport(text)   → test name, date, scores, and right answers per section
 *
 * The PDF never leaves the student's computer: pdf.js opens it right here in
 * the browser. Whatever we find pre-fills the form, and the student checks it.
 */

let pdfjs = null;

/** Load pdf.js the first time a PDF is chosen (or use a copy the page already has). */
async function loadPdfJs() {
  if (!pdfjs && globalThis.pdfjsLib) pdfjs = globalThis.pdfjsLib;
  if (!pdfjs) {
    pdfjs = await import(new URL('../vendor/pdfjs/pdf.min.js', import.meta.url).href);
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('../vendor/pdfjs/pdf.worker.min.js', import.meta.url).href;
  }
  return pdfjs;
}

async function openPdf(file) {
  const lib = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  return lib.getDocument({ data, isEvalSupported: false }).promise;
}

/** Text of one page, in both orders (see readPdfText). */
async function pageText(page) {
  const { items } = await page.getTextContent();
  return { items, lines: linesFromItems(items), stream: items.map((item) => item.str).join(' ') };
}

/**
 * Pull the text out of a PDF (used for error logs made somewhere else). Returns:
 *   text   → each visual line rebuilt left to right (easy to read, sent to Gemini)
 *   stream → the pieces in the order the PDF stores them (usually reading order)
 */
export async function readPdfText(file, { maxPages = 8 } = {}) {
  const pdf = await openPdf(file);
  const lines = [];
  const stream = [];
  for (let n = 1; n <= Math.min(pdf.numPages, maxPages); n++) {
    const page = await pdf.getPage(n);
    const text = await pageText(page);
    lines.push(text.lines);
    stream.push(text.stream);
  }
  const pages = pdf.numPages;
  await pdf.destroy();
  return { text: lines.join('\n\n'), stream: stream.join('\n'), pages };
}

/**
 * Read a College Board practice score report: everything parseScoreReport()
 * finds in the text, plus the Knowledge and Skills bars (see readBands).
 */
export async function readScoreReport(file) {
  const pdf = await openPdf(file);
  try {
    const page = await pdf.getPage(1);
    const text = await pageText(page);
    const found = parseScoreReport({ stream: text.stream, text: text.lines }, file.name);
    try {
      const bands = await readBands(page, text.items);
      if (Object.keys(bands).length) found.bands = bands;
    } catch { /* the bars are a bonus; the scores still count */ }
    return found;
  } finally {
    await pdf.destroy();
  }
}

/* ------------------------- Knowledge and Skills bars ------------------------- */
/**
 * Each domain on the report has a bar of 7 boxes; filled boxes show how the
 * student did. The boxes are drawings, not text, so we draw the page onto a
 * hidden canvas and look at the pixels just below each domain's name:
 *   1. find the domain's name in the text and where it sits on the canvas
 *   2. go down to the first row of pixels that is mostly dark (the top of the bar)
 *   3. walk across the middle of the bar: a long dark run is a filled box,
 *      a box that is only an outline shows up as two thin dark lines
 */
const DOMAIN_LABELS = {
  'information and ideas': 'information_ideas', 'craft and structure': 'craft_structure',
  'expression of ideas': 'expression_of_ideas', 'standard english conventions': 'standard_english',
  'algebra': 'algebra', 'advanced math': 'advanced_math',
  'problem-solving and data analysis': 'problem_solving', 'geometry and trigonometry': 'geometry_trig',
};

async function readBands(page, items) {
  const scale = 2;
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  await page.render({ canvasContext: ctx, canvas, viewport }).promise;
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dark = (x, y) => {
    const i = (Math.round(y) * width + Math.round(x)) * 4;
    return data[i + 3] > 128 && data[i] + data[i + 1] + data[i + 2] < 300;
  };

  const start = items.findIndex((item) => /knowledge and skills/i.test(item.str));
  const bands = {};
  for (const item of items.slice(Math.max(0, start))) {
    const key = DOMAIN_LABELS[item.str.trim().toLowerCase()];
    if (!key || bands[key]) continue;
    const [left, baseline] = viewport.convertToViewportPoint(item.transform[4], item.transform[5]);
    const span = 230 * scale;                       // seven boxes are about 220 points wide
    const right = Math.min(width - 1, left + span);
    const share = (y) => {
      let n = 0;
      for (let x = left; x < right; x += 1) if (dark(x, y)) n++;
      return n / (right - left);
    };
    // 2. the top of the bar: the first mostly-dark row below the name
    let top = -1;
    for (let y = baseline + 4; y < Math.min(height - 1, baseline + 70 * scale); y++) {
      if (share(y) > 0.55) { top = y; break; }
    }
    if (top < 0) continue;
    let bottom = top;
    for (let y = top; y < top + 16 * scale && y < height - 1; y++) if (share(y) > 0.55) bottom = y;
    const middle = Math.round((top + bottom) / 2);
    // 3. dark runs across the middle of the bar
    const runs = [];
    let run = 0;
    for (let x = left; x <= right; x++) {
      if (x < right && dark(x, middle)) run++;
      else if (run) { runs.push(run); run = 0; }
    }
    const filled = runs.filter((r) => r >= 12 * scale).length;
    const outlines = Math.round(runs.filter((r) => r < 4 * scale).length / 2);
    if (filled + outlines >= 3) bands[key] = { filled, of: filled + outlines };
  }
  return bands;
}

function linesFromItems(items) {
  const pieces = items
    .filter((item) => item.str && item.str.trim())
    .map((item) => ({ text: item.str.trim(), x: item.transform[4], y: item.transform[5] }));
  pieces.sort((a, b) => b.y - a.y || a.x - b.x);           // top of the page first
  const lines = [];
  for (const piece of pieces) {
    const line = lines[lines.length - 1];
    if (line && Math.abs(line.y - piece.y) < 3) line.parts.push(piece);
    else lines.push({ y: piece.y, parts: [piece] });
  }
  return lines.map((line) => line.parts.sort((a, b) => a.x - b.x).map((p) => p.text).join('  ')).join('\n');
}

/* ------------------------------- Parsing ------------------------------- */
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const iso = (y, m, d) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

/** Numbers in the text with their position, skipping percents, decimals, and parts of ranges like "200-800". */
function numbersIn(text) {
  const found = [];
  for (const match of text.matchAll(/\d+/g)) {
    const before = text.slice(Math.max(0, match.index - 3), match.index);
    const after = text.slice(match.index + match[0].length, match.index + match[0].length + 3);
    if (/[-–—]\s*$/.test(before) || /^\s*[-–—]/.test(after)) continue;   // part of a range
    if (/^\s*%/.test(after) || /^\.\d/.test(after) || /\d\.$/.test(before)) continue;
    found.push({ value: Number(match[0]), at: match.index });
  }
  return found;
}

/** The first number in [min, max] (a multiple of `step`) that comes within `reach` characters after a label. */
function numberAfter(text, numbers, labelPattern, { min, max, step = 1, reach = 80, from = 0 } = {}) {
  const label = new RegExp(labelPattern.source, labelPattern.flags.includes('g') ? labelPattern.flags : `${labelPattern.flags}g`);
  label.lastIndex = from;
  let match;
  while ((match = label.exec(text))) {
    const start = match.index + match[0].length;
    const hit = numbers.find((n) => n.at >= start && n.at - start <= reach && n.value >= min && n.value <= max && n.value % step === 0);
    if (hit) return { ...hit, labelAt: match.index };
  }
  return null;
}

/**
 * Find what we can in a score report. `source` is readPdfText()'s result (or plain text).
 * The parts of the PDF in stored order are tried first, then the rebuilt lines.
 */
export function parseScoreReport(source, fileName = '') {
  const versions = typeof source === 'string' ? [source] : [source.stream, source.text];
  const found = {};
  for (const version of versions.filter(Boolean)) {
    const more = parseText(version);
    for (const [key, value] of Object.entries(more)) if (found[key] === undefined) found[key] = value;
  }

  // Fall back to the file name College Board uses: NAME_SAT_PRACTICE_11_10152026.pdf
  const fromFile = String(fileName).match(/(PSAT|SAT)_PRACTICE_(\d{1,2})_(\d{2})(\d{2})(\d{4})/i);
  if (fromFile) {
    if (!found.testName) found.testName = `${fromFile[1].toUpperCase()} Practice ${Number(fromFile[2])}`;
    if (!found.date) found.date = iso(fromFile[5], fromFile[3], fromFile[4]);
  }
  const length = versions.filter(Boolean).reduce((sum, v) => sum + v.trim().length, 0);
  return { ...found, hasText: length > 40 };
}

function parseText(text) {
  const flat = String(text).replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').replace(/(\d),(\d{3})\b/g, '$1$2');
  const numbers = numbersIn(flat);
  const found = {};

  // Test name: "SAT Practice 11", "PSAT/NMSQT Practice 3", ...
  const name = flat.match(/\b((?:PSAT\/NMSQT(?: and PSAT 10)?|PSAT 10|PSAT 8\/9|SAT))\s+Practice(?:\s+Test)?\s*#?\s*(\d{1,2})\b/i);
  if (name) found.testName = `${name[1].toUpperCase().replace('AND', 'and')} Practice ${name[2]}`;

  // Date: the first "October 15, 2026" style date
  const date = flat.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/i);
  if (date) found.date = iso(date[3], MONTHS.indexOf(date[1].toLowerCase()) + 1, date[2]);

  // Scores: the total right after "Total Score", each section right after its name
  const total = numberAfter(flat, numbers, /total\s+score/i, { min: 400, max: 1600, step: 10 });
  const sectionsStart = flat.search(/section\s+scores/i);
  const rw = numberAfter(flat, numbers, /reading\s+and\s+writing/i, { min: 200, max: 800, step: 10, reach: 40, from: Math.max(0, sectionsStart) });
  const math = numberAfter(flat, numbers, /\bmath\b/i, { min: 200, max: 800, step: 10, reach: 40, from: Math.max(0, sectionsStart) });
  if (rw && math && (!total || rw.value + math.value === total.value)) {
    found.rw = rw.value;
    found.math = math.value;
    found.total = rw.value + math.value;
  } else if (total) {
    found.total = total.value;
    // Columns can scramble the order: look for two section scores that add up to the total.
    const sections = numbers.filter((n) => n.value >= 200 && n.value <= 800 && n.value % 10 === 0);
    const pair = sections.flatMap((a, i) => sections.slice(i + 1).map((b) => [a, b])).find(([a, b]) => a.value + b.value === total.value);
    if (pair) [found.rw, found.math] = [pair[0].value, pair[1].value];   // R&W is printed before Math
  }

  // Right answers: "82 Correct Answers", then one number for each section
  const correct = [
    ...[...flat.matchAll(/(\d{1,2})\s*(?:correct\s+answers?|questions?\s+correct)/gi)].map((m) => ({ at: m.index, n: Number(m[1]) })),
    ...[...flat.matchAll(/correct\s+answers?\s*:?\s*(\d{1,2})\b/gi)].map((m) => ({ at: m.index, n: Number(m[1]) })),
  ].sort((a, b) => a.at - b.at).map((c) => c.n);
  const triple = findTriple(correct);
  if (triple) found.correct = triple;

  // Wrong answers: "Total Incorrect: 16", then "Incorrect Answers: 9" for each section
  const incorrect = [...flat.matchAll(/(?:total\s+)?incorrect(?:\s+answers?)?\s*:?\s*(\d{1,2})\b/gi)].map((m) => Number(m[1]));
  const missed = findTriple(incorrect);
  if (missed) found.missed = missed;
  else if (triple) found.missed = { total: 98 - triple.total, rw: 54 - triple.rw, math: 44 - triple.math };

  return found;
}

/** From the "correct answers" numbers, find total = R&W + Math (54 and 44 questions at most). */
function findTriple(values) {
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values.length; j++) {
      for (let k = 0; k < values.length; k++) {
        if (new Set([i, j, k]).size < 3) continue;
        const [t, r, m] = [values[i], values[j], values[k]];
        if (r + m === t && r <= 54 && m <= 44 && t <= 98 && j < k) return { total: t, rw: r, math: m };
      }
    }
  }
  return null;
}
