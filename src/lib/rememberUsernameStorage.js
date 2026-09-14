import { readStorageItem, removeStorageItem, writeStorageItem } from 'lib/safeStorage';

const KEY = 'retail_login_remember_username';

export function readRememberedUsername() {
  return readStorageItem(localStorage, KEY, '') || '';
}

/** @param {string} [username] */
export function persistRememberedUsername(username) {
  const trimmed = username?.trim();
  if (trimmed) {
    writeStorageItem(localStorage, KEY, trimmed);
  } else {
    removeStorageItem(localStorage, KEY);
  }
}
