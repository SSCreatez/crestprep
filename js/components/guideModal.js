/**
 * guideModal.js: the "How?" pop-ups on Crest Ingest.
 *   openGuide('report')   → Saransh's score report tutorial (his own screenshots)
 *   openGuide('errorlog') → how to fill in the error log from My Practice
 * Uses the browser's built-in <dialog>, so Esc and the backdrop close it.
 */
const MY_PRACTICE_URL = 'https://mypractice.collegeboard.org/';

const GUIDES = {
  report: {
    title: 'How to get your score report',
    body: `
      <ol class="guide-steps">
        <li>Go to <a href="https://www.collegeboard.org/" target="_blank" rel="noopener">collegeboard.org</a> and sign in.</li>
        <li>Click <strong>My SAT</strong>.</li>
        <li>Navigate to the practice test you took on Bluebook.</li>
        <li>Click <strong>Score Details</strong>.</li>
        <li>Click <strong>Download Score Report</strong>, then upload that PDF into the score report section here.</li>
      </ol>
      <figure class="guide-shot">
        <a href="assets/guide/score-report-step1.webp" target="_blank" rel="noopener"><img src="assets/guide/score-report-step1.webp" width="1600" height="900" loading="lazy"
          alt="Steps 1 to 4: sign in at collegeboard.org, click My SAT, find the practice test you took on Bluebook, and click Score Details."></a>
        <figcaption>Steps 1 to 4. Click a picture to open it full size.</figcaption>
      </figure>
      <figure class="guide-shot">
        <a href="assets/guide/score-report-step2.webp" target="_blank" rel="noopener"><img src="assets/guide/score-report-step2.webp" width="1600" height="900" loading="lazy"
          alt="Step 5: on the Score Details page, click Download Score Report."></a>
        <figcaption>Step 5: Download Score Report.</figcaption>
      </figure>
      <p class="small muted">Your PDF is read right here in your browser. It isn't uploaded anywhere.</p>`,
    action: `<a class="btn btn-primary btn-sm" href="${MY_PRACTICE_URL}" target="_blank" rel="noopener">Open My Practice</a>`,
  },
  errorlog: {
    title: 'How to fill in your error log',
    body: `
      <p>Follow the steps in the score report tutorial until step 4, then:</p>
      <p>Open your test in <strong>My Practice</strong> and go to <strong>Score Details</strong>.</p>
      <ol class="guide-steps">
        <li>Filter the table by <strong>Incorrect</strong> so you only see what you missed.</li>
        <li>Click <strong>Review</strong> on the first missed question.</li>
        <li>Highlight the passage/question text, answer choices, and explanation if you would like directly from the pop-up window and paste them into the error log.</li>
        <li>When you're done, click <strong>Download as PDF</strong> to export the error log. You can use it later when reviewing past mistakes :)</li>
      </ol>
      <p class="small muted">Already made an error log somewhere else, like Google Docs? Export it as a PDF and upload it at the bottom of the error log instead.</p>`,
    action: `<a class="btn btn-primary btn-sm" href="${MY_PRACTICE_URL}" target="_blank" rel="noopener">Open My Practice</a>`,
  },
};

let dialog = null;

export function openGuide(kind) {
  const guide = GUIDES[kind];
  if (!guide) return;
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.className = 'guide-dialog';
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog || event.target.closest('[data-guide-close]')) dialog.close();
    });
    document.body.append(dialog);
  }
  dialog.innerHTML = `
    <div class="guide-inner">
      <header class="guide-head">
        <h2>${guide.title}</h2>
        <button type="button" class="drawer-close" data-guide-close aria-label="Close">✕</button>
      </header>
      <div class="guide-body">${guide.body}</div>
      <footer class="guide-foot">${guide.action}<button type="button" class="btn btn-outline btn-sm" data-guide-close>Got it</button></footer>
    </div>`;
  dialog.showModal();
  dialog.querySelector('.guide-body').scrollTop = 0;
}
