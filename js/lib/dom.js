/**
 * dom.js: small helpers that keep the views readable.
 */

/** Escape text typed by a user before putting it into HTML (prevents injected markup). */
export function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/**
 * Event delegation: ONE listener on a view handles every element inside it
 * that has a data-action attribute. Re-drawing the view's HTML never breaks
 * the buttons, because the listener lives on the parent, not on each button.
 *
 *   onAction(view, { 'save-goal': (el) => { ... } });
 *   <button data-action="save-goal">Save</button>
 */
export function onAction(root, handlers, eventType = 'click') {
  root.addEventListener(eventType, (event) => {
    const target = event.target.closest('[data-action]');
    if (!target || !root.contains(target)) return;
    const handler = handlers[target.dataset.action];
    if (handler) handler(target, event);
  });
}

/** Typeset any \( math \) inside an element with KaTeX (skips quietly if KaTeX didn't load). */
export function renderMath(el) {
  if (!el || typeof window.renderMathInElement !== 'function') return;
  window.renderMathInElement(el, {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '\\(', right: '\\)', display: false },
    ],
    throwOnError: false,
  });
}

/** Small message at the bottom of the screen, e.g. "+10 XP". */
export function toast(message, kind = 'info') {
  const root = document.getElementById('toast-root');
  if (!root) return;
  const item = document.createElement('div');
  item.className = `toast toast-${kind}`;
  item.textContent = message;
  root.append(item);
  setTimeout(() => item.classList.add('is-leaving'), 2400);
  setTimeout(() => item.remove(), 2800);
}

/** Load an external script once (used for Desmos). Rejects if it fails or takes too long. */
const scriptCache = new Map();
export function loadScript(src, timeoutMs = 8000) {
  if (scriptCache.has(src)) return scriptCache.get(src);
  const promise = new Promise((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = src;
    tag.async = true;
    const timer = setTimeout(() => reject(new Error(`Timed out loading ${src}`)), timeoutMs);
    tag.onload = () => { clearTimeout(timer); resolve(); };
    tag.onerror = () => { clearTimeout(timer); reject(new Error(`Could not load ${src}`)); };
    document.head.append(tag);
  });
  scriptCache.set(src, promise);
  promise.catch(() => scriptCache.delete(src));
  return promise;
}
