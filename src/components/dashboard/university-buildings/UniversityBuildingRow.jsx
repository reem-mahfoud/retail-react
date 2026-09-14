import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import UniversityCountIcon from 'components/icons/UniversityCountIcon';
import WebcamOutlineIcon from 'components/icons/WebcamOutlineIcon';
import { RowToggle } from 'components/dashboard/analytics-location-row/LocationRowUi';

export default function UniversityBuildingRow({ row, orgId, onEdit, onDelete, onToggleActive }) {
  const navigate = useNavigate();
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/dashboard/organizations/${orgId}/buildings/${row.id}/rooms`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') navigate(`/dashboard/organizations/${orgId}/buildings/${row.id}/rooms`);
      }}
      className="flex h-[72px] min-h-[72px] cursor-pointer items-center gap-4 rounded-xl border border-[#E9EAEB] bg-white px-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition-colors hover:bg-[#FAFAFA] outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
    >
      <span className="shrink-0 text-[#717680]">
        <UniversityCountIcon className="h-5 w-5" stroke="#717680" aria-hidden />
      </span>
      <span className="min-w-0 flex-1 truncate text-base font-semibold leading-6 text-[#181D27]">
        {row.name}
      </span>

      <div className="mx-0 hidden h-8 w-px shrink-0 bg-[#E9EAEB] sm:block" aria-hidden />
      <div className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#414651] sm:flex">
        <HomeOutlineIcon className="h-5 w-5 text-[#717680]" stroke="currentColor" aria-hidden />
        <span className="tabular-nums">{row.entityCount}</span>
      </div>

      <div className="mx-0 hidden h-8 w-px shrink-0 bg-[#E9EAEB] sm:block" aria-hidden />
      <div className="hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#414651] sm:flex">
        <WebcamOutlineIcon className="h-5 w-5 text-[#717680]" stroke="currentColor" aria-hidden />
        <span className="tabular-nums">
          {row.quotaUsed} / {row.quotaTotal}
        </span>
      </div>

      <div className="mx-0 hidden h-8 w-px shrink-0 bg-[#E9EAEB] sm:block" aria-hidden />
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#717680] transition hover:bg-[#FAFAFA] hover:text-[#414651]"
        aria-label={`Edit ${row.name}`}
        onClick={(e) => {
          e.stopPropagation();
          onEdit(row.id);
        }}
      >
        <Pencil className="h-4 w-4" strokeWidth={1.75} />
      </button>
      <button
        type="button"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#717680] transition hover:bg-[#FAFAFA] hover:text-[#414651]"
        aria-label={`Delete ${row.name}`}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(row.id);
        }}
      >
        <Trash2 className="h-4 w-4" strokeWidth={1.75} />
      </button>

      <div className="mx-0 hidden h-8 w-px shrink-0 bg-[#E9EAEB] sm:block" aria-hidden />
      <RowToggle
        checked={row.active}
        onChange={(v) => onToggleActive(row.id, v)}
        ariaLabel={`${row.name} active`}
      />
    </div>
  );
}
