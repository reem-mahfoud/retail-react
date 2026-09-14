import { useCallback, useMemo, useState } from 'react';
import { useEscapeKey } from 'hooks/useEscapeKey';

/**
 * CRUD overlay state shared by entity list dashboards (add / edit / delete dialogs).
 * @template {{ id: string | number }} TRow
 * @param {TRow[]} [rows]
 * @returns {import('types/list').DashboardOverlaysState<TRow>}
 */
export function useDashboardOverlays(rows = []) {
  const [editingId, setEditingId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const editingRow = useMemo(
    () => rows.find((r) => r.id === editingId) ?? null,
    [rows, editingId],
  );

  const closeOverlays = useCallback(() => {
    setAddOpen(false);
    setEditingId(null);
    setDeleteTarget(null);
  }, []);

  useEscapeKey(Boolean(editingId || addOpen || deleteTarget), closeOverlays);

  const openAdd = useCallback(() => {
    setEditingId(null);
    setDeleteTarget(null);
    setAddOpen(true);
  }, []);

  const closeAdd = useCallback(() => setAddOpen(false), []);
  const closeEdit = useCallback(() => setEditingId(null), []);
  const closeDelete = useCallback(() => setDeleteTarget(null), []);

  const requestEdit = useCallback((id) => {
    setDeleteTarget(null);
    setEditingId(id);
  }, []);

  const openDeleteForRow = useCallback((row, getLabel) => {
    if (!row) return;
    setDeleteTarget({ id: row.id, name: getLabel(row) });
    setEditingId(null);
  }, []);

  const openDeleteById = useCallback(
    (id, getLabel) => {
      const row = rows.find((r) => r.id === id);
      if (!row) return;
      openDeleteForRow(row, getLabel);
    },
    [rows, openDeleteForRow],
  );

  const confirmDelete = useCallback(
    (deleteRow) => {
      if (!deleteTarget) return;
      deleteRow(deleteTarget.id);
      setDeleteTarget(null);
    },
    [deleteTarget],
  );

  return {
    editingId,
    editingRow,
    addOpen,
    deleteTarget,
    closeOverlays,
    openAdd,
    closeAdd,
    closeEdit,
    closeDelete,
    requestEdit,
    openDeleteForRow,
    openDeleteById,
    confirmDelete,
  };
}
