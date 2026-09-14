/**
 * @template T
 * @param {() => T} fn
 * @param {T} fallback
 * @returns {T}
 */
export function runSafely(fn, fallback) {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

/** @param {() => void} fn */
export function runSafelyVoid(fn) {
  try {
    fn();
  } catch {
    /* ignore */
  }
}
