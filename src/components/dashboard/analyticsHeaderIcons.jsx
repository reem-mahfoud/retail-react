

const stroke = '#98A2B3';
const strokeDark = '#344054';

export function AnalyticsIconHome({ className = 'h-4 w-4', color = stroke }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5 12 3.5 20 10.5M6 10.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 20v-7h6v7"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AnalyticsIconChevronRight({ className = 'h-4 w-4', color = stroke }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m9 6 6 6-6 6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AnalyticsIconChevronDown({ className = 'h-4 w-4', color = strokeDark }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="m6 9 6 6 6-6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AnalyticsIconCalendar({ className = 'h-4 w-4', color = strokeDark }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 6V4m8 2V4M5 10h14M5 8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
