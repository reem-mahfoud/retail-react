import { useEffect } from 'react';

/**
 * Calls `onOutside` when the user clicks outside every ref in `refs`.
 * @param {boolean} enabled
 * @param {import('react').RefObject<HTMLElement | null>[]} refs
 * @param {() => void} onOutside
 */
export function useOutsidePointerDown(enabled, refs, onOutside) {
  useEffect(() => {
    if (!enabled) return undefined;

    const onPointerDown = (e) => {
      const target = /** @type {Node | null} */ (e.target);
      const inside = refs.some((ref) => ref.current?.contains(target));
      if (!inside) onOutside();
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [enabled, onOutside, refs]);
}
