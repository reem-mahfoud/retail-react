import { runSafelyVoid } from 'lib/runSafely';

const AUTH_UNAUTHORIZED_EVENT = 'cradle:auth-unauthorized';

export function emitUnauthorized() {
  if (typeof window === 'undefined') return;
  runSafelyVoid(() => window.dispatchEvent(new CustomEvent(AUTH_UNAUTHORIZED_EVENT)));
}

/** @param {() => void} listener @returns {() => void} */
export function onUnauthorized(listener) {
  if (typeof window === 'undefined') return () => {};
  const handler = () => runSafelyVoid(listener);
  window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handler);
  return () => window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handler);
}
