import { Link } from 'react-router-dom';
import { ChevronLeft, Plus, Search } from 'lucide-react';
import ListQueryPanel from 'components/dashboard/ListQueryPanel';
import ListEmptyState from 'components/dashboard/ListEmptyState';
import DashboardPageBreadcrumb from '../DashboardPageBreadcrumb';
import ConfirmDeleteEntityDialog from 'components/dashboard/ConfirmDeleteEntityDialog';
import { RowToggle } from '../analytics-location-row/LocationRowUi';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import {
  BuildingsRowPencilIcon,
  BuildingsRowTrashIcon,
  BuildingsRowVSeparator,
  BuildingsRowWebcamStatIcon,
} from '../buildings-dashboard/BuildingsRowDesignIcons';
import { useRoomsDashboard } from 'hooks/useRoomsDashboard';
import AddRoomDialog from './AddRoomDialog';
import EditRoomDialog from './EditRoomDialog';

export default function RoomsDashboardMain() {
  const {
    tab,
    setTab,
    query,
    setQuery,
    filtered,
    addOpen,
    openAdd,
    closeAdd,
    editingRow,
    requestEdit,
    requestDelete,
    cancelEdit,
    closeDelete,
    saveEdit,
    confirmDelete,
    addRoom,
    setRowActive,
    deleteTarget,
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
  } = useRoomsDashboard();

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1200px] px-4 pb-16 pt-0 sm:px-6 lg:px-8">
        <DashboardPageBreadcrumb variant="rooms" />

        <div className="px-4 pb-8 pt-6 sm:px-0 sm:pb-10 sm:pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">
                Cradle Rooms
              </h1>
              <p className="mt-2 max-w-xl text-base text-[#535862] sm:text-lg">
                Room creation and management page.
              </p>
            </div>
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-full border border-[#6941C6] bg-[#7F56D9] px-6 text-sm font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_2px_0_0_#5B46B0,0_4px_12px_rgba(105,65,198,0.35)] transition hover:bg-[#6941C6] hover:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_2px_0_0_#4D3299,0_3px_10px_rgba(105,65,198,0.3)] active:translate-y-px active:shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_1px_0_0_#5B46B0] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/45 focus-visible:ring-offset-2 sm:self-center"
            >
              <Plus className="h-5 w-5 shrink-0 text-white" strokeWidth={2.25} aria-hidden />
              Add Room
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white shadow-[0px_14px_42px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-4 border-b border-[#E9EAEB] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
            <div className="inline-flex rounded-full border border-[#E9EAEB] bg-[#FAFAFA] p-1">
              <button
                type="button"
                onClick={() => setTab('active')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === 'active'
                    ? 'bg-white text-[#101828] shadow-sm ring-1 ring-[#E9EAEB]'
                    : 'text-[#717680] hover:text-[#414651]'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setTab('inactive')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  tab === 'inactive'
                    ? 'bg-white text-[#101828] shadow-sm ring-1 ring-[#E9EAEB]'
                    : 'text-[#717680] hover:text-[#414651]'
                }`}
              >
                Inactive
              </button>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#717680]"
                strokeWidth={1.75}
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full rounded-full border border-[#D5D7DA] bg-white py-2.5 pl-10 pr-4 text-sm text-[#101828] placeholder:text-[#717680] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none ring-[#7F56D9] focus:border-[#7F56D9] focus:ring-2"
                aria-label="Search rooms"
              />
            </div>
          </div>

          <div className="border-b border-[#E9EAEB] bg-[#FAFAFA] px-4 py-3 sm:px-6">
            <Link
              to="/dashboard/organizations/branches/buildings"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#414651] transition hover:text-[#101828] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30 rounded-md"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-transparent hover:bg-white/80">
                <ChevronLeft className="h-5 w-5 text-[#717680]" strokeWidth={2} aria-hidden />
              </span>
              Buildings
            </Link>
          </div>

          <ListQueryPanel
            className="px-2 py-2 sm:px-4 sm:py-3"
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            onRetry={refetch}
            isEmpty={filtered.length === 0}
            emptyState={<ListEmptyState>No rooms match your filters.</ListEmptyState>}
            showPagination={showPagination}
            page={page}
            totalPages={totalPages}
            paginationItems={paginationItems}
            onPageChange={setPage}
          >
            <ul className="flex flex-col gap-2">
              {filtered.map((row) => (
                <li key={row.id}>
                  <div
                    className="group flex min-h-[72px] items-center gap-3 rounded-2xl border border-[#E9EAEB] bg-white px-3 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-colors hover:border-[#D6BBFB] hover:bg-[#F4EBFF] sm:gap-4 sm:px-4"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                      <span className="shrink-0 text-[#717680] transition-colors group-hover:text-[#7F56D9]">
                        <HomeOutlineIcon className="h-8 w-8" stroke="currentColor" aria-hidden />
                      </span>
                      <span className="truncate text-base font-semibold text-[#101828] transition-colors group-hover:text-[#6941C6]">
                        {row.name}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1.5 text-sm font-semibold tabular-nums text-[#414651] transition-colors group-hover:text-[#6941C6]">
                        <BuildingsRowWebcamStatIcon
                          className="h-4 w-4 shrink-0"
                          stroke="currentColor"
                        />
                        <span>
                          {row.quotaUsed} / {row.quotaTotal}
                        </span>
                      </div>
                      <BuildingsRowVSeparator />
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#A4A7AE] transition-colors hover:bg-black/[0.06] group-hover:text-[#B692F6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
                        aria-label={`Edit room ${row.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          requestEdit(row.id);
                        }}
                      >
                        <BuildingsRowPencilIcon stroke="currentColor" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#A4A7AE] transition-colors hover:bg-black/[0.06] group-hover:text-[#B692F6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
                        aria-label={`Delete room ${row.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          requestDelete(row);
                        }}
                      >
                        <BuildingsRowTrashIcon stroke="currentColor" />
                      </button>
                      <BuildingsRowVSeparator />
                      <RowToggle
                        checked={row.active}
                        onChange={(next) => setRowActive(row.id, next)}
                        ariaLabel={`${row.name} active`}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </ListQueryPanel>
        </div>
      </div>

      <AddRoomDialog open={addOpen} onClose={closeAdd} onSubmit={addRoom} />

      <EditRoomDialog
        open={editingRow !== null}
        row={editingRow}
        onClose={cancelEdit}
        onSave={saveEdit}
      />

      <ConfirmDeleteEntityDialog
        open={deleteTarget !== null}
        title="Delete room"
        entityName={deleteTarget?.name ?? ''}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
