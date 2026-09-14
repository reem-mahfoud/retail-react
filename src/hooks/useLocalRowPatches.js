import { useCallback, useMemo, useState } from 'react';

export function useLocalRowPatches(apiRows) {
  const [added, setAdded] = useState([]);
  const [edited, setEdited] = useState({});
  const [deletedIds, setDeletedIds] = useState(() => new Set());

  const rows = useMemo(() => {
    const base = apiRows
      .filter((row) => !deletedIds.has(row.id))
      .map((row) => (edited[row.id] ? { ...row, ...edited[row.id] } : row));
    return [...added, ...base];
  }, [apiRows, added, edited, deletedIds]);

  const patchRow = useCallback((id, updates) => {
    setEdited((prev) => ({ ...prev, [id]: { ...prev[id], ...updates } }));
  }, []);

  const replaceRow = useCallback((id, nextRow) => {
    setEdited((prev) => ({ ...prev, [id]: nextRow }));
  }, []);

  const deleteRow = useCallback((id) => {
    setDeletedIds((prev) => new Set(prev).add(id));
    setAdded((prev) => prev.filter((row) => row.id !== id));
    setEdited((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const addRow = useCallback((row) => {
    setAdded((prev) => [row, ...prev]);
  }, []);

  const setRowActive = useCallback(
    (id, active) => patchRow(id, { active }),
    [patchRow],
  );

  return {
    rows,
    patchRow,
    replaceRow,
    deleteRow,
    addRow,
    setRowActive,
  };
}
