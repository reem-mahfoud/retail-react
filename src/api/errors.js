import { asString, isPlainObject } from 'lib/safeValues';

function extractDetail(data) {
  if (!data) return null;
  if (typeof data === 'string') return data.trim() || null;
  if (!isPlainObject(data)) return null;

  const detail = data.detail ?? data.message ?? data.error;
  if (typeof detail === 'string') return detail.trim() || null;
  if (Array.isArray(detail)) {
    const parts = detail
      .map((item) => {
        if (typeof item === 'string') return item;
        if (isPlainObject(item)) {
          const msg = item.msg ?? item.message;
          const loc = Array.isArray(item.loc) ? item.loc.join('.') : '';
          return loc && msg ? `${loc}: ${msg}` : asString(msg, '');
        }
        return '';
      })
      .filter(Boolean);
    return parts.length ? parts.join('. ') : null;
  }
  return null;
}

/** @param {import('types/api').ApiErrorInput} error */
export function isUnauthorizedError(error) {
  return Boolean(error?.response?.status === 401);
}

/** @param {import('types/api').ApiErrorInput} error */
export function isNetworkError(error) {
  if (!error) return false;
  if (error.code === 'ERR_NETWORK') return true;
  if (error.message === 'Network Error') return true;
  return !error.response && Boolean(error.request);
}

/** @param {import('types/api').ApiErrorInput} error */
export function isTimeoutError(error) {
  return error?.code === 'ECONNABORTED';
}

/**
 * @param {import('types/api').ApiErrorInput} error
 * @param {string} [fallback]
 */
export function getApiErrorMessage(error, fallback = 'Failed to load data') {
  if (!error) return fallback;
  if (typeof error === 'string') return error;

  if (isTimeoutError(error)) {
    return 'Request timed out. Please try again.';
  }

  if (isNetworkError(error)) {
    return 'Network error. Check your connection and try again.';
  }

  const status = error?.response?.status;
  const detail = extractDetail(error?.response?.data);

  if (detail) return detail;

  if (status === 401) return 'Session expired. Please sign in again.';
  if (status === 403) return 'You do not have permission to perform this action.';
  if (status === 404) return 'The requested resource was not found.';
  if (status === 422) return 'Invalid request. Please check your input.';
  if (status >= 500) return 'Server error. Please try again later.';

  return asString(error?.message, fallback);
}
