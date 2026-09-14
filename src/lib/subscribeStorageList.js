import { runSafelyVoid } from 'lib/runSafely';

/**
 * Subscribes to a custom event and cross-tab `storage` updates.
 * @param {string} changedEvent
 * @param {() => void} cb
 * @returns {() => void}
 */
export function subscribeStorageList(changedEvent, cb) {
  if (typeof window === 'undefined') return () => {};

  const handler = () => runSafelyVoid(() => cb?.());
  window.addEventListener(changedEvent, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(changedEvent, handler);
    window.removeEventListener('storage', handler);
  };
}

/**
 * Like {@link subscribeStorageList} but only reacts to `storage` when `event.key` is listed.
 * @param {string[]} keys
 * @param {string} changedEvent
 * @param {() => void} cb
 * @returns {() => void}
 */
export function subscribeStorageKeys(keys, changedEvent, cb) {
  if (typeof window === 'undefined') return () => {};

  const handler = () => runSafelyVoid(() => cb?.());
  const onStorage = (e) => {
    if (keys.includes(e.key)) handler();
  };

  window.addEventListener(changedEvent, handler);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(changedEvent, handler);
    window.removeEventListener('storage', onStorage);
  };
}
