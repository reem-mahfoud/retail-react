import { useCallback, useMemo, useState } from 'react';
import { mapRoleFromApi } from 'api/mappers';
import { useRolesQuery } from 'hooks/queries';
import { useListSearchAndPage, useListPagination } from 'hooks/useListPagination';
import { useLocalRowPatches } from 'hooks/useLocalRowPatches';
import { LIST_PAGE_SIZE } from 'lib/pagination';

function formatTodayDisplay() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

export function useRoleManagementDashboard() {
  const [query, setQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [editNameDraft, setEditNameDraft] = useState('');
  const [createOpen, setCreateOpen] = useState(false);

  const { debouncedSearch: debouncedQuery, page, setPage } = useListSearchAndPage(query);

  const {
    data: rolesData,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useRolesQuery({
    page,
    pageSize: LIST_PAGE_SIZE,
    search: debouncedQuery,
  });

  const { totalPages, showPagination, paginationItems } = useListPagination(
    rolesData,
    'roles',
    page,
    setPage,
  );

  const apiRoles = useMemo(
    () => (rolesData?.roles ?? []).map(mapRoleFromApi),
    [rolesData],
  );

  const { rows: roles, patchRow, deleteRow, addRow } = useLocalRowPatches(apiRoles);

  const filtered = roles;

  const openEdit = useCallback((role) => {
    setEditingRole(role);
    setEditNameDraft(role.name);
  }, []);

  const closeEdit = useCallback(() => {
    setEditingRole(null);
    setEditNameDraft('');
  }, []);

  const saveEdit = useCallback(() => {
    if (!editingRole) return;
    const next = editNameDraft.trim();
    if (!next) return;
    patchRow(editingRole.id, { name: next, modified: formatTodayDisplay() });
    closeEdit();
  }, [editingRole, editNameDraft, closeEdit, patchRow]);

  const closeDelete = useCallback(() => setDeleteTarget(null), []);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    deleteRow(deleteTarget.id);
    setDeleteTarget(null);
  }, [deleteTarget, deleteRow]);

  const handleCreateRole = useCallback(({ name, variant, capabilities }) => {
    const trimmed = String(name ?? '').trim();
    if (!trimmed) return;
    addRow({
      id: `r-${Date.now()}`,
      name: trimmed,
      created: formatTodayDisplay(),
      modified: formatTodayDisplay(),
      variant,
      capabilities,
    });
  }, [addRow]);

  const openCreate = useCallback(() => setCreateOpen(true), []);
  const closeCreate = useCallback(() => setCreateOpen(false), []);

  const listEmpty = useMemo(
    () => !isLoading && !isError && roles.length === 0,
    [isLoading, isError, roles.length],
  );

  return {
    roles,
    query,
    setQuery,
    filtered,
    deleteTarget,
    setDeleteTarget,
    closeDelete,
    confirmDelete,
    editingRole,
    editNameDraft,
    setEditNameDraft,
    openEdit,
    closeEdit,
    saveEdit,
    createOpen,
    openCreate,
    closeCreate,
    handleCreateRole,
    listEmpty,
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
