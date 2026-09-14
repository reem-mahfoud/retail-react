/** Stroke colors from design asset (1538×72). */
export const STROKE = {
  camera: '#717680',
  branchOrg: '#717680',
  device: '#414651',
  roi: '#414651',
  action: '#A4A7AE',
};

export const STROKE_WIDE = 1.66667;
export const STROKE_ACTION = 1.5;

export const rowShellClass =
  'group box-border h-[56px] min-h-[56px] w-full min-w-0 overflow-hidden rounded-xl bg-white px-4 shadow-[0px_2px_8px_rgba(16,24,40,0.05),inset_0px_0px_0px_1px_rgba(233,234,235,0.72)] sm:px-5';

/** Single-line grid — fields truncate instead of wrapping or scrolling. */
export const rowGridClass =
  'grid h-full w-full min-w-0 grid-cols-[minmax(0,1.05fr)_minmax(0,0.7fr)_minmax(0,0.7fr)_minmax(0,0.82fr)_auto_auto] items-center gap-x-2';

/** Camera list — name, building, room, actions. */
export const cameraRowGridClass =
  'grid h-full w-full min-w-0 grid-cols-[minmax(0,1.1fr)_minmax(0,0.65fr)_minmax(0,0.65fr)_auto] items-center gap-x-2';

/** Cradle admin cameras — adds ROI + status column before actions. */
export const cameraRowGridWithRoiClass =
  'grid h-full w-full min-w-0 grid-cols-[minmax(0,0.95fr)_minmax(0,0.5fr)_minmax(0,0.5fr)_auto_auto] items-center gap-x-2';

export const locationClusterClass = 'flex min-w-0 items-center gap-2 overflow-hidden sm:gap-3';

export const iconSlotClass = 'inline-flex h-8 w-[18px] shrink-0 items-center justify-center';
export const cameraIconSlotClass = 'inline-flex h-8 w-6 shrink-0 items-center justify-center';

export const rowActionsClass = 'flex h-8 shrink-0 items-center gap-0.5';
