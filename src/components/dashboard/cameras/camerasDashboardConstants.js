/** Build sorted `{ value, label }[]` options for camera add-form selects. */
export function makeSelectOptions({ placeholder, rows, getValue, getLabel, filter }) {
  const base = [{ value: '', label: placeholder }];
  const seen = new Set();
  const next = [];

  for (const r of rows) {
    if (filter && !filter(r)) continue;
    const value = String(getValue(r) ?? '').trim();
    const label = String(getLabel(r) ?? '').trim();
    if (!value || !label) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    next.push({ value, label });
  }

  next.sort((a, b) => a.label.localeCompare(b.label));
  return base.concat(next);
}

export const selectBaseClass =
  'h-10 w-full min-w-0 cursor-pointer appearance-none truncate rounded-xl border border-[#D0D5DD] bg-white py-2 pl-3.5 pr-10 text-sm font-medium shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none transition hover:border-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15';

export const tabWrap =
  'inline-flex h-9 w-fit items-center rounded-full border border-[#E9EAEB] bg-[#FAFAFA] p-1';

export const tabBtnBase = 'h-7 rounded-full px-4 text-xs font-semibold leading-none transition';

export function emptyCameraDetails() {
  return {
    ipCameras: '',
    userName: '',
    password: '',
    rtspUrl: '',
    streamUrl: '',
  };
}

export const INITIAL_CAMERA_ROWS_RETAIL = [
  {
    id: 'cam-1',
    name: 'At the Entrance',
    building: 'Building No. 1',
    room: '101',
    edgeDevice: 'Raspberry Pi 5 - Main Hall',
    status: 'active',
    isNew: false,
    ...emptyCameraDetails(),
  },
  {
    id: 'cam-2',
    name: 'At the Entrance',
    building: 'Building No. 1',
    room: '101',
    edgeDevice: 'Raspberry Pi 5 - Main Hall',
    status: 'active',
    isNew: false,
    ...emptyCameraDetails(),
  },
  {
    id: 'cam-3',
    name: 'At the Entrance',
    building: 'Building No. 1',
    room: '101',
    edgeDevice: 'Raspberry Pi 5 - Main Hall',
    status: 'active',
    isNew: true,
    ...emptyCameraDetails(),
  },
];

export const INITIAL_CAMERA_ROWS_CRADLE = [
  {
    id: 'cam-1',
    name: 'At the Entrance',
    building: 'Building No. 1',
    room: '101',
    edgeDevice: 'Raspberry Pi 5 - Main Hall',
    status: 'active',
    isNew: false,
    roiEnabled: true,
    ...emptyCameraDetails(),
  },
  {
    id: 'cam-2',
    name: 'At the Entrance',
    building: 'Building No. 1',
    room: '101',
    edgeDevice: 'Raspberry Pi 5 - Main Hall',
    status: 'active',
    isNew: false,
    roiEnabled: false,
    ...emptyCameraDetails(),
  },
  {
    id: 'cam-3',
    name: 'At the Entrance',
    building: 'Building No. 1',
    room: '101',
    edgeDevice: 'Raspberry Pi 5 - Main Hall',
    status: 'active',
    isNew: true,
    roiEnabled: true,
    ...emptyCameraDetails(),
  },
];

export function rowToForm(row) {
  return {
    cameraName: row.name ?? '',
    ipCameras: row.ipCameras ?? '',
    userName: row.userName ?? '',
    password: row.password ?? '',
    rtspUrl: row.rtspUrl ?? '',
    streamUrl: row.streamUrl ?? '',
  };
}
