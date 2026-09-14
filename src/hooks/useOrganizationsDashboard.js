import { useCallback, useMemo, useState } from 'react';
import { mapUniversityFromApi } from 'api/mappers';
import { useUniversitiesQuery } from 'hooks/queries';
import { useListSearchAndPage, useListPagination } from 'hooks/useListPagination';
import { listStatusToIsActive } from 'lib/listStatus';
import { LIST_PAGE_SIZE } from 'lib/pagination';

export function useOrganizationsDashboard() {
  const [status, setStatus] = useState('active');
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const isActive = useMemo(() => listStatusToIsActive(status), [status]);
  const { debouncedSearch: debouncedQuery, page, setPage } = useListSearchAndPage(query, status);

  const { data, isLoading, isError, error, isFetching, refetch } = useUniversitiesQuery({
    page,
    pageSize: LIST_PAGE_SIZE,
    search: debouncedQuery,
    isActive,
  });

  const { totalPages, showPagination, paginationItems } = useListPagination(
    data,
    'universities',
    page,
    setPage,
  );

  const rows = useMemo(
    () => (data?.universities ?? []).map(mapUniversityFromApi),
    [data],
  );

  const visibleRows = rows;

  const editingRow = useMemo(
    () => rows.find((r) => r.id === editingId) ?? null,
    [rows, editingId],
  );

  const openAdd = useCallback(() => setAddOpen(true), []);
  const closeAdd = useCallback(() => setAddOpen(false), []);
  const requestEdit = useCallback((id) => setEditingId(id), []);
  const cancelEdit = useCallback(() => setEditingId(null), []);
  const deleteRow = useCallback(() => {}, []);
  const toggleActive = useCallback((id, next) => {
    setStatus(next ? 'active' : 'inactive');
  }, []);
  const saveEdit = useCallback(() => setEditingId(null), []);
  const submitAdd = useCallback(() => {
    setAddOpen(false);
    setStatus('active');
  }, []);

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
  };
}
