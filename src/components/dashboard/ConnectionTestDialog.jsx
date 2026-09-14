/**
 * Connection test result dialog (Success / Failed) — matches reference cards.
 */
export default function ConnectionTestDialog({
  open,
  variant = 'success', // 'success' | 'error'
  onClose,
  onPrimary,
  onSecondary,
}) {
  if (!open) return null;

  const isSuccess = variant === 'success';
  const title = isSuccess ? 'Successful Connection' : 'Connection Failed';
  const description = isSuccess
    ? 'The device successfully completed the connection session and is ready for use.'
    : 'The device could not connect to the server. Please check the accuracy of the device and server settings entered.';

  const primaryLabel = isSuccess ? 'Okay' : 'Retry Test';

  return (
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="connection-test-title"
      aria-describedby="connection-test-desc"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative w-full max-w-[440px] overflow-hidden rounded-3xl bg-white shadow-[0_3px_3px_rgba(10,13,18,0.04),0_8px_8px_rgba(10,13,18,0.03),0_20px_24px_rgba(10,13,18,0.08)]">
        {/* concentric rings (top-left) with fade mask */}
        <svg
          className="pointer-events-none absolute -left-[100px] -top-[120px]"
          width="336"
          height="336"
          viewBox="0 0 336 336"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <radialGradient id="ringsFade" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(168 168) rotate(90) scale(168 168)">
              <stop stopColor="#000000" stopOpacity="1" />
              <stop offset="1" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <mask id="ringsMask">
              <rect width="336" height="336" fill="url(#ringsFade)" />
            </mask>
          </defs>

          <g mask="url(#ringsMask)">
            <circle cx="168" cy="168" r="47.5" stroke="#E9EAEB" />
            <circle cx="168" cy="168" r="47.5" stroke="#E9EAEB" />
            <circle cx="168" cy="168" r="71.5" stroke="#E9EAEB" />
            <circle cx="168" cy="168" r="95.5" stroke="#E9EAEB" />
            <circle cx="168" cy="168" r="119.5" stroke="#E9EAEB" />
            <circle cx="168" cy="168" r="143.5" stroke="#E9EAEB" />
            <circle cx="168" cy="168" r="167.5" stroke="#E9EAEB" />
          </g>
        </svg>

        <button
          type="button"
          onClick={() => onClose?.()}
          className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#A4A7AE] transition hover:bg-[#F2F4F7] hover:text-[#667085] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="px-6 pb-6 pt-8">
          <div className="flex items-start gap-5">
            <div
              className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{
                background: isSuccess ? '#D1FADF' : '#FEE4E2',
              }}
              aria-hidden
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full">
                {isSuccess ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="#027A48"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 9v4m0 4h.01M10.29 3.86l-8.2 14.2A2 2 0 0 0 3.82 21h16.36a2 2 0 0 0 1.73-2.94l-8.2-14.2a2 2 0 0 0-3.42 0Z"
                      stroke="#D92D20"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1 pt-0.5">
              <h2
                id="connection-test-title"
                className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-[#101828]"
              >
                {title}
              </h2>
              <p id="connection-test-desc" className="mt-2 max-w-[46ch] text-[18px] leading-7 text-[#535862]">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onSecondary?.()}
              className="inline-flex h-11 w-[170px] items-center justify-center rounded-full border border-[#D5D7DA] bg-white px-8 text-[18px] font-semibold text-[#414651] shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#98A2B3]/25"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => onPrimary?.()}
              className="inline-flex h-11 w-[170px] items-center justify-center rounded-full bg-[#7F56D9] px-8 text-[18px] font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
            >
              {primaryLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

