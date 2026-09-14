import { Link } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  ListFilter,
  Search,
  UploadCloud,
  Webcam,
  X,
} from 'lucide-react';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import ListEmptyState from 'components/dashboard/ListEmptyState';
import UploadFirmwareDialog from 'components/dashboard/UploadFirmwareDialog';
import { useDeviceUpdateDashboard } from 'hooks/useDeviceUpdateDashboard';

const FILTER_TAG = 'Qarshi State University';

/** Version / token field — can wrap to multiple lines inside the card. */
const pillTag =
  'inline-flex max-w-full items-center justify-center rounded-xl border border-[#E9EAEB] bg-white px-2 py-1.5 text-left text-[11px] font-medium leading-snug text-[#414651] break-all sm:text-xs';

const pill =
  'inline-flex max-w-full items-center justify-center whitespace-nowrap rounded-full border border-[#E9EAEB] bg-white px-2 py-1 text-[11px] font-medium leading-snug text-[#414651] sm:text-xs';

function UpdateDeviceCard({ row, selected, onToggle }) {
  const detailPath = `/dashboard/edge-devices/${row.id}`;

  return (
    <article
      className={`relative flex min-w-0 flex-col rounded-xl border p-4 shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition-colors sm:p-5 ${
        selected
          ? 'border-[#7F56D9] bg-[#F9F5FF]'
          : 'border-[#E9EAEB] bg-[#FAFAFA]'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          role="checkbox"
          aria-checked={selected}
          onClick={() => onToggle(row.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
            selected
              ? 'border-[#7F56D9] bg-[#7F56D9] text-white'
              : 'border-[#D0D5DD] bg-white hover:border-[#98A2B3]'
          }`}
          aria-label={`Select ${row.title}`}
        >
          {selected ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> : null}
        </button>
        <Link
          to={detailPath}
          className="min-w-0 flex-1 break-words text-base font-semibold leading-snug tracking-tight text-[#101828] outline-none transition hover:text-[#6941C6] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35 focus-visible:ring-offset-2 rounded-lg"
        >
          {row.title}
        </Link>
      </div>

      <Link
        to={detailPath}
        className="mt-4 block pl-8 outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35 focus-visible:ring-offset-2 rounded-lg"
      >
        <span className="flex items-center gap-2 text-sm font-medium tabular-nums text-[#667085]">
          <Webcam className="h-4 w-4 shrink-0 text-[#667085]" strokeWidth={1.75} aria-hidden />
          <span>
            {row.quotaUsed} / {row.quotaTotal}
          </span>
        </span>
      </Link>

      <Link
        to={detailPath}
        className="mt-3 block min-w-0 pl-8 outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35 focus-visible:ring-offset-2 rounded-lg sm:mt-4"
      >
        <div className="flex w-full min-w-0 flex-wrap items-center gap-1.5">
          <span className={pillTag}>{row.tagId}</span>
          <span className={pill}>Organization</span>
          <span className={pill}>Building</span>
          <span className={pill}>Room</span>
        </div>
      </Link>
    </article>
  );
}

export default function DeviceUpdateDashboardMain() {
  const {
    tab,
    setTab,
    query,
    setQuery,
    showFilterTag,
    setShowFilterTag,
    uploadDialogOpen,
    openUploadDialog,
    closeUploadDialog,
    handleFirmwareConfirm,
    filtered,
    selectedIds,
    toggleSelect,
  } = useDeviceUpdateDashboard();

  return (
    <>
    <div className="min-h-full w-full bg-white pb-12 pt-2 text-[#101828] sm:pt-4">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <nav className="mb-5 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
          <Link
            to="/dashboard"
            className="inline-flex rounded-lg p-1 text-[#667085] transition hover:bg-[#EAECF0] hover:text-[#414651] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
            aria-label="Home"
          >
            <HomeOutlineIcon className="h-5 w-5" stroke="#717680" aria-hidden />
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#98A2B3]" strokeWidth={2} aria-hidden />
          <span className="rounded-full border border-[#EAECF0] bg-white px-3 py-1.5 text-sm font-semibold text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
            Device Update
          </span>
        </nav>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">Device Update</h1>
            <p className="mt-2 max-w-xl text-base text-[#535862] sm:text-lg">
              Select devices and upload firmware updates.
            </p>
          </div>
          <button
            type="button"
            onClick={openUploadDialog}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#6941C6] bg-[#7F56D9] px-5 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:self-center"
          >
            Update
            <UploadCloud className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
          </button>
        </div>

        <div className="mt-8 rounded-[28px] border border-[#EAECF0] bg-white px-5 py-6 text-[#101828] shadow-[0px_4px_24px_-4px_rgba(16,24,40,0.08),0px_2px_8px_-2px_rgba(16,24,40,0.06)] sm:px-8 sm:py-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div
              className="inline-flex h-10 w-fit shrink-0 items-center rounded-full border border-[#E9EAEB] bg-[#FAFAFA] p-1"
              role="tablist"
              aria-label="Device status"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'active'}
                className={`h-8 rounded-full px-4 text-sm font-semibold leading-none transition ${
                  tab === 'active'
                    ? 'bg-white text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'
                    : 'text-[#667085] hover:text-[#414651]'
                }`}
                onClick={() => setTab('active')}
              >
                Active
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'inactive'}
                className={`h-8 rounded-full px-4 text-sm font-semibold leading-none transition ${
                  tab === 'inactive'
                    ? 'bg-white text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'
                    : 'text-[#667085] hover:text-[#414651]'
                }`}
                onClick={() => setTab('inactive')}
              >
                Inactive
              </button>
            </div>

            <div className="flex min-w-0 w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end md:w-auto md:flex-nowrap md:gap-2">
              {showFilterTag ? (
                <span className="inline-flex h-10 shrink-0 items-center gap-1 rounded-full border border-[#D5D7DA] bg-white py-0 pl-3.5 pr-1 text-sm font-medium text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                  {FILTER_TAG}
                  <button
                    type="button"
                    className="rounded-full p-1.5 text-[#98A2B3] transition hover:bg-[#F9FAFB] hover:text-[#475467] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
                    aria-label={`Remove filter ${FILTER_TAG}`}
                    onClick={() => setShowFilterTag(false)}
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
                  </button>
                </span>
              ) : null}
              <button
                type="button"
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[#D5D7DA] bg-white px-4 text-sm font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
              >
                <ListFilter className="h-4 w-4 text-[#667085]" strokeWidth={1.75} aria-hidden />
                Filter
              </button>
              <div className="relative min-h-10 min-w-0 flex-1 sm:min-w-[240px] md:max-w-[440px]">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="h-10 w-full rounded-full border border-[#D5D7DA] bg-white py-2 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
                  aria-label="Search devices"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 w-full min-w-0">
            <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {filtered.map((row) => (
                <UpdateDeviceCard
                  key={row.id}
                  row={row}
                  selected={selectedIds.has(row.id)}
                  onToggle={toggleSelect}
                />
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <ListEmptyState as="p" variant="compact" className="mt-8">
              No devices match the current filters.
            </ListEmptyState>
          ) : null}
        </div>
      </div>
    </div>
    <UploadFirmwareDialog
      open={uploadDialogOpen}
      onClose={closeUploadDialog}
      onConfirm={handleFirmwareConfirm}
    />
    </>
  );
}
