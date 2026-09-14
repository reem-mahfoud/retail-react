import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  AnalyticsIconChevronRight,
  AnalyticsIconChevronDown,
  AnalyticsIconCalendar,
} from 'components/dashboard/analyticsHeaderIcons';
import ServerSearchSelect from 'components/dashboard/ServerSearchSelect';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import { CRADLE_PAGE_HEADER } from 'design/cradleDesignTokens';

const pillSelect =
  'h-8 min-w-0 cursor-pointer appearance-none rounded-full border border-[#D5D7DA] bg-white px-4 text-[12px] font-medium leading-4 text-[#344054] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-none transition hover:border-[#D5D7DA] focus-visible:ring-2 focus-visible:ring-cradle-primary/30';

function formatUsDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return '';
  return `${m}/${d}/${y}`;
}

function FilterSelect({ id, label, value, onChange, options, minWidthClassName = 'min-w-[148px]' }) {
  return (
    <div className="relative shrink-0">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        className={`${pillSelect} ${minWidthClassName} pr-9`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <AnalyticsIconChevronDown className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

export default function AnalyticsPageHeader({
  className = '',
  branchId = '',
  onBranchIdChange,
  departmentId = 'all',
  onDepartmentIdChange,
  dateStr = '',
  onDateStrChange,
  branchOptions = [],
  branchSearchLoading = false,
  onBranchSearch,
}) {
  const dateInputRef = useRef(null);
  const dateLabel = useMemo(() => formatUsDate(dateStr), [dateStr]);

  return (
    <header
      className={`${CRADLE_PAGE_HEADER} text-left ${className}`.trim()}
      dir="ltr"
    >
      <nav className="flex flex-nowrap items-center gap-2 overflow-x-clip text-xs font-medium text-[#717680]" aria-label="Breadcrumb">
        <Link
          to="/dashboard"
          className="inline-flex items-center rounded-md outline-none ring-offset-2 ring-offset-transparent transition hover:text-[#475467] focus-visible:ring-2 focus-visible:ring-cradle-primary/30"
        >
          <HomeOutlineIcon className="h-4 w-4" stroke="#717680" aria-hidden />
          <span className="sr-only">Home</span>
        </Link>
        <AnalyticsIconChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" />
        <span className="text-[#535862]" aria-current="page">
          Analytics
        </span>
      </nav>

      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex min-w-0 flex-nowrap items-center justify-between gap-4">
        <h1 className="min-w-0 shrink truncate text-2xl font-semibold leading-8 tracking-tight text-[#181D27]">
          Analytics
        </h1>

        <div className="flex w-auto shrink-0 flex-nowrap items-center justify-end gap-3">
          <ServerSearchSelect
            id="analytics-filter-branch"
            label="Branch"
            value={branchId}
            onChange={onBranchIdChange}
            placeholder="All branch"
            options={branchOptions}
            loading={branchSearchLoading}
            onSearchQuery={onBranchSearch}
            minWidth={148}
          />
          <FilterSelect
            id="analytics-filter-department"
            label="Department"
            value={departmentId}
            onChange={onDepartmentIdChange}
            minWidthClassName="min-w-[156px]"
            options={[
              { value: 'all', label: 'All departments' },
              { value: 'dept-a', label: 'Department A' },
              { value: 'dept-b', label: 'Department B' },
            ]}
          />

          <div className="relative h-8 min-w-[128px] shrink-0">
            <label htmlFor="analytics-filter-date" className="sr-only">
              Report date
            </label>
            <div
              className="pointer-events-none absolute inset-0 flex items-center gap-2 rounded-full border border-[#D5D7DA] bg-white pl-4 pr-4 shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
              aria-hidden
            >
              <AnalyticsIconCalendar className="h-4 w-4 shrink-0" />
              <span className="min-w-0 truncate text-[12px] font-medium leading-4 text-[#344054]">{dateLabel}</span>
            </div>
            <input
              id="analytics-filter-date"
              type="date"
              ref={dateInputRef}
              value={dateStr}
              onChange={(e) => onDateStrChange(e.target.value)}
              onClick={() => {
                if (dateInputRef.current?.showPicker) dateInputRef.current.showPicker();
              }}
              style={{ colorScheme: 'light' }}
              className="absolute inset-0 z-[1] h-full w-full cursor-pointer opacity-0"
            />
          </div>
        </div>
        </div>

        <p className="max-w-2xl text-base font-normal leading-6 text-[#535862]">
        The &apos;Analytics&apos; section provides up-to-date information. Here you will find visual graphs and reports.
      </p>
      </div>
    </header>
  );
}
