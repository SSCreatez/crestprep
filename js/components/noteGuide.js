/**
 * noteGuide.js: turns a lesson's guide blocks (from course.js) into a
 * printed-handout style sheet. Each block type has one small renderer.
 */
const BLOCKS = {
  p: (b) => `<p>${b.text}</p>`,
  rule: (b) => `<div class="sheet-rule"><strong>${b.title}</strong>${b.text}</div>`,
  trap: (b) => `<div class="sheet-trap"><strong>Trap:</strong>${b.text}</div>`,
  example: (b) => `<div class="sheet-example"><strong>${b.title || 'Example'}:</strong> ${b.text}</div>`,
  steps: (b) => `${b.title ? `<h4>${b.title}</h4>` : ''}<ol>${b.items.map((i) => `<li>${i}</li>`).join('')}</ol>`,
  list: (b) => `${b.title ? `<h4>${b.title}</h4>` : ''}<ul>${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>`,
  table: (b) => `<div class="sheet-table-wrap"><table>
      <thead><tr>${b.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
      <tbody>${b.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`,
};

export function noteGuideHTML(lesson, chapter, { limit = Infinity } = {}) {
  const blocks = lesson.guide.slice(0, limit).map((block) => BLOCKS[block.type](block)).join('');
  return `<div class="sheet">
    <div class="sheet-head"><span>CrestPrep note guide</span><span>${chapter.title}</span></div>
    <h3>${lesson.title}</h3>
    ${blocks}
  </div>`;
}

/** Plain text of a guide (the language helper scans it for hard words). */
export function guideText(lesson) {
  return (lesson.guide || []).map((b) => [b.title, b.text, ...(b.items || []), ...(b.head || []), ...((b.rows || []).flat())].filter(Boolean).join(' ')).join(' ');
}
