import { getEdgeDeviceListItemById } from './edgeDevicesSeed';
import { getMergedEdgeDeviceRows } from 'lib/edgeDevicesStorage';

/**
 * Shape mirrors what a future GET /edge-devices/:id might return.
 * Replace `getEdgeDeviceDetailForId` with a fetch + this mapper on the client.
 */
export function getEdgeDeviceDetailForId(deviceId) {
  const listItem =
    getEdgeDeviceListItemById(deviceId) ??
    getMergedEdgeDeviceRows().find((d) => String(d?.id) === String(deviceId)) ??
    null;
  if (!listItem) return null;

  const title = listItem.title;

  return {
    id: listItem.id,
    title,
    subtitle: 'Edge device management page',
    headerDateLabel: '01/13/2025',
    headerTimeLabel: 'Now',
    deviceOn: listItem.active,
    cpu: { usagePct: 58, label: 'CPU usage' },
    disk: { usagePct: 35, usedGb: 10.9, totalGb: 30, label: 'Disk usage' },
    temperatures: {
      label: 'Temperatures',
      rows: [
        { key: 'cpu', label: 'CPU', celsius: 83.8, variant: 'hot' },
        { key: 'rp1', label: 'RP1', celsius: 46.8, variant: 'ok' },
      ],
    },
    network: {
      label: 'Network',
      status: 'Active',
      activeTime: '11:21:59:86',
      sent: '39 MB',
      received: '1.17 GB',
    },
    ram: {
      usagePct: 26,
      usedGb: 1.1,
      totalGb: 4,
      segments: [
        { label: '1', pct: 51 },
        { label: '2', pct: 19 },
        { label: '3', pct: 21 },
        { label: '4', pct: 8 },
      ],
    },
    deviceInfo: {
      title: 'Device information',
      fields: [
        [
          { label: 'Device name', value: 'Olivia' },
          { label: 'Host name', value: 'Rhye' },
        ],
        [
          { label: 'Device type', value: 'Female' },
          { label: 'Assigned building', value: 'Rhye' },
        ],
        [
          { label: 'Description', value: '04/03/1998' },
          { label: 'Active state period', value: '08:40 - 20:00', action: 'Change' },
        ],
        [
          { label: 'IP address', value: 'Olivia' },
          { label: 'MAC address', value: 'Female' },
        ],
        [
          { label: 'CPU architecture', value: 'Olivia' },
          { label: 'OS', value: 'Linux' },
        ],
        [
          { label: 'GPU specifications', value: 'Female' },
          { label: 'Version', value: listItem.tagId, action: 'Update' },
        ],
        [{ label: 'Memory', value: 'Rhye' }, { label: 'Storage', value: '04/03/1998' }],
      ],
    },
    gpu: {
      title: 'GPU usage',
      cards: [
        {
          id: 'v100',
          name: 'NVIDIA Tesla V100',
          usagePct: 54,
          vramUsedMb: 1024,
          vramTotalMb: 3072,
          tempC: 83.8,
          tempVariant: 'hot',
        },
        {
          id: '1050',
          name: 'NVIDIA GeForce GTX 1050 Ti',
          usagePct: 54,
          vramUsedMb: 1024,
          vramTotalMb: 3072,
          tempC: 46.8,
          tempVariant: 'ok',
        },
      ],
    },
    cameras: {
      title: 'Attached cameras',
      badge: { active: 6, total: 7 },
      items: [
        { id: 'c1', name: 'At the Entrance', active: true },
        { id: 'c2', name: 'View on Board', active: true },
        { id: 'c3', name: 'At the Entrance', active: true },
        { id: 'c4', name: 'View on Board', active: true },
        { id: 'c5', name: 'At the Entrance', active: true },
        { id: 'c6', name: 'View on Board', active: true },
        { id: 'c7', name: 'Back office', active: false },
      ],
    },
    changeHistory: {
      description: 'Lorem ipsum dolor sit amet.',
      groups: [
        {
          dateLabel: '12/16/2024',
          userName: 'Feruz Jalilov Zoyirovich',
          events: [{ text: "Camera activation 'At the entrance'", time: '11:58' }],
        },
        {
          dateLabel: '12/15/2024',
          userName: 'Feruz Jalilov Zoyirovich',
          events: [
            { text: "Change 'Host Name'", time: '11:58' },
            { text: "Change 'IP Address'", time: '11:58' },
            { text: "Change 'MAC Address'", time: '11:58' },
          ],
        },
        {
          dateLabel: '12/05/2024',
          userName: 'Feruz Jalilov Zoyirovich',
          events: [{ text: 'Device activation', time: '11:58' }],
        },
      ],
    },
  };
}
