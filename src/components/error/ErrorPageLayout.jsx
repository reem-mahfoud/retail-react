import { Link } from 'react-router-dom';
import CradleLogoLockup from 'components/login/CradleLogoLockup';
import { CRADLE_CANVAS_BG } from 'design/cradleDesignTokens';

export default function ErrorPageLayout({
  code,
  title,
  description,
  primaryAction,
  secondaryAction,
}) {
  return (
    <div
      className={`flex min-h-[100dvh] flex-col items-center justify-center px-4 py-12 font-sans ${CRADLE_CANVAS_BG}`}
    >
      <div className="flex w-full max-w-md flex-col items-center text-center">
      <CradleLogoLockup className="mb-10 h-8 w-auto self-end" />
        {code ? (
          <p className="text-sm font-semibold uppercase tracking-widest text-[#7F56D9]">{code}</p>
        ) : null}
        <h1 className="mt-3 text-2xl font-semibold text-[#101828]">{title}</h1>
        <p className="mt-3 text-base leading-6 text-[#667085]">{description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {primaryAction ? (
            <Link
              to={primaryAction.to}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#7F56D9] px-6 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7F56D9]"
            >
              {primaryAction.label}
            </Link>
          ) : null}
          {secondaryAction ? (
            <button
              type="button"
              onClick={secondaryAction.onClick}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#D0D5DD] bg-white px-6 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7F56D9]"
            >
              {secondaryAction.label}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
