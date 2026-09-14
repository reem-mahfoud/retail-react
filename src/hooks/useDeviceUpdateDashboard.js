import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  EDGE_DEVICES_LS,
  EDGE_DEVICES_LIST_CHANGED,
  getMergedEdgeDeviceRows,
} from 'lib/edgeDevicesStorage';
import { subscribeStorageKeys } from 'lib/subscribeStorageList';

/** Device update page: merged edge rows, tabs, search, multi-select, firmware dialog trigger. */
export function useDeviceUpdateDashboard() {
  const [tab, setTab] = useState('active');
  const [query, setQuery] = useState('');
  const [showFilterTag, setShowFilterTag] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [rows, setRows] = useState(() => getMergedEdgeDeviceRows());

  const [selectedIds, setSelectedIds] = useState(() => {
    const merged = getMergedEdgeDeviceRows();
    const activeOnes = merged.filter((r) => r.active !== false);
    if (activeOnes.length >= 2) {
      return new Set([activeOnes[activeOnes.length - 2].id, activeOnes[activeOnes.length - 1].id]);
    }
    return new Set();
  });

  useEffect(() => {
    const applyMerged = () => {
      const next = getMergedEdgeDeviceRows();
      setRows(next);
      setSelectedIds((prev) => {
        const valid = new Set(next.map((r) => String(r.id)));
        const kept = [...prev].filter((id) => valid.has(String(id)));
        return kept.length === prev.size && kept.every((id) => prev.has(id)) ? prev : new Set(kept);
      });
    };

    return subscribeStorageKeys(
      [EDGE_DEVICES_LS.ADDED, EDGE_DEVICES_LS.REMOVED_IDS],
      EDGE_DEVICES_LIST_CHANGED,
      applyMerged,
    );
  }, []);

  const toggleSelect = useCallback((id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (tab === 'active' && !r.active) return false;
      if (tab === 'inactive' && r.active) return false;
      if (!q) return true;
      return r.title.toLowerCase().includes(q);
    });
  }, [rows, tab, query]);

  const hasSelection = useMemo(() => selectedIds.size > 0, [selectedIds]);

  const openUploadDialog = useCallback(() => {
    if (!hasSelection) return;
    setUploadDialogOpen(true);
  }, [hasSelection]);

  const closeUploadDialog = useCallback(() => setUploadDialogOpen(false), []);

  const handleFirmwareConfirm = useCallback((firmwareFile) => {
    void firmwareFile;
  }, []);

  return {
    tab,
    setTab,
    query,
    setQuery,
    showFilterTag,
    setShowFilterTag,
    uploadDialogOpen,
    openUploadDialog,
    closeUploadDialog,
    handleFirmwareConfirm,
    rows,
    filtered,
    selectedIds,
    hasSelection,
    toggleSelect,
  };
}
