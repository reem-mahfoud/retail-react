import { useCallback, useMemo } from 'react';
import { useTranslations } from 'i18n/I18nProvider';

const MAIN_FOCUS_ID = 'main-content';


export default function SkipToMainLink() {
  const tc = useTranslations('common');
  const skipLabel = useMemo(() => tc('skipToMain'), [tc]);

  const handleClick = useCallback(
    (/** @type {import('react').MouseEvent<HTMLAnchorElement>} */ e) => {
      e.preventDefault();
      const el = document.getElementById(MAIN_FOCUS_ID);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el?.focus({ preventScroll: true });
    },
    [],
  );

  return (
    <a
      href={`#${MAIN_FOCUS_ID}`}
      onClick={handleClick}
      className="pointer-events-none fixed left-4 top-4 z-[2147483647] -translate-y-[160%] rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#101828] shadow-md outline outline-2 outline-offset-2 outline-[#7F56D9] transition-transform focus-visible:pointer-events-auto focus-visible:translate-y-0"
    >
      {skipLabel}
    </a>
  );
}

export { MAIN_FOCUS_ID };
