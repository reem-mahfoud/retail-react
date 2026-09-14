import { useEffect } from 'react';
import { runSafelyVoid } from 'lib/runSafely';

/**
 * Calls `onEscape` when Escape is pressed while `enabled`.
 * @param {boolean} enabled
 * @param {() => void} onEscape
 * @param {{ target?: 'window' | 'document' }} [options]
 */
export function useEscapeKey(enabled, onEscape, options = {}) {
  const { target = 'window' } = options;

  useEffect(() => {
    if (!enabled) return undefined;

    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      runSafelyVoid(onEscape);
    };

    const root = target === 'document' ? document : window;
    root.addEventListener('keydown', onKey);
    return () => root.removeEventListener('keydown', onKey);
  }, [enabled, onEscape, target]);
}
