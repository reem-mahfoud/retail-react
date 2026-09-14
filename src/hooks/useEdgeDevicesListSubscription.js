import { useEffect } from 'react';
import { subscribeEdgeDevicesList } from 'lib/edgeDevicesStorage';

/** Re-runs `onChange` when the merged edge-device list changes (custom event or storage). */
export function useEdgeDevicesListSubscription(onChange) {
  useEffect(() => subscribeEdgeDevicesList(onChange), [onChange]);
}
