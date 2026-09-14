/** List seed — same ids used by list + detail pages. */
export const EDGE_DEVICE_LIST_SEED = [
  {
    id: '1',
    title: 'Raspberry Pi 5 - Main Hall',
    quotaUsed: 23,
    quotaTotal: 25,
    tagId: '1:6.6.62-1+rpt1',
    active: true,
  },
  {
    id: '2',
    title: 'Raspberry Pi 5 - Corridors',
    quotaUsed: 23,
    quotaTotal: 25,
    tagId: '1:6.6.62-1+rpt1',
    active: true,
  },
  {
    id: '3',
    title: 'Raspberry Pi 5 - Street',
    quotaUsed: 23,
    quotaTotal: 25,
    tagId: '1:6.6.62-1+rpt1',
    active: true,
  },
  {
    id: '4',
    title: 'Raspberry Pi 5 - Basement',
    quotaUsed: 23,
    quotaTotal: 25,
    tagId: '1:6.6.62-1+rpt1',
    active: true,
  },
];

export function getEdgeDeviceListItemById(deviceId) {
  return EDGE_DEVICE_LIST_SEED.find((d) => d.id === String(deviceId)) ?? null;
}
