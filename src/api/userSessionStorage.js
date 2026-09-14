import { readStorageJson, removeStorageItem, writeStorageJson } from 'lib/safeStorage';

const USER_SESSION_KEY = 'api_user_session';

/** @param {object} user */
export function setUserSession(user) {
  writeStorageJson(localStorage, USER_SESSION_KEY, user);
}

/** @returns {object | null} */
export function getUserSession() {
  const parsed = readStorageJson(localStorage, USER_SESSION_KEY, null);
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : null;
}

export function clearUserSession() {
  removeStorageItem(localStorage, USER_SESSION_KEY);
}
