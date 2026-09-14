import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import EdgeDeviceDetailMain from './EdgeDeviceDetailMain';
import { getEdgeDeviceDetailForId } from './edgeDeviceDetailModel';

export default function EdgeDeviceDetailRoute() {
  const { deviceId } = useParams();
  const detail = useMemo(() => getEdgeDeviceDetailForId(deviceId), [deviceId]);

  if (!detail) {
    return <Navigate to="/dashboard/edge-devices" replace />;
  }

  return <EdgeDeviceDetailMain detail={detail} />;
}
