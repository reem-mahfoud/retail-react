import { ChevronLeft, ChevronRight } from 'lucide-react';

/** @param {import('types/list').ListPaginationBarProps} props */
export default function ListPaginationBar({
  page,
  totalPages,
  paginationItems,
  onPageChange,
  className = '',
}) {
  if (totalPages <= 1) return null;

  return (
    <div
      className={`flex flex-col items-stretch justify-between gap-4 border-t border-[#EAECF0] px-5 py-4 sm:flex-row sm:items-center sm:px-8 ${className}`.trim()}
    >
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#D5D7DA] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-sm transition hover:bg-[#F9FAFB] disabled:pointer-events-none disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
        Previous
      </button>
      <div className="flex flex-wrap items-center justify-center gap-1">
        {paginationItems.map((item, i) =>
          typeof item === 'number' ? (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`flex h-10 min-w-[2.5rem] items-center justify-center rounded-full text-sm font-semibold transition ${
                page === item
                  ? 'bg-[#F2F4F7] text-[#101828]'
                  : 'text-[#101828] hover:bg-[#F9FAFB]'
              }`}
            >
              {item}
            </button>
          ) : (
            <span key={`ellipsis-${i}`} className="px-1.5 text-sm font-semibold text-[#101828]">
              ...
            </span>
          ),
        )}
      </div>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#D5D7DA] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-sm transition hover:bg-[#F9FAFB] disabled:pointer-events-none disabled:opacity-40"
        disabled={page >= totalPages}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
      >
        Next
        <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}
