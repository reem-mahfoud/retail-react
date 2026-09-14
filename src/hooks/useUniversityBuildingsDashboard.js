import { useCallback, useMemo, useState } from 'react';
import { mapBuildingFromApi } from 'api/mappers';
import { useBuildingsQuery } from 'hooks/queries';
import { useListSearchAndPage, useListPagination } from 'hooks/useListPagination';
import { useLocalRowPatches } from 'hooks/useLocalRowPatches';
import { listStatusToIsActive } from 'lib/listStatus';
import { LIST_PAGE_SIZE } from 'lib/pagination';
import { parseUniversityId } from 'lib/parseRouteId';

export function useUniversityBuildingsDashboard(universityId) {
  const [status, setStatus] = useState('active');
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const parsedUniversityId = useMemo(
    () => parseUniversityId(universityId),
    [universityId],
  );

  const isActive = useMemo(() => listStatusToIsActive(status), [status]);
  const { debouncedSearch: debouncedQuery, page, setPage } = useListSearchAndPage(
    query,
    status,
    parsedUniversityId,
  );

  const { data, isLoading, isError, error, isFetching, refetch } = useBuildingsQuery({
    universityId: parsedUniversityId,
    search: debouncedQuery,
    isActive,
    page,
    pageSize: LIST_PAGE_SIZE,
    enabled: parsedUniversityId != null,
  });

  const { totalPages, showPagination, paginationItems } = useListPagination(
    data,
    'buildings',
    page,
    setPage,
  );

  const apiRows = useMemo(
    () => (data?.buildings ?? []).map(mapBuildingFromApi),
    [data],
  );

  const { rows, patchRow, deleteRow, addRow, setRowActive } = useLocalRowPatches(apiRows);

  const visibleRows = rows;

  const editingRow = useMemo(() => rows.find((r) => r.id === editingId) ?? null, [rows, editingId]);

  const toggleActive = useCallback(
    (id, next) => setRowActive(id, next),
    [setRowActive],
  );

  const saveEdit = useCallback(
    ({ name, entityCount, quotaUsed, quotaTotal }) => {
      if (!editingId) return;
      patchRow(editingId, { name, entityCount, quotaUsed, quotaTotal });
      setEditingId(null);
    },
    [editingId, patchRow],
  );

  const submitAdd = useCallback(({ name }) => {
    addRow({
      id: `bdg-${Date.now()}`,
      name,
      entityCount: 0,
      quotaUsed: 0,
      quotaTotal: 10,
      active: true,
    });
    setStatus('active');
  }, [addRow]);

  const openAdd = useCallback(() => setAddOpen(true), []);
  const closeAdd = useCallback(() => setAddOpen(false), []);
  const requestEdit = useCallback((id) => setEditingId(id), []);
  const cancelEdit = useCallback(() => setEditingId(null), []);

  return {
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
    universityIdInvalid: universityId != null && parsedUniversityId == null,
  };
}
