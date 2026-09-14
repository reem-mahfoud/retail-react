import { useEffect } from 'react';
import { subscribeStorageList } from 'lib/subscribeStorageList';

/**
 * React hook wrapper for {@link subscribeStorageList}.
 * @param {string} changedEvent
 * @param {() => void} onChange
 */
export function useStorageListSubscription(changedEvent, onChange) {
  useEffect(() => subscribeStorageList(changedEvent, onChange), [changedEvent, onChange]);
}
