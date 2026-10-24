/**
 * i18n.js: interface translations.
 *   t('btn.start')                         → "Start free course" (or Español, हिन्दी, ...)
 *   t('hero.sub', { name, score })         → fills in {name} and {score}
 */
import { TRANSLATIONS } from './data/translations.js';
import { getState } from './store.js';

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'zh', label: '中文' },
  { code: 'vi', label: 'Tiếng Việt' },
];

export function t(key, vars = {}) {
  const lang = getState().prefs.lang;
  const text = TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}
