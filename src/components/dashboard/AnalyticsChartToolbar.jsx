import { useMemo, useState } from 'react';
import WebcamOutlineIcon from 'components/icons/WebcamOutlineIcon';

function FilterIcon({ className = 'h-4 w-4', color = '#344054' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThermometerIcon({ className = 'h-4 w-4', color = '#667085' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M10 14.25V5.75a2 2 0 1 1 4 0v8.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14.25a4 4 0 1 1-4 0"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.5V8.75"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CameraIcon({ className = 'h-5 w-5 shrink-0', color = '#414651' }) {
  return <WebcamOutlineIcon className={className} stroke={color} />;
}

const ranges = [
  { id: 'custom', label: 'Custom' },
  { id: '12m', label: '12 months' },
  { id: '30d', label: '30 days' },
  { id: '7d', label: '7 days' },
  { id: '24h', label: '24 hours' },
];

export default function AnalyticsChartToolbar({
  title = 'Attendance rate',
  className = '',
  leadingIcon = 'thermometer',
  value,
  onChange,
}) {
  const [uncontrolledActive, setUncontrolledActive] = useState('12m');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const active = value ?? uncontrolledActive;

  const LeadIcon = useMemo(
    () => (leadingIcon === 'camera' ? CameraIcon : ThermometerIcon),
    [leadingIcon],
  );

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`.trim()} dir="ltr">
      <div className="flex min-w-0 items-center gap-2">
        <LeadIcon
          className={leadingIcon === 'camera' ? 'h-5 w-5 shrink-0' : 'h-4 w-4 shrink-0'}
        />
        <span className="truncate text-xs font-medium text-[#101828]">{title}</span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="flex h-8 items-center rounded-full border border-[#E9EAEB] bg-white px-1">
          {ranges.map((r) => {
            const isActive = r.id === active;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => {
                  if (typeof onChange === 'function') onChange(r.id);
                  else setUncontrolledActive(r.id);
                }}
                aria-pressed={isActive}
                className={[
                  'h-6 rounded-full px-3 text-[11px] font-medium leading-4 transition-colors',
                  'outline-none focus-visible:ring-2 focus-visible:ring-cradle-primary/30',
                  isActive
                    ? 'bg-white text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                    : 'text-[#667085] hover:bg-[#F9FAFB] hover:text-[#475467] active:bg-[#F2F4F7]',
                ].join(' ')}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setIsFilterOpen((v) => !v)}
          aria-pressed={isFilterOpen}
          className={[
            'flex h-8 items-center gap-2 rounded-full border bg-white px-3 text-[11px] font-medium transition-colors',
            'outline-none focus-visible:ring-2 focus-visible:ring-cradle-primary/30',
            isFilterOpen ? 'border-[#D6BBFB] text-[#6941C6]' : 'border-[#E9EAEB] text-[#344054] hover:border-[#D5D7DA]',
            'hover:bg-[#F9FAFB] active:bg-[#F2F4F7]',
          ].join(' ')}
        >
          <FilterIcon className="h-4 w-4" color={isFilterOpen ? '#6941C6' : '#344054'} />
          Filter
        </button>
      </div>
    </div>
  );
}

