import { useBodyScrollLock } from 'hooks/useBodyScrollLock';
import { useEscapeKey } from 'hooks/useEscapeKey';

/** Body scroll lock + Escape to close — shared drawer behaviour. */
export function useDrawerEffects(open, onClose) {
  useBodyScrollLock(open);
  useEscapeKey(open, onClose);
}
