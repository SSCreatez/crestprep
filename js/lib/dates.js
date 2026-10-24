/**
 * dates.js: dates are stored as 'YYYY-MM-DD' strings in the student's local time.
 * Working at noon avoids daylight-saving bugs when adding or subtracting days.
 */
const atNoon = (iso) => new Date(`${iso}T12:00:00`);

export function todayISO(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(iso, days) {
  const date = atNoon(iso);
  date.setDate(date.getDate() + days);
  return todayISO(date);
}

/** Whole days from one date to another (positive if `to` is later). */
export function daysBetween(fromISO, toISO) {
  return Math.round((atNoon(toISO) - atNoon(fromISO)) / 86400000);
}

/** 0 = Sunday ... 6 = Saturday */
export const weekday = (iso) => atNoon(iso).getDay();

export function formatDate(iso, options = { weekday: 'short', month: 'short', day: 'numeric' }) {
  return atNoon(iso).toLocaleDateString('en-US', options);
}
