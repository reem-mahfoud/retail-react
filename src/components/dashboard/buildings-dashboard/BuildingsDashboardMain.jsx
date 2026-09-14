import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import ListQueryPanel from 'components/dashboard/ListQueryPanel';
import ListEmptyState from 'components/dashboard/ListEmptyState';
import DashboardPageBreadcrumb from 'components/dashboard/DashboardPageBreadcrumb';
import ConfirmDeleteEntityDialog from 'components/dashboard/ConfirmDeleteEntityDialog';
import { useBuildingsDashboard } from 'hooks/useBuildingsDashboard';
import AddBuildingDialog from './AddBuildingDialog';
import EditBuildingDialog from './EditBuildingDialog';
import BuildingRowCard from './BuildingRowCard';

/**
 * Cradle Buildings screen: white page, breadcrumb, card (tabs, search, back to Branches, list).
 */
export default function BuildingsDashboardMain({ className = '' }) {
  const {
    listStatus,
    setListStatus,
    search,
    setSearch,
    visibleRows,
    editingRow,
    addOpen,
    openAdd,
    closeAdd,
    requestEdit,
    closeEdit,
    openDeleteConfirm,
    closeDelete,
    confirmDelete,
    saveBuilding,
    addBuilding,
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
  } = useBuildingsDashboard();

  return (
    <div className={`flex w-full max-w-none flex-col bg-white pb-10 font-sans antialiased ${className}`.trim()}>
      <DashboardPageBreadcrumb variant="buildings" />

      <div className="border-b border-[#E9EAEB] px-6 pb-5 pt-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[28px] font-semibold leading-9 tracking-tight text-[#101828] sm:text-[30px]">
              Cradle Buildings
            </h1>
            <p className="mt-1 text-sm font-normal leading-5 text-[#535862] sm:text-[15px] sm:leading-6">
              Page for creating and managing buildings.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 self-start rounded-full border border-[#7F56D9]/30 bg-[#7F56D9] px-3.5 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:self-auto"
            onClick={openAdd}
          >
            <span className="text-base font-normal leading-none" aria-hidden>
              +
            </span>
            Add Building
          </button>
        </div>
      </div>

      <div className="mx-6 mb-8 flex flex-col rounded-2xl border border-[#E9EAEB] bg-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] sm:mx-8">
        <div className="flex flex-col gap-3 border-b border-[#E9EAEB] bg-white px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3">
          <div
            className="inline-flex w-fit shrink-0 rounded-full border border-[#E9EAEB] bg-[#FAFAFA] p-[3px]"
            role="tablist"
            aria-label="Building status"
          >
            <button
              type="button"
              role="tab"
              aria-selected={listStatus === 'active'}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold leading-4 transition sm:px-3.5 ${
                listStatus === 'active'
                  ? 'bg-white text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'
                  : 'text-[#717680] hover:text-[#414651]'
              }`}
              onClick={() => setListStatus('active')}
            >
              Active
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={listStatus === 'inactive'}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold leading-4 transition sm:px-3.5 ${
                listStatus === 'inactive'
                  ? 'bg-white text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'
                  : 'text-[#717680] hover:text-[#414651]'
              }`}
              onClick={() => setListStatus('inactive')}
            >
              Inactive
            </button>
          </div>
          <div className="relative w-full shrink-0 sm:ml-auto sm:w-[200px] sm:max-w-[220px]">
            <Search
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#717680]"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="h-9 w-full rounded-full border border-[#D5D7DA] bg-white py-0 pl-9 pr-3 text-xs font-normal leading-4 text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#717680] focus:border-[#7F56D9] focus:ring-1 focus:ring-[#7F56D9]/25"
              aria-label="Search buildings by name"
            />
          </div>
        </div>

        <div className="border-b border-[#E9EAEB] bg-[#FAFAFA] px-5 py-2.5 sm:px-6">
          <Link
            to="/dashboard/organizations/branches"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#414651] transition hover:text-[#101828] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35 focus-visible:ring-offset-2"
          >
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#E9EAEB] bg-white text-sm text-[#717680] shadow-sm"
              aria-hidden
            >
              ‹
            </span>
            Branches
          </Link>
        </div>

        <ListQueryPanel
          className="bg-white px-5 py-5 sm:px-6 sm:py-6"
          isLoading={isLoading}
          isError={isError}
          error={error}
          isFetching={isFetching}
          onRetry={refetch}
          isEmpty={visibleRows.length === 0}
          emptyState={
            <ListEmptyState variant="muted">
              No buildings match the current filters.
            </ListEmptyState>
          }
          showPagination={showPagination}
          page={page}
          totalPages={totalPages}
          paginationItems={paginationItems}
          onPageChange={setPage}
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-2.5">
            {visibleRows.map((row) => (
              <BuildingRowCard
                key={row.id}
                row={row}
                onEdit={requestEdit}
                onDelete={openDeleteConfirm}
                onToggleActive={setRowActive}
              />
            ))}
          </div>
        </ListQueryPanel>
      </div>

      <AddBuildingDialog open={addOpen} onClose={closeAdd} onSubmit={addBuilding} />

      <EditBuildingDialog
        open={editingRow !== null}
        row={editingRow}
        onClose={closeEdit}
        onSave={saveBuilding}
      />

      <ConfirmDeleteEntityDialog
        open={deleteTarget !== null}
        title="Delete building"
        entityName={deleteTarget?.name ?? ''}
        onClose={closeDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
