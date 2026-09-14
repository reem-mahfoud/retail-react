import { useMemo } from 'react';
import { useEscapeKey } from 'hooks/useEscapeKey';
import { useOutsidePointerDown } from 'hooks/useOutsidePointerDown';

/**
 * Dismiss on Escape or click outside `containerRef`.
 * @param {{ open: boolean, onDismiss: () => void, containerRef: import('react').RefObject<HTMLElement | null>, escapeTarget?: 'window' | 'document' }} params
 */
export function useDismissableOverlay({
  open,
  onDismiss,
  containerRef,
  escapeTarget = 'document',
}) {
  useEscapeKey(open, onDismiss, { target: escapeTarget });

  const outsideRefs = useMemo(() => [containerRef], [containerRef]);
  useOutsidePointerDown(open, outsideRefs, onDismiss);
}
