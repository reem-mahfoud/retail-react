import { useEffect, useState } from 'react';
import { SEARCH_DEBOUNCE_MS } from 'constants/searchDebounce';

/**
 * @template T
 * @param {T} value
 * @param {number} [delayMs]
 * @returns {T}
 */
export function useDebouncedValue(value, delayMs = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

/** @param {string} search @returns {string} */
export function useDebouncedSearch(search) {
  return useDebouncedValue(search, SEARCH_DEBOUNCE_MS);
}
