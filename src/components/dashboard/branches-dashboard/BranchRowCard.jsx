import { Building2, Pencil, Trash2 } from 'lucide-react';
import WebcamOutlineIcon from 'components/icons/WebcamOutlineIcon';
import {
  RowToggle,
  dashboardListRowHoverClass,
  dashboardListRowIconButtonClass,
} from 'components/dashboard/analytics-location-row/LocationRowUi';

/** Same 20×20 building stroke as organizations row (design SVG). */
function BranchLeadIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      className={`shrink-0 ${className}`.trim()}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6.25008 9.16667H3.83341C3.3667 9.16667 3.13335 9.16667 2.95509 9.25749C2.79829 9.33739 2.6708 9.46487 2.59091 9.62167C2.50008 9.79993 2.50008 10.0333 2.50008 10.5V17.5M13.7501 9.16667H16.1667C16.6335 9.16667 16.8668 9.16667 17.0451 9.25749C17.2019 9.33739 17.3294 9.46487 17.4093 9.62167C17.5001 9.79993 17.5001 10.0333 17.5001 10.5V17.5M13.7501 17.5V5.16667C13.7501 4.23325 13.7501 3.76654 13.5684 3.41002C13.4086 3.09641 13.1537 2.84144 12.8401 2.68166C12.4835 2.5 12.0168 2.5 11.0834 2.5H8.91675C7.98333 2.5 7.51662 2.5 7.1601 2.68166C6.84649 2.84144 6.59153 3.09641 6.43174 3.41002C6.25008 3.76654 6.25008 4.23325 6.25008 5.16667V17.5M18.3334 17.5H1.66675M9.16675 5.83333H10.8334M9.16675 9.16667H10.8334M9.16675 12.5H10.8334"
        stroke="currentColor"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BranchRowLead({ row }) {
  if (row.logoUrl) {
    return (
      <img
        src={row.logoUrl}
        alt=""
        width={20}
        height={20}
        className="h-5 w-5 shrink-0 rounded object-cover"
        draggable={false}
      />
    );
  }
  return (
    <span className="shrink-0 text-[#717680] transition-colors group-hover:text-[#7F56D9]">
      <BranchLeadIcon />
    </span>
  );
}

export default function BranchRowCard({ row, onEdit, onDelete, onToggleActive }) {
  return (
    <div
      className={`flex min-h-[48px] items-center gap-3 rounded-[10px] border border-[#E9EAEB] bg-white px-3.5 py-2 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] sm:gap-3.5 sm:px-4 ${dashboardListRowHoverClass}`}
    >
      <BranchRowLead row={row} />
      <span className="min-w-0 flex-1 truncate text-sm font-medium leading-5 text-[#414651] transition-colors group-hover:text-[#6941C6]">
        {row.addressLabel}
      </span>
      <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#667085] transition-colors group-hover:text-[#6941C6]">
        <Building2 className="h-4 w-4 shrink-0 text-[#98A2B3] transition-colors group-hover:text-[#7F56D9]" strokeWidth={1.75} aria-hidden />
        <span className="tabular-nums">{row.entityCount}</span>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#667085] transition-colors group-hover:text-[#6941C6]">
        <WebcamOutlineIcon className="h-4 w-4 shrink-0 text-[#414651] transition-colors group-hover:text-[#7F56D9]" stroke="currentColor" aria-hidden />
        <span className="tabular-nums">
          {row.quotaUsed} / {row.quotaTotal}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          className={dashboardListRowIconButtonClass}
          aria-label={`Edit ${row.addressLabel}`}
          onClick={() => onEdit(row.id)}
        >
          <Pencil className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          className={dashboardListRowIconButtonClass}
          aria-label={`Delete ${row.addressLabel}`}
          onClick={() => onDelete(row.id)}
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
      <RowToggle
        checked={row.active}
        onChange={(v) => onToggleActive(row.id, v)}
        ariaLabel={`${row.addressLabel} active`}
      />
    </div>
  );
}
