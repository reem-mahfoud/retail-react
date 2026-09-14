const defaultCards = [
  { id: 'corridors', name: 'Raspberry Pi 5 - Corridors' },
  { id: 'street', name: 'Raspberry Pi 5 - Street' },
  { id: 'basement', name: 'Raspberry Pi 5 - Basement' },
];

const deviceChips = ['1.6.6.62-1-Mpt', 'Organization', 'Branch', 'Building', 'Room'];

function DeviceDotIcon({ className = '' }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M9 10.875A1.875 1.875 0 1 0 9 7.125a1.875 1.875 0 0 0 0 3.75Z" stroke="currentColor" strokeWidth="1.35" />
      <path d="M13.875 9c0 4.125-4.875 7.125-4.875 7.125S4.125 13.125 4.125 9a4.875 4.875 0 1 1 9.75 0Z" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoreIcon({ className = '' }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="4.5" r="1" fill="currentColor" />
      <circle cx="9" cy="9" r="1" fill="currentColor" />
      <circle cx="9" cy="13.5" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Device cards under the temperature chart.
 * Rendered as HTML so spacing, shadows, and colors can follow the page rhythm.
 */
export default function AnalyticsDeviceCardsRow({
  className = '',
  cards = defaultCards,
  selectedIndex = null,
  onCardClick,
  onCardMenuClick,
  onCardFieldClick,
}) {
  const emitField = (cardIndex, card, payload) => {
    onCardFieldClick?.({ cardIndex, card, ...payload });
  };

  return (
    <div
      className={`w-full min-w-0 ${className}`.trim()}
      role="region"
      aria-label="Device cards"
      dir="ltr"
    >
      <div className="grid w-full gap-3 md:w-[72%] md:grid-cols-3">
        {cards.map((card, i) => (
          <div
            key={card.id}
            className={[
              'min-h-[116px] rounded-xl bg-[#FAFAFA] p-3 shadow-[0px_1px_2px_rgba(16,24,40,0.04),0px_8px_20px_rgba(16,24,40,0.035)] transition-shadow',
              selectedIndex === i
                ? 'shadow-[0px_12px_34px_rgba(127,86,217,0.14),0px_0px_0px_2px_rgba(127,86,217,0.24)]'
                : 'hover:shadow-[0px_1px_2px_rgba(16,24,40,0.04),0px_10px_24px_rgba(16,24,40,0.055)]',
            ].join(' ')}
          >
            <div className="flex items-start justify-between gap-3">
              <button
                type="button"
                className="min-w-0 rounded-md text-left text-[11px] font-semibold leading-4 text-[#181D27] outline-none transition-colors hover:text-[#6941C6] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
                onClick={() => {
                  onCardClick?.(i, card);
                  emitField(i, card, { field: 'title' });
                }}
              >
                <span className="block truncate">{card.name}</span>
              </button>
              <button
                type="button"
                aria-label={`${card.name} more options`}
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[#A4A7AE] outline-none transition-colors hover:bg-[#F4EBFF] hover:text-[#7F56D9] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
                onClick={() => {
                  onCardMenuClick?.(i, card);
                  emitField(i, card, { field: 'menu' });
                }}
              >
                <MoreIcon className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              className="mt-3 flex items-center gap-2 rounded-lg text-left outline-none transition-colors hover:text-[#6941C6] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
              onClick={() => emitField(i, card, { field: 'metrics' })}
            >
              <DeviceDotIcon className="h-4 w-4 shrink-0 text-[#717680]" />
              <span className="text-[11px] font-medium leading-4 text-[#414651]">
                {card.activeCount ?? 23}
              </span>
              <span className="text-[11px] font-medium leading-4 text-[#A4A7AE]">
                / {card.totalCount ?? 25}
              </span>
            </button>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {(card.chips ?? deviceChips).map((chip, chipIndex) => (
                <button
                  key={chip}
                  type="button"
                  className="rounded-full bg-white px-1.5 py-0.5 text-[9px] font-medium leading-3 text-[#535862] shadow-[0px_1px_2px_rgba(16,24,40,0.04),inset_0px_0px_0px_1px_rgba(213,215,218,0.72)] transition-colors hover:bg-[#F4EBFF] hover:text-[#6941C6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
                  onClick={() =>
                    emitField(i, card, {
                      field: 'pill',
                      pillRow: chipIndex < 4 ? 1 : 2,
                      pillIndex: chipIndex < 4 ? chipIndex : chipIndex - 4,
                    })
                  }
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
