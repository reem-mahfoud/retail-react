/**
 * Builds a stable, realistic avatar photo URL derived from a person's
 * name / username. The same seed always resolves to the same real photo,
 * so every user gets a distinct portrait that matches their identity
 * (instead of one shared placeholder face).
 *
 * @param {string} seed - name, username or email used as the identity key
 * @param {number} [size=128] - square size in px
 * @returns {string} absolute avatar URL
 */
export function nameAvatarUrl(seed, size = 128) {
  const key = String(seed ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') || 'user';
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(key)}`;
}
