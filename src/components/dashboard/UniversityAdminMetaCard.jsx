import {
  CradleMetaIconCalendar,
  CradleMetaIconClock,
  CradleMetaIconStorage,
} from 'components/dashboard/cradleDeviceMetaIcons';

/**
 * Date / time / cameras card — matches the reference (3 rows only, no progress bar).
 */
export default function UniversityAdminMetaCard({ className = '' }) {
  const row = 'flex h-10 w-full items-center gap-3';
  const iconSize = 'h-5 w-5';

  return (
    <div
      className={`w-full rounded-xl bg-[#FAFAFA] p-4 ${className}`.trim()}
      role="group"
      aria-label="Session meta"
    >
      <div className="flex flex-col gap-0.5">
        <div className={row}>
          <span className="text-[#A4A7AE]" aria-hidden>
            <CradleMetaIconCalendar className={iconSize} />
          </span>
          <span className="text-sm leading-5 text-[#717680]">31 February</span>
        </div>
        <div className={row}>
          <span className="text-[#A4A7AE]" aria-hidden>
            <CradleMetaIconClock className={iconSize} />
          </span>
          <span className="text-sm tabular-nums leading-5 text-[#717680]">17:36</span>
        </div>
        <div className={row}>
          <span className="text-[#16B364]" aria-hidden>
            <CradleMetaIconStorage className={iconSize} />
          </span>
          <span
            className="text-sm font-semibold tabular-nums leading-[18px] text-[#16B364]"
            dir="ltr"
            lang="en"
            translate="no"
          >
            198 / 200
          </span>
        </div>
      </div>
    </div>
  );
}
