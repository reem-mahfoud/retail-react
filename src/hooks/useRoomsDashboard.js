import { useCallback, useMemo } from 'react';
import { mapRoomFromApi } from 'api/mappers';
import { useAuditoriumsQuery } from 'hooks/queries';
import { useDashboardOverlays } from 'hooks/useDashboardOverlays';
import { useListDashboardFilters } from 'hooks/useListDashboardFilters';
import { useLocalRowPatches } from 'hooks/useLocalRowPatches';
import { usePaginatedListQuery } from 'hooks/usePaginatedListQuery';
import { LIST_PAGE_SIZE } from 'lib/pagination';

/** @returns {import('types/list').ListDashboardQueryState & Record<string, unknown>} */
export function useRoomsDashboard() {
  const {
    listStatus: tab,
    setListStatus: setTab,
    search: query,
    setSearch: setQuery,
    isActive,
    debouncedSearch: debouncedQuery,
    page,
    setPage,
  } = useListDashboardFilters();

  const auditoriumsQuery = useAuditoriumsQuery({
    page,
    pageSize: LIST_PAGE_SIZE,
    search: debouncedQuery,
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
  } = usePaginatedListQuery(auditoriumsQuery, 'auditoriums', page, setPage);

  const apiRows = useMemo(
    () => (data?.auditoriums ?? []).map(mapRoomFromApi),
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
    openDeleteForRow,
    confirmDelete: confirmDeleteOverlay,
  } = useDashboardOverlays(rows);

  const saveEdit = useCallback(
    ({ name, quotaUsed, quotaTotal }) => {
      if (!editingId) return;
      patchRow(editingId, { name, quotaUsed, quotaTotal });
      closeEdit();
    },
    [editingId, patchRow, closeEdit],
  );

  const addRoom = useCallback(({ name, comment }) => {
    const display = name.trim();
    if (!display) return;
    addRow({
      id: `room-${Date.now()}`,
      name: display,
      ...(comment ? { comment } : {}),
      quotaUsed: 0,
      quotaTotal: 10,
      active: true,
    });
  }, [addRow]);

  return {
    tab,
    setTab,
    query,
    setQuery,
    filtered: rows,
    addOpen,
    openAdd,
    closeAdd,
    editingRow,
    requestEdit,
    requestDelete: (row) => openDeleteForRow(row, (r) => r.name),
    cancelEdit: closeEdit,
    closeDelete,
    saveEdit,
    confirmDelete: () => confirmDeleteOverlay(deleteRow),
    addRoom,
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
