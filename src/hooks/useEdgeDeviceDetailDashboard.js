import { useCallback, useEffect, useMemo, useState } from 'react';

/** Edge device detail: power toggle, cameras list/tab, toast, change-history drawer. */
export function useEdgeDeviceDetailDashboard(detail) {
  const [deviceOn, setDeviceOn] = useState(detail.deviceOn);
  const [cameras, setCameras] = useState(() => detail.cameras.items.map((c) => ({ ...c })));
  const [camerasOpen, setCamerasOpen] = useState(true);
  const [camTab, setCamTab] = useState('active');
  const [toast, setToast] = useState(null);
  const [changeHistoryOpen, setChangeHistoryOpen] = useState(false);

  useEffect(() => {
    setDeviceOn(detail.deviceOn);
    setCameras(detail.cameras.items.map((c) => ({ ...c })));
  }, [detail]);

  const activeCamCount = useMemo(() => cameras.filter((c) => c.active).length, [cameras]);
  const inactiveCamCount = useMemo(() => cameras.filter((c) => !c.active).length, [cameras]);

  const onMetricMore = useCallback((label) => {
    setToast(`${label}: actions`);
  }, []);

  const onFieldAction = useCallback((action) => {
    setToast(action);
  }, []);

  const onFieldValueClick = useCallback((label, value) => {
    setToast(`Edit «${label}»: ${value}`);
  }, []);

  const onCameraTagClick = useCallback((cameraId, tagLabel) => {
    setToast(`${tagLabel} — camera ${cameraId}`);
  }, []);

  const toggleCamera = useCallback((id) => {
    setCameras((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  }, []);

  const removeCamera = useCallback((id) => {
    setCameras((prev) => prev.filter((c) => c.id !== id));
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  const visibleCameras = useMemo(() => {
    if (camTab === 'active') return cameras.filter((c) => c.active);
    return cameras.filter((c) => !c.active);
  }, [cameras, camTab]);

  return {
    deviceOn,
    setDeviceOn,
    camerasOpen,
    setCamerasOpen,
    camTab,
    setCamTab,
    toast,
    setToast,
    changeHistoryOpen,
    setChangeHistoryOpen,
    activeCamCount,
    inactiveCamCount,
    visibleCameras,
    onMetricMore,
    onFieldAction,
    onFieldValueClick,
    onCameraTagClick,
    toggleCamera,
    removeCamera,
  };
}
