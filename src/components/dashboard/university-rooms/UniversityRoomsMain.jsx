import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import ListQueryPanel from 'components/dashboard/ListQueryPanel';
import ListEmptyState from 'components/dashboard/ListEmptyState';
import DashboardPageBreadcrumb from 'components/dashboard/DashboardPageBreadcrumb';
import FilterLinesIcon from 'components/icons/FilterLinesIcon';
import {
  CRADLE_LIST_STACK,
  CRADLE_PAGE_COLUMN,
  CRADLE_PAGE_HEADER,
  CRADLE_TABLE_CARD,
} from 'design/cradleDesignTokens';
import { useUniversityRoomsDashboard } from 'hooks/useUniversityRoomsDashboard';
import AddUniversityRoomDialog from './AddUniversityRoomDialog';
import EditUniversityRoomDialog from './EditUniversityRoomDialog';
import UniversityRoomRow from './UniversityRoomRow';

export default function UniversityRoomsMain() {
  const { orgId, buildingId } = useParams();

  const universityName = useMemo(() => {
    if (!orgId) return 'University';
    return decodeURIComponent(String(orgId)).replace(/^org-/, '').replace(/-/g, ' ');
  }, [orgId]);

  const buildingName = useMemo(() => {
    if (!buildingId) return 'Building';
    const decoded = decodeURIComponent(String(buildingId));
    const matchNumeric = /^bdg-(\d+)$/.exec(decoded);
    if (matchNumeric) return `Building ${matchNumeric[1]}`;
    return decoded.replace(/^bdg-/, '').replace(/-/g, ' ');
  }, [buildingId]);

  const {
    status,
    setStatus,
    query,
    setQuery,
    visibleRows,
    selectedId,
    setSelectedId,
    editingRow,
    addOpen,
    openAdd,
    closeAdd,
    requestEdit,
    cancelEdit,
    applyRoomEdit,
    submitAdd,
    deleteRow,
    toggleActive,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    page,
    setPage,
    totalPages,
    showPagination,
    paginationItems,
    buildingIdInvalid,
  } = useUniversityRoomsDashboard(buildingId);

  return (
    <div className={`${CRADLE_PAGE_COLUMN} font-sans antialiased`}>
      <header className={CRADLE_PAGE_HEADER}>
        <DashboardPageBreadcrumb variant="universities-rooms" label={buildingName} />
        <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <h1 className="text-2xl font-semibold leading-8 tracking-tight text-[#181D27]">Rooms of {universityName}</h1>
            <p className="text-base font-normal leading-6 text-[#535862]">Page for creating and managing rooms.</p>
          </div>
          <button
            type="button"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#7F56D9] px-4 py-2.5 text-sm font-semibold text-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18)] transition hover:bg-[#6941C6] sm:self-auto"
            onClick={openAdd}
          >
            <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
            Add room
          </button>
        </div>
      </header>

      <div className={CRADLE_TABLE_CARD}>
        <div className="flex flex-col gap-5 px-6 pt-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex h-11 w-fit shrink-0 items-center rounded-3xl border border-[#E9EAEB] bg-[#FAFAFA] p-1">
              <button
                type="button"
                className={[
                  'h-9 rounded-3xl px-3 text-sm font-semibold leading-5 transition',
                  status === 'active'
                    ? 'bg-white text-[#414651] shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_-1px_rgba(10,13,18,0.1)]'
                    : 'text-[#717680] hover:text-[#414651]',
                ].join(' ')}
                onClick={() => setStatus('active')}
              >
                Active
              </button>
              <button
                type="button"
                className={[
                  'h-9 rounded-3xl px-3 text-sm font-semibold leading-5 transition',
                  status === 'inactive'
                    ? 'bg-white text-[#414651] shadow-[0px_1px_3px_0px_rgba(10,13,18,0.1),0px_1px_2px_-1px_rgba(10,13,18,0.1)]'
                    : 'text-[#717680] hover:text-[#414651]',
                ].join(' ')}
                onClick={() => setStatus('inactive')}
              >
                Inactive
              </button>
            </div>

            <div className="flex min-w-0 w-full flex-wrap items-center justify-end gap-3 lg:w-auto lg:flex-nowrap">
              <button
                type="button"
                className="inline-flex h-10 shrink-0 items-center gap-1 rounded-full border border-[#D5D7DA] bg-white px-3.5 text-sm font-semibold text-[#414651] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] transition hover:bg-[#FAFAFA]"
              >
                <FilterLinesIcon className="h-5 w-5 text-[#414651]" aria-hidden />
                Filter
              </button>
              <div className="relative w-full min-w-0 max-w-[320px]">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#717680]"
                  strokeWidth={2}
                  aria-hidden
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="h-10 w-full rounded-3xl border border-[#D5D7DA] bg-white pl-10 pr-3 text-base font-normal leading-6 text-[#181D27] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-none placeholder:text-[#717680] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-[#E9EAEB] bg-[#FAFAFA] px-6 py-3">
          <Link
            to={`/dashboard/organizations/${orgId}/buildings`}
            className="inline-flex items-center gap-3 text-sm font-semibold text-[#414651] transition hover:text-[#181D27]"
          >
            <span
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#E9EAEB] bg-white text-[#717680] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]"
              aria-hidden
            >
              ‹
            </span>
            Buildings
          </Link>
        </div>

        <ListQueryPanel
          className={`${CRADLE_LIST_STACK} px-6 pb-6 pt-4`}
          isLoading={isLoading}
          isError={isError}
          error={error}
          isFetching={isFetching}
          onRetry={refetch}
          isEmpty={visibleRows.length === 0}
          emptyState={
            buildingIdInvalid ? (
              <ListEmptyState>Invalid building id in URL.</ListEmptyState>
            ) : (
              <ListEmptyState>No rooms found.</ListEmptyState>
            )
          }
          showPagination={showPagination}
          page={page}
          totalPages={totalPages}
          paginationItems={paginationItems}
          onPageChange={setPage}
        >
          {visibleRows.map((row) => (
            <UniversityRoomRow
              key={row.id}
              row={row}
              selected={row.id === selectedId}
              onSelect={setSelectedId}
              onEdit={requestEdit}
              onDelete={deleteRow}
              onToggleActive={toggleActive}
            />
          ))}
        </ListQueryPanel>
      </div>

      <EditUniversityRoomDialog
        open={Boolean(editingRow)}
        row={editingRow}
        onClose={cancelEdit}
        onSave={applyRoomEdit}
      />

      <AddUniversityRoomDialog open={addOpen} onClose={closeAdd} onSubmit={submitAdd} />
    </div>
  );
}
