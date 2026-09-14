import { safeJsonParse } from 'lib/safeJson';

/**
 * @param {Storage} storage
 * @param {string} key
 * @param {string | null} [fallback]
 * @returns {string | null}
 */
export function readStorageItem(storage, key, fallback = null) {
  try {
    return storage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * @param {Storage} storage
 * @param {string} key
 * @param {string} value
 * @returns {boolean}
 */
export function writeStorageItem(storage, key, value) {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/** @param {Storage} storage @param {string} key */
export function removeStorageItem(storage, key) {
  try {
    storage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/**
 * @template T
 * @param {Storage} storage
 * @param {string} key
 * @param {T} fallback
 * @returns {T}
 */
export function readStorageJson(storage, key, fallback) {
  const raw = readStorageItem(storage, key);
  if (!raw) return fallback;
  const parsed = safeJsonParse(raw, fallback);
  return parsed ?? fallback;
}

/**
 * @param {Storage} storage
 * @param {string} key
 * @param {unknown} value
 * @returns {boolean}
 */
export function writeStorageJson(storage, key, value) {
  try {
    return writeStorageItem(storage, key, JSON.stringify(value));
  } catch {
    return false;
  }
}
