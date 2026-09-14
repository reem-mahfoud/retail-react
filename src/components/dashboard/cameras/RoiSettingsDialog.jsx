import { useCallback, useEffect, useMemo, useState } from 'react';
import { Trash2, X } from 'lucide-react';

/** Normalized polygon points (viewBox 0 0 100 100) — scales with the feed image. */
const ROI_THEMES = {
  purple: {
    points: '44,32 96,28 98,86 42,90',
    stroke: '#7F56D9',
    fill: 'rgba(127, 86, 217, 0.28)',
    cardBorder: 'border-[#D6BBFB] bg-[#FCFAFF]',
  },
  green: {
    points: '6,42 38,38 44,92 8,95',
    stroke: '#16B364',
    fill: 'rgba(22, 179, 100, 0.28)',
    cardBorder: 'border-[#ABEFC6] bg-[#F6FEF9]',
  },
};

const DEFAULT_REGIONS = [
  { id: 'roi-seats', name: 'Seats', theme: 'purple' },
  { id: 'roi-login', name: 'Login/Board', theme: 'green' },
];

const FEED_IMAGE = '/images/cameras/roi-camera-feed.png';

export default function RoiSettingsDialog({ open, cameraLabel, onCancel, onSave }) {
  const [regions, setRegions] = useState(DEFAULT_REGIONS);

  useEffect(() => {
    if (!open) return;
    setRegions(DEFAULT_REGIONS.map((r) => ({ ...r })));
  }, [open]);

  const activeThemes = useMemo(() => new Set(regions.map((r) => r.theme)), [regions]);

  const updateName = useCallback((id, name) => {
    setRegions((prev) => prev.map((r) => (r.id === id ? { ...r, name } : r)));
  }, []);

  const removeRegion = useCallback((id) => {
    setRegions((prev) => prev.filter((r) => r.id !== id));
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10050] flex items-center justify-center bg-black/40 p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="roi-settings-title"
      aria-describedby="roi-settings-desc"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel?.();
      }}
    >
      <div
        className="flex max-h-[min(92vh,880px)] w-full max-w-[1100px] flex-col overflow-hidden rounded-[24px] bg-white shadow-[0px_4px_6px_-2px_rgba(16,24,40,0.03),0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_24px_48px_-12px_rgba(16,24,40,0.12)]"
        aria-label={cameraLabel ? `ROI settings — ${cameraLabel}` : undefined}
      >
        <div className="shrink-0 border-b border-[#EAECF0] px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="roi-settings-title" className="text-lg font-semibold tracking-tight text-[#101828] sm:text-xl">
                ROI Settings
              </h2>
              <p id="roi-settings-desc" className="mt-1.5 text-sm text-[#667085]">
                Please enter a name for this project.
              </p>
            </div>
            <button
              type="button"
              onClick={onCancel}
              className="shrink-0 rounded-lg p-1.5 text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#344054] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-6 lg:flex-row lg:gap-6">
          <div className="relative min-h-[220px] flex-1 overflow-hidden rounded-xl bg-[#101828] lg:min-h-[320px]">
            <img
              src={FEED_IMAGE}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="pointer-events-none absolute left-0 top-0 p-2 text-[10px] font-medium leading-tight text-white/90 drop-shadow sm:text-xs">
              <div>2021-07-01 18:09:46</div>
              <div className="opacity-90">207</div>
            </div>
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              {Object.entries(ROI_THEMES).map(([themeKey, t]) =>
                activeThemes.has(themeKey) ? (
                  <polygon
                    key={themeKey}
                    points={t.points}
                    fill={t.fill}
                    stroke={t.stroke}
                    strokeWidth={1.2}
                    strokeDasharray="3 2"
                    vectorEffect="non-scaling-stroke"
                  />
                ) : null,
              )}
            </svg>
          </div>

          <aside className="flex w-full shrink-0 flex-col rounded-xl border border-[#EAECF0] bg-[#F9FAFB] p-4 sm:p-5 lg:w-[300px]">
            <div className="mb-1 text-base font-semibold text-[#101828]">ROI</div>
            <p className="mb-4 text-xs text-[#667085]">List of Selected ROIs</p>
            <div className="flex flex-col gap-3">
              {regions.map((r) => {
                const theme = ROI_THEMES[r.theme];
                return (
                  <div
                    key={r.id}
                    className={`rounded-xl border px-3 py-2.5 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] ${theme.cardBorder}`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={r.name}
                        onChange={(e) => updateName(r.id, e.target.value)}
                        className="min-w-0 flex-1 rounded-full border border-[#D0D5DD] bg-white px-3 py-2 text-sm font-medium text-[#101828] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
                        aria-label={`ROI name ${r.name}`}
                      />
                      <span className="relative inline-flex shrink-0">
                        <button
                          type="button"
                          onClick={() => removeRegion(r.id)}
                          className="peer inline-flex rounded-lg p-2 text-[#667085] transition hover:bg-black/[0.06] hover:text-[#D92D20] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
                          aria-label={`Delete ${r.name}`}
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                        </button>
                        <span className="pointer-events-none absolute bottom-full right-0 z-20 mb-1 hidden w-max rounded-md bg-[#101828] px-2 py-1 text-[11px] font-medium text-white shadow-lg peer-hover:block peer-focus-visible:block">
                          Delete
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
              {regions.length === 0 ? (
                <p className="rounded-lg border border-dashed border-[#D0D5DD] bg-white py-6 text-center text-sm text-[#667085]">
                  No regions. Use the feed to define ROIs (demo).
                </p>
              ) : null}
            </div>
          </aside>
        </div>

        <div className="flex shrink-0 justify-end gap-3 border-t border-[#EAECF0] px-5 py-4 sm:px-8 sm:py-5">
          <button
            type="button"
            onClick={onCancel}
            className="h-12 min-h-[48px] min-w-[120px] rounded-full border border-[#D0D5DD] bg-white px-6 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="h-12 min-h-[48px] min-w-[120px] rounded-full border border-[#6941C6] bg-[#7F56D9] px-6 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/45 focus-visible:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
