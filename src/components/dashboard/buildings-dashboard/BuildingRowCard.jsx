import { Link } from 'react-router-dom';
import {
  RowToggle,
  dashboardListRowHoverClass,
  dashboardListRowIconButtonClass,
} from 'components/dashboard/analytics-location-row/LocationRowUi';
import {
  BuildingsRowLeadIcon,
  BuildingsRowHouseStatIcon,
  BuildingsRowWebcamStatIcon,
  BuildingsRowPencilIcon,
  BuildingsRowTrashIcon,
  BuildingsRowVSeparator,
} from './BuildingsRowDesignIcons';

function BuildingRowLead({ row }) {
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
      <BuildingsRowLeadIcon />
    </span>
  );
}

export default function BuildingRowCard({ row, onEdit, onDelete, onToggleActive }) {
  return (
    <div
      className={`flex min-h-[72px] items-center gap-0 rounded-xl border border-[#E9EAEB] bg-white px-4 py-2 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] sm:px-5 ${dashboardListRowHoverClass}`}
    >
      <BuildingRowLead row={row} />
      <BuildingsRowVSeparator className="mx-2 sm:mx-3" />
      <Link
        to="/dashboard/organizations/branches/buildings/rooms"
        className="min-w-0 flex-1 truncate pr-2 text-left text-sm font-medium leading-5 text-[#414651] transition-colors group-hover:text-[#6941C6] hover:underline sm:pr-4"
      >
        {row.name}
      </Link>
      <BuildingsRowVSeparator className="mx-1 sm:mx-2" />
      <div className="flex shrink-0 items-center gap-1.5 px-1 text-xs font-medium text-[#667085] transition-colors group-hover:text-[#6941C6] sm:px-2">
        <BuildingsRowHouseStatIcon stroke="currentColor" />
        <span className="tabular-nums">{row.entityCount}</span>
      </div>
      <BuildingsRowVSeparator className="mx-1 sm:mx-2" />
      <div className="flex shrink-0 items-center gap-1.5 px-1 text-xs font-medium text-[#667085] transition-colors group-hover:text-[#6941C6] sm:px-2">
        <BuildingsRowWebcamStatIcon stroke="currentColor" />
        <span className="tabular-nums">
          {row.quotaUsed} / {row.quotaTotal}
        </span>
      </div>
      <BuildingsRowVSeparator className="mx-1 sm:mx-2" />
      <div className="flex shrink-0 items-center gap-0.5 pl-1 sm:pl-2">
        <button
          type="button"
          className={dashboardListRowIconButtonClass}
          aria-label={`Edit ${row.name}`}
          onClick={() => onEdit(row.id)}
        >
          <BuildingsRowPencilIcon stroke="currentColor" />
        </button>
        <button
          type="button"
          className={dashboardListRowIconButtonClass}
          aria-label={`Delete ${row.name}`}
          onClick={() => onDelete(row.id)}
        >
          <BuildingsRowTrashIcon stroke="currentColor" />
        </button>
      </div>
      <RowToggle
        checked={row.active}
        onChange={(v) => onToggleActive(row.id, v)}
        ariaLabel={`${row.name} active`}
      />
    </div>
  );
}
