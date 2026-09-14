import { iconSlotClass } from './constants';

const toggleBase =
  'relative h-5 w-9 shrink-0 rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#7F56D9]/40';
const thumbBase =
  'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-[0_1px_2px_rgba(16,24,40,0.12)] transition-all';

export function RowDivider() {
  return (
    <div className="h-5 w-px shrink-0 bg-[#717680]/[0.12]" aria-hidden />
  );
}

export function LocationField({ icon: Icon, text, colorClass, className = '' }) {
  return (
    <div className={`flex h-8 min-w-0 items-center gap-1.5 overflow-hidden ${className}`.trim()}>
      <span className={`${iconSlotClass} shrink-0`}>
        <Icon />
      </span>
      <span
        className={`min-w-0 truncate text-xs font-normal leading-5 ${colorClass}`}
        title={text}
      >
        {text}
      </span>
    </div>
  );
}

/** Location row toggle (ROI and main status — same chrome). */
export function RowToggle({ checked, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`${toggleBase} ${checked ? 'bg-[#7F56D9]' : 'bg-[#F5F5F5]'}`}
    >
      <span className={`${thumbBase} ${checked ? 'left-[18px]' : 'left-0.5'}`} />
    </button>
  );
}

export const iconButtonClass =
  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30';

/** Row shell hover — matches Rooms list (lavender border + fill on hover). */
export const dashboardListRowHoverClass =
  'group transition-colors hover:border-[#D6BBFB] hover:bg-[#F4EBFF]';

/** Edit/delete on dashboard entity rows: matches Rooms row action buttons (no `iconButtonClass` merge — avoids duplicate hover:bg). */
export const dashboardListRowIconButtonClass =
  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#667085] transition-colors hover:bg-black/[0.06] group-hover:text-[#B692F6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30';

export const roiPillClass =
  'flex h-8 shrink-0 items-center gap-2 rounded-full bg-white px-2.5 shadow-[0px_1px_2px_rgba(16,24,40,0.06),inset_0px_0px_0px_1px_rgba(213,215,218,0.78)]';
