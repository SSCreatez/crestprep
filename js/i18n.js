/**
 * i18n.js: interface text.
 *   t('btn.start')                         → "Start free course"
 *
 * The site's interface is English. The language setting (prefs.lang) is used
 * only by the Language helper in lessons, which translates each question's key
 * words into the student's language. Other languages' interface strings stay in
 * data/translations.js for a future full translation.
 *   t('hero.sub', { name, score })         → fills in {name} and {score}
 */
import { TRANSLATIONS } from './data/translations.js';

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'zh', label: '中文' },
  { code: 'vi', label: 'Tiếng Việt' },
];

export function t(key, vars = {}) {
  const text = TRANSLATIONS.en[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}
