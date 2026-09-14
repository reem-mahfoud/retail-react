import { useLayoutEffect } from 'react';

/**
 * Re-runs `reposition` when the user scrolls (capture) or resizes the window.
 * @param {boolean} enabled
 * @param {() => void} reposition
 */
export function useRepositionOnScroll(enabled, reposition) {
  useLayoutEffect(() => {
    if (!enabled) return undefined;

    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
    };
  }, [enabled, reposition]);
}
