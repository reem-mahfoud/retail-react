import { useEffect } from 'react';

/** Lock document body scroll while `locked` is true (e.g. drawers, modals). */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
