/** util.js: tiny general-purpose helpers. */

/** Fisher–Yates shuffle. Returns a new array and leaves the original alone. */
export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

/** Turn a string into a stable number (used to pick the same "question of the day" all day). */
export function hashString(text) {
  let hash = 0;
  for (const ch of text) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return hash;
}
