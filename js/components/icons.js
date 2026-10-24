/**
 * icons.js: small hand-made SVG icons (no icon library needed).
 * They use currentColor, so they match whatever text color surrounds them.
 */
const svg = (body, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${body}</svg>`;

/** The CrestPrep crest: a shield with a gold peak (the "crest" you climb to). */
export const CREST = `<svg class="crest" viewBox="0 0 32 36" aria-hidden="true">
  <path d="M16 1.5 L30 6.5 V17 C30 25.5 23.8 31.6 16 34.5 C8.2 31.6 2 25.5 2 17 V6.5 Z" fill="var(--crest-fill)" stroke="var(--gold)" stroke-width="1.2"/>
  <path d="M8.5 22 L13.5 14.5 L16.8 19 L19.3 16 L23.5 22" fill="none" stroke="var(--gold)" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
</svg>`;

export const ICONS = {
  calculator: svg('<rect x="5" y="3" width="14" height="18" rx="2"/><rect x="8" y="6" width="8" height="3"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01"/>'),
  tutor: svg('<path d="M4 5h16v11H9l-5 4z"/><path d="M9 9.5h6M9 12.5h4"/>'),
  globe: svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9s-1.3 6.2-3.8 9c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3z"/>'),
  guide: svg('<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 15.5h7M9 8.5h3"/>'),
  practice: svg('<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>'),
  bolt: svg('<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>'),
  target: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>'),
  path: svg('<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h5a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h5"/>'),
  upload: svg('<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v5h16v-5"/>'),
  calendar: svg('<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>'),
  home: svg('<path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/>'),
  list: svg('<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>'),
};
