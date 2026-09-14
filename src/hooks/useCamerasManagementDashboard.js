import { useCallback, useEffect, useMemo, useState } from 'react';
import { mapCameraFromApi, mapUniversityFromApi } from 'api/mappers';
import { useCamerasQuery, useUniversitiesQuery } from 'hooks/queries';
import { useEdgeDevicesListSubscription } from 'hooks/useEdgeDevicesListSubscription';
import { useListSearchAndPage, useListPagination } from 'hooks/useListPagination';
import { useLocalRowPatches } from 'hooks/useLocalRowPatches';
import { listStatusToIsActive } from 'lib/listStatus';
import { LIST_PAGE_SIZE } from 'lib/pagination';
import {
  getBuildings,
  getRooms,
  subscribeBuildings,
  subscribeRooms,
} from 'lib/universityAdminEntitiesStorage';
import { getMergedEdgeDeviceRows } from 'lib/edgeDevicesStorage';
import { INITIAL_UNIVERSITY_BUILDINGS } from 'components/dashboard/university-buildings/constants';
import { INITIAL_UNIVERSITY_ROOMS } from 'components/dashboard/university-rooms/constants';
import {
  makeSelectOptions,
} from 'components/dashboard/cameras/camerasDashboardConstants';

export function useCamerasManagementDashboard(opts = {}) {
  const enableRoi = Boolean(opts.enableRoi);

  const [tab, setTab] = useState('active');
  const [query, setQuery] = useState('');
  const [addBuilding, setAddBuilding] = useState('');
  const [addRoom, setAddRoom] = useState('');
  const [addEdgeDevice, setAddEdgeDevice] = useState('');
  const [addUniversity, setAddUniversity] = useState('');
  const [optionsNonce, setOptionsNonce] = useState(0);

  const isActive = useMemo(() => listStatusToIsActive(tab), [tab]);
  const { debouncedSearch: debouncedQuery, page, setPage } = useListSearchAndPage(query, tab);

  const { data: camerasData, isLoading, isError, error, isFetching, refetch } = useCamerasQuery({
    page,
    pageSize: LIST_PAGE_SIZE,
    search: debouncedQuery,
    isActive,
  });

  const { totalPages, showPagination, paginationItems } = useListPagination(
    camerasData,
    'cameras',
    page,
    setPage,
  );

  const { data: universitiesData } = useUniversitiesQuery();

  const apiCameraRows = useMemo(
    () =>
      (camerasData?.cameras ?? []).map((camera) =>
        mapCameraFromApi(camera, { enableRoi }),
      ),
    [camerasData, enableRoi],
  );

  const {
    rows: cameraRows,
    patchRow,
    deleteRow,
    addRow,
  } = useLocalRowPatches(apiCameraRows);

  const bumpOptions = useCallback(() => setOptionsNonce((n) => n + 1), []);

  useEffect(() => {
    const unB = subscribeBuildings(bumpOptions);
    const unR = subscribeRooms(bumpOptions);
    return () => {
      unB?.();
      unR?.();
    };
  }, [bumpOptions]);

  useEdgeDevicesListSubscription(bumpOptions);

  const universityOptions = useMemo(() => {
    const rows = (universitiesData?.universities ?? []).map(mapUniversityFromApi);
    return makeSelectOptions({
      placeholder: 'Select University',
      rows,
      getValue: (r) => r.id,
      getLabel: (r) => r.name,
      filter: (r) => r?.active !== false,
    });
  }, [universitiesData]);

  const buildingOptions = useMemo(() => {
    void optionsNonce;
    return makeSelectOptions({
      placeholder: 'Select Building',
      rows: getBuildings(INITIAL_UNIVERSITY_BUILDINGS),
      getValue: (r) => r.id,
      getLabel: (r) => r.name,
      filter: (r) => r?.active !== false,
    });
  }, [optionsNonce]);

  const roomOptions = useMemo(() => {
    void optionsNonce;
    return makeSelectOptions({
      placeholder: 'Select Room',
      rows: getRooms(INITIAL_UNIVERSITY_ROOMS),
      getValue: (r) => r.id,
      getLabel: (r) => r.name,
      filter: (r) => r?.active !== false,
    });
  }, [optionsNonce]);

  const edgeDeviceOptions = useMemo(() => {
    void optionsNonce;
    return makeSelectOptions({
      placeholder: 'Select Room',
      rows: getMergedEdgeDeviceRows(),
      getValue: (r) => r.id,
      getLabel: (r) => r.title,
      filter: (r) => r?.active !== false,
    });
  }, [optionsNonce]);

  const resetAddForm = useCallback(() => {
    setAddBuilding('');
    setAddRoom('');
    setAddEdgeDevice('');
    setAddUniversity('');
  }, []);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [addCameraOpen, setAddCameraOpen] = useState(false);
  const [roiSettingsCameraId, setRoiSettingsCameraId] = useState(null);

  const confirmDelete = useCallback(() => {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    deleteRow(id);
    setDeleteTarget(null);
    setEditTarget((cur) => (cur?.id === id ? null : cur));
    if (enableRoi) setRoiSettingsCameraId((cur) => (cur === id ? null : cur));
  }, [deleteTarget, deleteRow, enableRoi]);

  const saveCameraFromForm = useCallback((id, payload) => {
    const name = (payload.cameraName || '').trim();
    const ip = (payload.ipCameras || '').trim();
    const stream = (payload.streamUrl || '').trim();
    const rtsp = (payload.rtspUrl || '').trim();
    const pwdIn = (payload.password || '').trim();
    const updates = {
      ipCameras: ip,
      userName: (payload.userName || '').trim(),
      rtspUrl: rtsp,
      streamUrl: stream,
      edgeDevice: stream || rtsp || ip,
    };
    if (name) updates.name = name;
    if (pwdIn) updates.password = pwdIn;
    patchRow(id, updates);
  }, [patchRow]);

  const confirmAddCamera = useCallback(
    (payload) => {
      const id = `cam-${Date.now()}`;
      const name = (payload.cameraName || '').trim() || 'New camera';
      const uniOpt = universityOptions.find((o) => o.value === addUniversity);
      const buildingOpt = buildingOptions.find((o) => o.value === addBuilding);
      const roomOpt = roomOptions.find((o) => o.value === addRoom);
      const edgeOpt = edgeDeviceOptions.find((o) => o.value === addEdgeDevice);
      const building = buildingOpt && buildingOpt.value ? buildingOpt.label : 'Building 1';
      const room = roomOpt && roomOpt.value ? roomOpt.label : '101';
      const ip = (payload.ipCameras || '').trim();
      const edgeDevice =
        (edgeOpt && edgeOpt.value ? edgeOpt.label : null) || ip || 'Raspberry Pi 5 - Main Hall';
      const row = {
        id,
        name,
        university: uniOpt && uniOpt.value ? uniOpt.label : 'University',
        building,
        room,
        edgeDevice,
        status: 'active',
        isNew: false,
        ipCameras: (payload.ipCameras || '').trim(),
        userName: (payload.userName || '').trim(),
        password: (payload.password || '').trim(),
        rtspUrl: (payload.rtspUrl || '').trim(),
        streamUrl: (payload.streamUrl || '').trim(),
      };
      if (enableRoi) Object.assign(row, { roiEnabled: true });
      addRow(row);
    },
    [
      addUniversity,
      addBuilding,
      addRoom,
      addEdgeDevice,
      universityOptions,
      buildingOptions,
      roomOptions,
      edgeDeviceOptions,
      enableRoi,
      addRow,
    ],
  );

  const toggleRoi = useCallback((id, next) => {
    if (!enableRoi) return;
    patchRow(id, { roiEnabled: next });
  }, [enableRoi, patchRow]);

  const toggleStatus = useCallback((id, next) => {
    patchRow(id, { status: next ? 'active' : 'inactive' });
  }, [patchRow]);

  const filtered = cameraRows;

  const base = {
    tab,
    setTab,
    query,
    setQuery,
    addBuilding,
    setAddBuilding,
    addRoom,
    setAddRoom,
    addEdgeDevice,
    setAddEdgeDevice,
    addUniversity,
    setAddUniversity,
    universityOptions,
    buildingOptions,
    roomOptions,
    edgeDeviceOptions,
    resetAddForm,
    cameraRows,
    deleteTarget,
    setDeleteTarget,
    editTarget,
    setEditTarget,
    addCameraOpen,
    setAddCameraOpen,
    confirmDelete,
    saveCameraFromForm,
    confirmAddCamera,
    filtered,
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

  if (enableRoi) {
    return {
      ...base,
      roiSettingsCameraId,
      setRoiSettingsCameraId,
      toggleRoi,
      toggleStatus,
    };
  }

  return base;
}
