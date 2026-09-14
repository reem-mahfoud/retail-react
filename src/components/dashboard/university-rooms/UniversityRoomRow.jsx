import { Pencil, Trash2 } from 'lucide-react';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import WebcamOutlineIcon from 'components/icons/WebcamOutlineIcon';
import { RowToggle } from 'components/dashboard/analytics-location-row/LocationRowUi';

export default function UniversityRoomRow({ row, selected, onSelect, onEdit, onDelete, onToggleActive }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(row.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(row.id);
      }}
      className={[
        'group flex h-[72px] min-h-[72px] items-center gap-4 rounded-xl border px-6 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-none transition-colors',
        selected
          ? 'border-[#D6BBFB] bg-[#F4EBFF]'
          : 'border-[#E9EAEB] bg-white hover:border-[#D6BBFB] hover:bg-[#F4EBFF]',
      ].join(' ')}
    >
      <span
        className={[
          'shrink-0 transition-colors',
          selected ? 'text-[#7F56D9]' : 'text-[#717680] group-hover:text-[#7F56D9]',
        ].join(' ')}
      >
        <HomeOutlineIcon className="h-5 w-5" stroke="currentColor" aria-hidden />
      </span>

      <span
        className={[
          'min-w-0 flex-1 truncate text-base font-semibold leading-6 transition-colors',
          selected ? 'text-[#6941C6]' : 'text-[#181D27] group-hover:text-[#6941C6]',
        ].join(' ')}
      >
        {row.name}
      </span>

      <div className="flex shrink-0 items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm font-semibold tabular-nums text-[#414651] transition-colors group-hover:text-[#6941C6]">
          <WebcamOutlineIcon className="h-4 w-4 shrink-0 text-[#717680]" stroke="currentColor" aria-hidden />
          <span>
            {row.quotaUsed} / {row.quotaTotal}
          </span>
        </div>

        <div className="hidden h-5 w-px bg-[#EAECF0] sm:block" aria-hidden />

        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#A4A7AE] transition-colors hover:bg-black/[0.06] group-hover:text-[#B692F6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
          aria-label={`Edit room ${row.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(row.id);
          }}
        >
          <Pencil className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#A4A7AE] transition-colors hover:bg-black/[0.06] group-hover:text-[#B692F6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
          aria-label={`Delete room ${row.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(row.id);
          }}
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <div className="hidden h-5 w-px bg-[#EAECF0] sm:block" aria-hidden />

        <RowToggle
          checked={row.active}
          onChange={(next) => onToggleActive(row.id, next)}
          ariaLabel={`${row.name} active`}
        />
      </div>
    </div>
  );
}
