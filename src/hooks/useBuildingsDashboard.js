import { useCallback, useMemo } from 'react';
import { mapBuildingFromApi } from 'api/mappers';
import { useBuildingsQuery } from 'hooks/queries';
import { useDashboardOverlays } from 'hooks/useDashboardOverlays';
import { useListDashboardFilters } from 'hooks/useListDashboardFilters';
import { useLocalRowPatches } from 'hooks/useLocalRowPatches';
import { usePaginatedListQuery } from 'hooks/usePaginatedListQuery';
import { LIST_PAGE_SIZE } from 'lib/pagination';

/** @returns {import('types/list').ListDashboardQueryState & Record<string, unknown>} */
export function useBuildingsDashboard() {
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

  const buildingsQuery = useBuildingsQuery({
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
  } = usePaginatedListQuery(buildingsQuery, 'buildings', page, setPage);

  const apiRows = useMemo(
    () => (data?.buildings ?? []).map(mapBuildingFromApi),
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

  const saveBuilding = useCallback(
    ({ name, entityCount, quotaUsed, quotaTotal }) => {
      if (!editingId) return;
      patchRow(editingId, { name, entityCount, quotaUsed, quotaTotal });
      closeEdit();
    },
    [editingId, patchRow, closeEdit],
  );

  const addBuilding = useCallback((payload) => {
    addRow({
      id: `bdg-${Date.now()}`,
      name: payload.name,
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
    openDeleteConfirm: (id) => openDeleteById(id, (r) => r.name),
    closeDelete,
    confirmDelete: () => confirmDeleteOverlay(deleteRow),
    saveBuilding,
    addBuilding,
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
