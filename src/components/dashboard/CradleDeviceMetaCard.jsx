import { useEffect, useState } from 'react';
import {
  CradleMetaIconCalendar,
  CradleMetaIconClock,
  CradleMetaIconStorage,
} from 'components/dashboard/cradleDeviceMetaIcons';

function formatLocalDate(d) {
  return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long' }).format(d);
}

function formatLocalTime(d) {
  return new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(d);
}

const CAPACITY_DISPLAY = '198 / 200';

export default function CradleDeviceMetaCard({
  live = true,
  dateLabel = '31 February',
  timeLabel = '17:36',
  capacityLabel = CAPACITY_DISPLAY,
  className = '',
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    if (!live) return undefined;
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, [live]);

  const displayDate = live ? formatLocalDate(now) : dateLabel;
  const displayTime = live ? formatLocalTime(now) : timeLabel;

  const row = 'flex h-10 w-full items-center gap-5';

  return (
    <div
      className={`box-border w-full max-w-[274px] rounded-xl bg-[#FAFAFA] py-5 pl-[14px] pr-3 ${className}`.trim()}
      role="group"
      aria-label="Device session meta"
    >
      <div className="flex flex-col gap-1">
        <div className={row}>
          <span className="text-[#A4A7AE]" aria-hidden>
            <CradleMetaIconCalendar />
          </span>
          <span className="text-sm leading-5 text-[#667085]">{displayDate}</span>
        </div>
        <div className={row}>
          <span className="text-[#A4A7AE]" aria-hidden>
            <CradleMetaIconClock />
          </span>
          <span className="text-sm tabular-nums leading-5 text-[#667085]">{displayTime}</span>
        </div>
        <div className={row}>
          <span className="text-[#16B364]" aria-hidden>
            <CradleMetaIconStorage />
          </span>
          <span
            className="text-sm font-medium tabular-nums leading-5 text-[#16B364]"
            dir="ltr"
            lang="en"
            translate="no"
          >
            {capacityLabel}
          </span>
        </div>
        <div className="mt-3 pr-3" aria-hidden>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[#16B364] transition-[width] duration-500"
              style={{ width: `${(198 / 200) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
