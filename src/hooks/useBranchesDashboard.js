import { useCallback, useMemo } from 'react';
import { mapBranchFromApi } from 'api/mappers';
import { useLocationsQuery } from 'hooks/queries';
import { useDashboardOverlays } from 'hooks/useDashboardOverlays';
import { useListDashboardFilters } from 'hooks/useListDashboardFilters';
import { useLocalRowPatches } from 'hooks/useLocalRowPatches';
import { usePaginatedListQuery } from 'hooks/usePaginatedListQuery';
import { LIST_PAGE_SIZE } from 'lib/pagination';

/** @returns {import('types/list').ListDashboardQueryState & Record<string, unknown>} */
export function useBranchesDashboard() {
  const {
    listStatus,
    setListStatus,
    search,
    setSearch,
    isActive,
    debouncedSearch,
    page,
    setPage,
  } = useListDashboardFilters();

  const locationsQuery = useLocationsQuery({
    page,
    pageSize: LIST_PAGE_SIZE,
    search: debouncedSearch,
    isActive,
  });

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
    totalPages,
    showPagination,
    paginationItems,
  } = usePaginatedListQuery(locationsQuery, 'locations', page, setPage);

  const apiRows = useMemo(
    () => (data?.locations ?? []).map(mapBranchFromApi),
    [data],
  );

  const { rows, patchRow, deleteRow, addRow, setRowActive } = useLocalRowPatches(apiRows);
  const {
    editingId,
    editingRow,
    addOpen,
    deleteTarget,
    openAdd,
    closeAdd,
    closeEdit,
    closeDelete,
    requestEdit,
    confirmDelete: confirmDeleteOverlay,
    openDeleteById,
  } = useDashboardOverlays(rows);

  const saveBranch = useCallback(
    ({ addressLabel, entityCount, quotaUsed, quotaTotal }) => {
      if (!editingId) return;
      patchRow(editingId, { addressLabel, entityCount, quotaUsed, quotaTotal });
      closeEdit();
    },
    [editingId, patchRow, closeEdit],
  );

  const addBranch = useCallback((payload) => {
    addRow({
      id: `b-${Date.now()}`,
      addressLabel: payload.addressLabel,
      entityCount: payload.entityCount,
      quotaUsed: payload.quotaUsed,
      quotaTotal: payload.quotaTotal,
      active: true,
      logoUrl: payload.logoUrl,
    });
  }, [addRow]);

  return {
    listStatus,
    setListStatus,
    search,
    setSearch,
    visibleRows: rows,
    editingRow,
    addOpen,
    openAdd,
    closeAdd,
    requestEdit,
    closeEdit,
    openDeleteConfirm: (id) => openDeleteById(id, (r) => r.addressLabel),
    closeDelete,
    confirmDelete: () => confirmDeleteOverlay(deleteRow),
    saveBranch,
    addBranch,
    setRowActive,
    deleteTarget,
    page,
    setPage,
    totalPages,
    showPagination,
    paginationItems,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  };
}
