import { readStorageJson, writeStorageJson } from 'lib/safeStorage';
import { subscribeStorageList } from 'lib/subscribeStorageList';
import { runSafelyVoid } from 'lib/runSafely';

const STORAGE_KEY = 'retail-react-dashboard-extra-users-v1';

/** Event fired whenever the locally added users list changes. */
export const EXTRA_USERS_CHANGED = 'extra-users:changed';

export function readExtraUsers() {
  if (typeof window === 'undefined') return [];
  const parsed = readStorageJson(window.localStorage, STORAGE_KEY, []);
  return Array.isArray(parsed) ? parsed : [];
}

/** New users are prepended so they appear at the top of the Users table. */
export function prependExtraUser(user) {
  if (!user?.id || typeof window === 'undefined') return;
  const list = readExtraUsers();
  if (list.some((u) => u.id === user.id)) return;
  if (!writeStorageJson(window.localStorage, STORAGE_KEY, [user, ...list])) return;
  runSafelyVoid(() => window.dispatchEvent(new CustomEvent(EXTRA_USERS_CHANGED)));
}

/**
 * Subscribes to locally-added-user changes (same tab + cross tab).
 * @param {() => void} cb
 * @returns {() => void}
 */
export function subscribeExtraUsers(cb) {
  return subscribeStorageList(EXTRA_USERS_CHANGED, cb);
}
