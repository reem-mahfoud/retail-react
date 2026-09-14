import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMergedEdgeDeviceRows, persistEdgeDeviceDeletion } from 'lib/edgeDevicesStorage';
import { useEscapeKey } from 'hooks/useEscapeKey';

/**
 * Edge devices list: merged seed + persisted rows, card menu actions, edit/delete, toast.
 * Portal menu / card layout remain in the page component.
 */
export function useEdgeDevicesDashboard() {
  const [tab, setTab] = useState('active');
  const [query, setQuery] = useState('');
  const [showFilterTag, setShowFilterTag] = useState(true);
  const [rows, setRows] = useState(() => getMergedEdgeDeviceRows());
  const [menuCardId, setMenuCardId] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingDevice, setEditingDevice] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleMenuToggle = useCallback((id) => {
    setMenuCardId((prev) => {
      if (id === null) return null;
      return prev === id ? null : id;
    });
  }, []);

  const handleMenuAction = useCallback((deviceId, action) => {
    const row = rows.find((r) => r.id === deviceId);
    if (!row) return;
    switch (action) {
      case 'restart':
        setToast(`Restart scheduled for “${row.title}”.`);
        break;
      case 'disconnect':
        setRows((prev) =>
          prev.map((r) => (r.id === deviceId ? { ...r, active: false } : r)),
        );
        setToast(`“${row.title}” disconnected. It appears under Inactive.`);
        break;
      case 'connect':
        setRows((prev) =>
          prev.map((r) => (r.id === deviceId ? { ...r, active: true } : r)),
        );
        setToast(`“${row.title}” connected. It appears under Active.`);
        break;
      case 'edit':
        setEditingDevice(row);
        setEditTitle(row.title);
        break;
      case 'delete':
        setDeleteTarget(row);
        break;
      default:
        break;
    }
  }, [rows]);

  const closeDeleteDialog = useCallback(() => setDeleteTarget(null), []);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    persistEdgeDeviceDeletion(deleteTarget.id);
    setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setToast(`“${deleteTarget.title}” was removed.`);
    setDeleteTarget(null);
  }, [deleteTarget]);

  const closeEditDialog = useCallback(() => setEditingDevice(null), []);

  const saveEdit = useCallback(() => {
    if (!editingDevice) return;
    const next = editTitle.trim();
    if (!next) return;
    setRows((prev) =>
      prev.map((r) => (r.id === editingDevice.id ? { ...r, title: next } : r)),
    );
    setToast('Device name updated.');
    setEditingDevice(null);
  }, [editingDevice, editTitle]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (tab === 'active' && !r.active) return false;
      if (tab === 'inactive' && r.active) return false;
      if (!q) return true;
      return r.title.toLowerCase().includes(q);
    });
  }, [rows, tab, query]);

  const closeOverlay = useCallback(() => {
    setMenuCardId(null);
    setEditingDevice(null);
  }, []);

  useEscapeKey(Boolean(menuCardId || editingDevice), closeOverlay);

  return {
    tab,
    setTab,
    query,
    setQuery,
    showFilterTag,
    setShowFilterTag,
    filtered,
    menuCardId,
    handleMenuToggle,
    handleMenuAction,
    toast,
    deleteTarget,
    closeDeleteDialog,
    confirmDelete,
    editingDevice,
    editTitle,
    setEditTitle,
    closeEditDialog,
    saveEdit,
  };
}
