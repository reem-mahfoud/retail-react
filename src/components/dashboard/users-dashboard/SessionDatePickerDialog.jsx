import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

function parseDisplayDate(str) {
  const t = Date.parse(String(str).trim());
  if (!Number.isNaN(t)) return new Date(t);
  return new Date();
}

export function formatSessionDisplayDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatMonthYear(d) {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d, delta) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(d) {
  const t = new Date();
  return isSameDay(d, t);
}

/** Monday = 0 … Sunday = 6 */
function mondayWeekday(d) {
  return (d.getDay() + 6) % 7;
}

function daysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate();
}

/** Demo markers like the reference (dots under dates). */
function markerForDay(day, inCurrentMonth) {
  if (!inCurrentMonth) return null;
  if (day === 1 || day === 30) return 'purple';
  if (day === 4) return 'gray';
  return null;
}

export default function SessionDatePickerDialog({ open, onClose, value, onApply }) {
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const [selected, setSelected] = useState(() => new Date());

  useEffect(() => {
    if (!open) return;
    const d = parseDisplayDate(value);
    setSelected(d);
    setViewMonth(startOfMonth(d));
  }, [open, value]);

  const grid = useMemo(() => {
    const y = viewMonth.getFullYear();
    const m = viewMonth.getMonth();
    const first = new Date(y, m, 1);
    const startPad = mondayWeekday(first);
    const dim = daysInMonth(y, m);
    const prevDim = daysInMonth(y, m - 1);
    const cells = [];
    for (let i = 0; i < startPad; i += 1) {
      const day = prevDim - startPad + i + 1;
      cells.push({ day, inMonth: false, date: new Date(y, m - 1, day) });
    }
    for (let day = 1; day <= dim; day += 1) {
      cells.push({ day, inMonth: true, date: new Date(y, m, day) });
    }
    let next = 1;
    while (cells.length % 7 !== 0 || cells.length < 42) {
      cells.push({ day: next, inMonth: false, date: new Date(y, m + 1, next) });
      next += 1;
    }
    return cells;
  }, [viewMonth]);

  const goPrev = useCallback(() => setViewMonth((v) => addMonths(v, -1)), []);
  const goNext = useCallback(() => setViewMonth((v) => addMonths(v, 1)), []);

  const pickToday = useCallback(() => {
    const t = new Date();
    setSelected(t);
    setViewMonth(startOfMonth(t));
  }, []);

  const handleApply = useCallback(() => {
    onApply?.(formatSessionDisplayDate(selected));
    onClose?.();
  }, [selected, onApply, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10060] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-picker-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative w-full max-w-[360px] overflow-hidden rounded-2xl border border-[#EAECF0] bg-white shadow-[0px_8px_32px_-4px_rgba(16,24,40,0.12)]">
        <div className="px-4 pb-2 pt-4 sm:px-5 sm:pt-5">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#344054] transition hover:bg-[#F2F4F7] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
            <h2 id="session-picker-title" className="text-center text-base font-semibold text-[#101828]">
              {formatMonthYear(viewMonth)}
            </h2>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#344054] transition hover:bg-[#F2F4F7] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="min-w-0 flex-1 rounded-full border border-[#D0D5DD] bg-white px-3 py-2 text-center text-sm font-semibold text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
              {formatSessionDisplayDate(selected)}
            </div>
            <button
              type="button"
              onClick={pickToday}
              className="shrink-0 rounded-full border border-[#D0D5DD] bg-white px-3 py-2 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
            >
              Today
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-y-1 text-center text-xs font-semibold text-[#667085]">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-y-1">
            {grid.map((cell) => {
              const isSel = isSameDay(selected, cell.date);
              const today = isToday(cell.date);
              const marker = markerForDay(cell.day, cell.inMonth);
              return (
                <div key={cell.date.getTime()} className="flex flex-col items-center py-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(cell.date);
                      if (cell.inMonth) setViewMonth(startOfMonth(cell.date));
                    }}
                    className={[
                      'relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition',
                      !cell.inMonth ? 'text-[#98A2B3]' : 'text-[#101828]',
                      isSel
                        ? 'bg-[#7F56D9] text-white shadow-sm'
                        : 'hover:bg-[#F2F4F7] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30',
                      !isSel && today && cell.inMonth ? 'ring-1 ring-[#7F56D9]/40' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {cell.day}
                  </button>
                  <span className="mt-0.5 flex h-1 items-center justify-center gap-0.5">
                    {marker === 'purple' ? (
                      <span className="h-1 w-1 rounded-full bg-[#7F56D9]" aria-hidden />
                    ) : null}
                    {marker === 'gray' ? (
                      <span className="h-1 w-1 rounded-full bg-[#D0D5DD]" aria-hidden />
                    ) : null}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 border-t border-[#EAECF0] px-4 py-4 sm:px-5">
          <button
            type="button"
            onClick={onClose}
            className="h-11 min-h-[44px] flex-1 rounded-full border border-[#D0D5DD] bg-white text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="h-11 min-h-[44px] flex-1 rounded-full border border-[#6941C6] bg-[#7F56D9] text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/45 focus-visible:ring-offset-2"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
