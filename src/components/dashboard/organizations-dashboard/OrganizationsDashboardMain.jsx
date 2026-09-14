import { Plus, Search } from 'lucide-react';
import FilterLinesIcon from 'components/icons/FilterLinesIcon';
import DashboardPageBreadcrumb from 'components/dashboard/DashboardPageBreadcrumb';
import { useIsUniversityAdmin } from 'hooks/useIsUniversityAdmin';
import { useOrganizationsDashboard } from 'hooks/useOrganizationsDashboard';
import {
  CRADLE_LIST_STACK,
  CRADLE_PAGE_COLUMN,
  CRADLE_PAGE_HEADER,
  CRADLE_TABLE_CARD,
} from 'design/cradleDesignTokens';
import ListQueryPanel from 'components/dashboard/ListQueryPanel';
import ListEmptyState from 'components/dashboard/ListEmptyState';
import AddUniversityDialog from './AddUniversityDialog';
import EditUniversityDialog from './EditUniversityDialog';
import UniversityRow from './UniversityRow';

export default function OrganizationsDashboardMain({ className = '' }) {
  const isUniversityAdmin = useIsUniversityAdmin();
  const entityLabel = isUniversityAdmin ? 'University' : 'Organization';

  const {
    status,
    setStatus,
    query,
    setQuery,
    visibleRows,
    editingRow,
    addOpen,
    openAdd,
    closeAdd,
    requestEdit,
    cancelEdit,
    deleteRow,
    toggleActive,
    saveEdit,
    submitAdd,
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
  } = useOrganizationsDashboard();

  const dialogs = (
    <>
      <EditUniversityDialog
        open={editingRow !== null}
        row={editingRow}
        onClose={cancelEdit}
        entityLabel={entityLabel}
        onSave={saveEdit}
      />
      <AddUniversityDialog
        open={addOpen}
        onClose={closeAdd}
        entityLabel={entityLabel}
        onSubmit={submitAdd}
      />
    </>
  );

  if (isUniversityAdmin) {
    return (
      <div className={`${CRADLE_PAGE_COLUMN} ${className}`.trim()}>
        <header className={CRADLE_PAGE_HEADER}>
          <DashboardPageBreadcrumb variant="universities" />
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <h1 className="text-2xl font-semibold leading-8 tracking-tight text-[#181D27]">Universities</h1>
              <p className="text-base font-normal leading-6 text-[#535862]">
                Page for creating and managing universities.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#7F56D9] px-4 py-2.5 text-sm font-semibold text-white shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18)] transition hover:bg-[#6941C6] sm:self-auto"
              onClick={openAdd}
            >
              <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
              Add university
            </button>
          </div>
        </header>

        <div className={CRADLE_TABLE_CARD}>
          <div className="flex flex-col gap-5 px-6 pt-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div
                className="inline-flex h-11 w-fit shrink-0 items-center rounded-3xl border border-[#E9EAEB] bg-[#FAFAFA] p-1"
                role="tablist"
                aria-label="University status"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={status === 'active'}
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
                  role="tab"
                  aria-selected={status === 'inactive'}
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
                  onClick={() => {}}
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

          <ListQueryPanel
            className={`${CRADLE_LIST_STACK} px-6 pb-6 pt-4`}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            onRetry={refetch}
            isEmpty={visibleRows.length === 0}
            emptyState={<ListEmptyState>No universities found.</ListEmptyState>}
            showPagination={showPagination}
            page={page}
            totalPages={totalPages}
            paginationItems={paginationItems}
            onPageChange={setPage}
          >
            {visibleRows.map((row) => (
              <div key={row.id} className="contents">
                <UniversityRow
                  row={row}
                  onEdit={requestEdit}
                  onDelete={deleteRow}
                  onToggleActive={toggleActive}
                />
              </div>
            ))}
          </ListQueryPanel>
        </div>

        {dialogs}
      </div>
    );
  }

  return (
    <div className={`flex w-full min-w-0 flex-col ${className}`.trim()}>
      <DashboardPageBreadcrumb variant="organizations" />
      <div className="mt-4 w-full min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-[#101828]">Organizations</h1>
            <p className="mt-1 text-sm text-[#667085]">Page for creating and managing organizations.</p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-[#7F56D9] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#6941C6]"
            onClick={openAdd}
          >
            <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
            Add organization
          </button>
        </div>

        <div className="mt-5 rounded-2xl border border-[#EAECF0] bg-white p-4 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center rounded-full bg-[#F2F4F7] p-1">
              <button
                type="button"
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  status === 'active' ? 'bg-white text-[#101828] shadow-sm' : 'text-[#667085] hover:text-[#344054]',
                ].join(' ')}
                onClick={() => setStatus('active')}
              >
                Active
              </button>
              <button
                type="button"
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition',
                  status === 'inactive' ? 'bg-white text-[#101828] shadow-sm' : 'text-[#667085] hover:text-[#344054]',
                ].join(' ')}
                onClick={() => setStatus('inactive')}
              >
                Inactive
              </button>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#EAECF0] bg-white px-4 py-2 text-sm font-semibold text-[#344054] shadow-sm hover:bg-[#F9FAFB]"
                onClick={() => {}}
              >
                <FilterLinesIcon className="h-4 w-4 text-[#0A0D12]" aria-hidden />
                Filter
              </button>
              <div className="relative w-full max-w-[320px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]" strokeWidth={2} aria-hidden />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="h-10 w-full rounded-full border border-[#EAECF0] bg-white pl-9 pr-3 text-sm text-[#101828] outline-none placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/20"
                />
              </div>
            </div>
          </div>

          <ListQueryPanel
            className="mt-4 space-y-3"
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            onRetry={refetch}
            isEmpty={visibleRows.length === 0}
            emptyState={<ListEmptyState variant="panel">No organizations found.</ListEmptyState>}
            showPagination={showPagination}
            page={page}
            totalPages={totalPages}
            paginationItems={paginationItems}
            onPageChange={setPage}
          >
            {visibleRows.map((row) => (
              <div key={row.id} className="contents">
                <UniversityRow
                  row={row}
                  onEdit={requestEdit}
                  onDelete={deleteRow}
                  onToggleActive={toggleActive}
                />
              </div>
            ))}
          </ListQueryPanel>
        </div>
      </div>

      {dialogs}
    </div>
  );
}
