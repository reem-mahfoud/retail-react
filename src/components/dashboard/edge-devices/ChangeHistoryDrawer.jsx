import { useId } from 'react';
import { createPortal } from 'react-dom';
import { History, User, X } from 'lucide-react';
import { useDrawerEffects } from 'hooks/useDrawerEffects';

/**
 * Slide-over panel: device change history timeline (matches design reference).
 * @param {{ open: boolean; onClose: () => void; description: string; groups: Array<{ dateLabel: string; userName: string; events: Array<{ text: string; time: string }> }> }} props
 */
export default function ChangeHistoryDrawer({ open, onClose, description, groups }) {
  const titleId = useId();

  useDrawerEffects(open, onClose);

  if (!open) return null;

  const node = (
    <div className="fixed inset-0 z-[10055] flex justify-end" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-[#0C111D]/40 transition-opacity"
        aria-label="Close change history"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex h-full w-full max-w-md flex-col overflow-hidden rounded-l-2xl bg-white shadow-[-12px_0_48px_rgba(15,23,42,0.12)]"
      >
        <header className="shrink-0 border-b border-[#EAECF0] px-5 pb-5 pt-6 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F2F4F7]"
                aria-hidden
              >
                <History className="h-6 w-6 text-[#667085]" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h2 id={titleId} className="text-lg font-semibold leading-7 text-[#101828]">
                  Change History
                </h2>
                <p className="mt-1 text-sm leading-5 text-[#667085]">{description}</p>
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg p-2 text-[#667085] transition hover:bg-[#F9FAFB] hover:text-[#101828]"
              aria-label="Close"
              onClick={onClose}
            >
              <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          <div className="relative">
            <div
              className="absolute bottom-2 left-5 top-5 w-px bg-[#EAECF0]"
              aria-hidden
            />
            <ul className="relative space-y-10">
              {groups.map((group, gi) => (
                <li key={`${group.dateLabel}-${gi}`} className="relative">
                  <div className="flex gap-3">
                    <div className="relative z-[1] shrink-0 pt-0.5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F2F4F7] ring-4 ring-white">
                        <User className="h-5 w-5 text-[#98A2B3]" strokeWidth={1.5} aria-hidden />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-start justify-between gap-2 gap-y-1">
                        <span className="text-sm font-medium leading-5 text-[#667085]">{group.userName}</span>
                        <span className="shrink-0 rounded-full border border-[#EAECF0] bg-white px-2.5 py-0.5 text-xs font-medium tabular-nums leading-4 text-[#667085]">
                          {group.dateLabel}
                        </span>
                      </div>
                      <ul className="mt-3 space-y-2">
                        {group.events.map((ev, idx) => (
                          <li
                            key={`${group.dateLabel}-${idx}-${ev.text}`}
                            className="rounded-xl bg-[#F9FAFB] px-4 py-3"
                          >
                            <p className="text-sm leading-5 text-[#101828]">{ev.text}</p>
                            <p className="mt-1 text-sm font-medium tabular-nums leading-5 text-[#7F56D9]">
                              {ev.time}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
