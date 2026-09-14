/**
 * Active period editor dialog — matches design reference.
 * Uses text inputs (HH:MM) to avoid AM/PM locale UI.
 */
export default function ActivePeriodDialog({
  open,
  fromValue,
  toValue,
  onChangeFrom,
  onChangeTo,
  onClose,
  onSave,
}) {
  if (!open) return null;

  const sanitize = (next) =>
    String(next || '')
      .replace(/[^\d:]/g, '')
      .slice(0, 5);

  const normalize = (value, fallback) => {
    const v = String(value || '').trim();
    const m = v.match(/^(\d{1,2}):(\d{1,2})$/);
    if (!m) return fallback;
    let hh = Number(m[1]);
    let mm = Number(m[2]);
    if (Number.isNaN(hh)) hh = 0;
    if (Number.isNaN(mm)) mm = 0;
    hh = Math.min(23, Math.max(0, hh));
    mm = Math.min(59, Math.max(0, mm));
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
  };

  return (
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="active-period-title"
      aria-describedby="active-period-desc"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative w-full max-w-[880px] overflow-hidden rounded-[44px] border border-[#E9EAEB] bg-white shadow-[0_3px_3px_rgba(10,13,18,0.04),0_8px_8px_rgba(10,13,18,0.03),0_20px_24px_rgba(10,13,18,0.08)]">
        <button
          type="button"
          onClick={() => onClose?.()}
          className="absolute right-8 top-8 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#A4A7AE] transition hover:bg-[#F2F4F7] hover:text-[#667085] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
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

        <div className="px-10 pb-8 pt-10">
          <h2 id="active-period-title" className="text-3xl font-semibold tracking-tight text-[#101828]">
            Active Period
          </h2>
          <p id="active-period-desc" className="mt-2 text-lg text-[#535862]">
            Specify the active state period of the device throughout the day
          </p>
        </div>

        <div className="h-px w-full bg-[#EAECF0]" aria-hidden />

        <div className="px-10 py-10">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
            <div className="rounded-2xl border border-[#D0D5DD] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="08:00"
                value={fromValue}
                onChange={(e) => onChangeFrom?.(sanitize(e.target.value))}
                onBlur={() => onChangeFrom?.(normalize(fromValue, '08:00'))}
                className="w-full bg-transparent text-center text-[96px] font-semibold leading-none tracking-tight text-[#101828] outline-none tabular-nums"
                aria-label="Active period start (HH:MM)"
              />
            </div>

            <div className="select-none text-center text-6xl font-semibold text-[#D0D5DD]" aria-hidden>
              –
            </div>

            <div className="rounded-2xl border border-[#D0D5DD] bg-white px-6 py-8 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="20:00"
                value={toValue}
                onChange={(e) => onChangeTo?.(sanitize(e.target.value))}
                onBlur={() => onChangeTo?.(normalize(toValue, '20:00'))}
                className="w-full bg-transparent text-center text-[96px] font-semibold leading-none tracking-tight text-[#101828] outline-none tabular-nums"
                aria-label="Active period end (HH:MM)"
              />
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-[#EAECF0]" aria-hidden />

        <div className="flex flex-wrap items-center justify-end gap-6 px-10 py-8">
          <button
            type="button"
            onClick={() => onClose?.()}
            className="inline-flex h-14 w-[280px] items-center justify-center rounded-full border border-[#D5D7DA] bg-white px-10 text-lg font-semibold text-[#414651] shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#98A2B3]/25"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onChangeFrom?.(normalize(fromValue, '08:00'));
              onChangeTo?.(normalize(toValue, '20:00'));
              onSave?.();
            }}
            className="inline-flex h-14 w-[320px] items-center justify-center rounded-full bg-[#7F56D9] px-12 text-lg font-semibold text-white shadow-[0_10px_18px_rgba(127,86,217,0.18)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

