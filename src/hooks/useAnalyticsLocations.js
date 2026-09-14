import { useCallback, useMemo, useState } from 'react';
import { mapAnalyticsLocationFromApi } from 'api/mappers';
import { useLocationsQuery } from 'hooks/queries';
import { useLocalRowPatches } from 'hooks/useLocalRowPatches';

export function useAnalyticsLocations({ smartCamerasData = null } = {}) {
  const [editingLocationId, setEditingLocationId] = useState(null);
  const [deleteLocationId, setDeleteLocationId] = useState(null);

  const {
    data: locationsData,
    isLoading,
    isError,
    error,
  } = useLocationsQuery();

  const apiLocations = useMemo(() => {
    const rows = locationsData?.locations ?? [];
    const smartCameras = smartCamerasData?.cameras ?? [];
    return rows.map((location, index) =>
      mapAnalyticsLocationFromApi(location, smartCameras[index] ?? null),
    );
  }, [locationsData, smartCamerasData]);

  const { rows: locations, patchRow, deleteRow } = useLocalRowPatches(apiLocations);

  const editingLocation = useMemo(
    () => locations.find((l) => l.id === editingLocationId) ?? null,
    [locations, editingLocationId],
  );

  const deleteLocation = useMemo(
    () => locations.find((l) => l.id === deleteLocationId) ?? null,
    [locations, deleteLocationId],
  );

  const requestEdit = useCallback((id) => {
    setDeleteLocationId(null);
    setEditingLocationId(id);
  }, []);

  const requestDelete = useCallback((id) => {
    setEditingLocationId(null);
    setDeleteLocationId(id);
  }, []);

  const cancelEdit = useCallback(() => setEditingLocationId(null), []);
  const cancelDelete = useCallback(() => setDeleteLocationId(null), []);

  const saveLocationLabel = useCallback(
    (nextName) => {
      if (!editingLocation) return;
      const trimmed = String(nextName ?? '').trim();
      if (!trimmed) return;
      patchRow(editingLocation.id, { locationLabel: trimmed });
      setEditingLocationId(null);
    },
    [editingLocation, patchRow],
  );

  const confirmDelete = useCallback(() => {
    if (!deleteLocation) return;
    deleteRow(deleteLocation.id);
    setDeleteLocationId(null);
  }, [deleteLocation, deleteRow]);

  return {
    locations,
    editingLocation,
    deleteLocation,
    requestEdit,
    requestDelete,
    cancelEdit,
    cancelDelete,
    saveLocationLabel,
    confirmDelete,
    isLoading,
    isError,
    error,
  };
}
