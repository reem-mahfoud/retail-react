import { readStorageItem, removeStorageItem, writeStorageItem } from 'lib/safeStorage';

const TOKEN_KEY = 'api_access_token';

/** @returns {string | null} */
export function getAccessToken() {
  return readStorageItem(localStorage, TOKEN_KEY);
}

/** @param {string} token */
export function setAccessToken(token) {
  writeStorageItem(localStorage, TOKEN_KEY, token);
}

export function clearAccessToken() {
  removeStorageItem(localStorage, TOKEN_KEY);
}
