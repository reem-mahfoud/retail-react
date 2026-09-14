/**
 * @param {unknown} value
 * @param {string} [fallback]
 * @returns {string}
 */
export function asString(value, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

/** @param {unknown} value @param {string} [fallback] @returns {string} */
export function asTrimmedString(value, fallback = '') {
  const s = asString(value, fallback);
  return s.trim();
}

/** @param {unknown} value @returns {string | null} */
export function asOptionalTrimmedString(value) {
  const s = asTrimmedString(value, '');
  return s || null;
}

/** @param {unknown} data @param {string} [fallback] @returns {string} */
export function responseDataAsString(data, fallback = '') {
  return asString(data, fallback);
}

/**
 * @param {Record<string, unknown> | null | undefined} obj
 * @param {string} key
 * @param {string} [fallback]
 * @returns {string}
 */
export function pickString(obj, key, fallback = '') {
  if (!obj || typeof obj !== 'object') return fallback;
  return asString(obj[key], fallback);
}

/**
 * @param {Record<string, unknown> | null | undefined} obj
 * @param {string} key
 * @returns {string | null}
 */
export function pickOptionalTrimmedString(obj, key) {
  if (!obj || typeof obj !== 'object') return null;
  return asOptionalTrimmedString(obj[key]);
}

/** @param {unknown} value @returns {string | null} */
export function asDataUrl(value) {
  const s = asString(value, '');
  return s.startsWith('data:') ? s : null;
}

/** @param {unknown} value @returns {value is Record<string, unknown>} */
export function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
