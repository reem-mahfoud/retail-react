/**
 * @template {unknown} T
 * @param {string} raw
 * @param {T} [fallback]
 * @returns {T}
 */
export function safeJsonParse(raw, fallback = null) {
  try {
    return JSON.parse(raw);
  } catch {
    return /** @type {T} */ (fallback);
  }
}
