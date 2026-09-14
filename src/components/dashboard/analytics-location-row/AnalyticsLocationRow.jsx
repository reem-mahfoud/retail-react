import { useState } from 'react';
import {
  CameraRowIcon,
  BranchRowIcon,
  OrgRowIcon,
  DeviceRowIcon,
  RoiRowIcon,
  PencilRowIcon,
  TrashRowIcon,
} from './LocationRowIcons';
import {
  RowDivider,
  LocationField,
  RowToggle,
  dashboardListRowIconButtonClass,
  roiPillClass,
} from './LocationRowUi';
import {
  cameraIconSlotClass,
  locationClusterClass,
  rowActionsClass,
  rowGridClass,
  rowShellClass,
} from './constants';

export default function AnalyticsLocationRow({
  locationLabel = 'At the entrance',
  branchLabel = 'Branch address',
  orgLabel = 'Organization',
  deviceLabel = 'Raspberry Pi 5 - Main Hall',
  onEdit,
  onDelete,
}) {
  const [roiOn, setRoiOn] = useState(false);
  const [mainOn, setMainOn] = useState(true);

  return (
    <div className={rowShellClass} dir="ltr">
      <div className={rowGridClass}>
        <div className={locationClusterClass}>
          <span className={cameraIconSlotClass}>
            <CameraRowIcon />
          </span>
          <RowDivider />
          <span
            className="min-w-0 truncate text-xs font-normal leading-5 text-[#344054]"
            title={locationLabel}
          >
            {locationLabel}
          </span>
        </div>

        <LocationField
          icon={BranchRowIcon}
          text={branchLabel}
          colorClass="text-[#717680]"
        />
        <LocationField icon={OrgRowIcon} text={orgLabel} colorClass="text-[#717680]" />
        <LocationField
          icon={DeviceRowIcon}
          text={deviceLabel}
          colorClass="text-[#535862]"
        />

        <div className={`${roiPillClass} shrink-0`}>
          <span className="inline-flex h-full w-[18px] shrink-0 items-center justify-center">
            <RoiRowIcon />
          </span>
          <span className="shrink-0 text-xs font-normal leading-5 text-[#414651]">ROI</span>
          <RowToggle checked={roiOn} onChange={setRoiOn} ariaLabel="Toggle ROI" />
        </div>

        <div className={rowActionsClass}>
          <button
            type="button"
            className={dashboardListRowIconButtonClass}
            aria-label="Edit"
            onClick={() => onEdit?.()}
          >
            <PencilRowIcon />
          </button>
          <button
            type="button"
            className={dashboardListRowIconButtonClass}
            aria-label="Delete"
            onClick={() => onDelete?.()}
          >
            <TrashRowIcon />
          </button>
          <RowToggle
            checked={mainOn}
            onChange={setMainOn}
            ariaLabel="Toggle row active"
          />
        </div>
      </div>
    </div>
  );
}
