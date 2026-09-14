import { useCallback, useEffect, useMemo, useState } from 'react';
import { mapRoomFromApi } from 'api/mappers';
import { useAuditoriumsQuery } from 'hooks/queries';
import { useListSearchAndPage, useListPagination } from 'hooks/useListPagination';
import { useLocalRowPatches } from 'hooks/useLocalRowPatches';
import { listStatusToIsActive } from 'lib/listStatus';
import { LIST_PAGE_SIZE } from 'lib/pagination';
import { parseBuildingId } from 'lib/parseRouteId';

export function useUniversityRoomsDashboard(buildingId) {
  const [status, setStatus] = useState('active');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const parsedBuildingId = useMemo(() => parseBuildingId(buildingId), [buildingId]);
  const isActive = useMemo(() => listStatusToIsActive(status), [status]);
  const { debouncedSearch: debouncedQuery, page, setPage } = useListSearchAndPage(
    query,
    status,
    parsedBuildingId,
  );

  const { data, isLoading, isError, error, isFetching, refetch } = useAuditoriumsQuery({
    buildingId: parsedBuildingId,
    search: debouncedQuery,
    isActive,
    page,
    pageSize: LIST_PAGE_SIZE,
    enabled: parsedBuildingId != null,
  });

  const { totalPages, showPagination, paginationItems } = useListPagination(
    data,
    'auditoriums',
    page,
    setPage,
  );

  const apiRows = useMemo(
    () => (data?.auditoriums ?? []).map(mapRoomFromApi),
    [data],
  );

  const { rows, patchRow, deleteRow, addRow, setRowActive } = useLocalRowPatches(apiRows);

  useEffect(() => {
    setSelectedId((cur) => {
      if (cur && rows.some((r) => r.id === cur)) return cur;
      return rows[0]?.id ?? null;
    });
  }, [rows]);

  const editingRow = useMemo(() => rows.find((r) => r.id === editingId) ?? null, [rows, editingId]);

  const visibleRows = rows;

  const applyRoomEdit = useCallback(
    (next) => {
      if (!editingId) return;
      patchRow(editingId, next);
    },
    [editingId, patchRow],
  );

  const submitAdd = useCallback(({ name, comment }) => {
    const newId = `room-${Date.now()}`;
    addRow({
      id: newId,
      name,
      quotaUsed: 0,
      quotaTotal: 10,
      active: true,
      ...(comment ? { comment } : {}),
    });
    setStatus('active');
    setSelectedId(newId);
  }, [addRow]);

  const toggleActive = useCallback(
    (id, next) => setRowActive(id, next),
    [setRowActive],
  );

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
    buildingIdInvalid: buildingId != null && parsedBuildingId == null,
  };
}
