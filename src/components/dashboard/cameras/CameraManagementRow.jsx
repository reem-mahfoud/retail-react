import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import { BranchFieldIcon } from 'components/dashboard/cameras/CameraRowFieldIcons';
import {
  CameraRowIcon,
  PencilRowIcon,
  TrashRowIcon,
} from 'components/dashboard/analytics-location-row/LocationRowIcons';
import {
  RowDivider,
  LocationField,
  RowToggle,
  dashboardListRowHoverClass,
  dashboardListRowIconButtonClass,
  roiPillClass,
} from 'components/dashboard/analytics-location-row/LocationRowUi';
import {
  cameraIconSlotClass,
  cameraRowGridClass,
  cameraRowGridWithRoiClass,
  locationClusterClass,
  rowActionsClass,
  rowShellClass,
} from 'components/dashboard/analytics-location-row/constants';

function RoomFieldIcon({ className = 'h-[18px] w-[18px] shrink-0' }) {
  return <HomeOutlineIcon className={className} stroke="#717680" aria-hidden />;
}

function BranchMetaIcon({ className = 'h-[18px] w-[18px] shrink-0' }) {
  return <BranchFieldIcon className={className} aria-hidden />;
}

/**
 * Camera list row — same single-line layout as Analytics location rows.
 */
export default function CameraManagementRow({
  row,
  onEdit,
  onDelete,
  onToggleRoi,
  onToggleStatus,
  onOpenRoiSettings,
  enableRoi = false,
}) {
  const gridClass = enableRoi ? cameraRowGridWithRoiClass : cameraRowGridClass;

  return (
    <div className={`${rowShellClass} ${dashboardListRowHoverClass}`} dir="ltr">
      <div className={gridClass}>
        <div className={locationClusterClass}>
          <span className={cameraIconSlotClass}>
            <CameraRowIcon />
          </span>
          <RowDivider />
          <span
            className="min-w-0 truncate text-xs font-semibold leading-5 text-[#344054] sm:text-sm sm:text-[#101828]"
            title={row.name}
          >
            {row.name}
          </span>
        </div>

        <LocationField
          icon={BranchMetaIcon}
          text={row.building || '—'}
          colorClass="text-[#717680]"
        />
        <LocationField icon={RoomFieldIcon} text={row.room || '—'} colorClass="text-[#717680]" />

        {enableRoi ? (
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={onOpenRoiSettings} className={roiPillClass}>
              <span className="shrink-0 text-xs font-semibold text-[#414651]">ROI</span>
              <RowToggle
                checked={Boolean(row.roiEnabled)}
                onChange={onToggleRoi}
                ariaLabel={`ROI ${row.name}`}
              />
            </button>
            <div className={roiPillClass}>
              <span className="shrink-0 text-xs font-semibold text-[#414651]">Status</span>
              <RowToggle
                checked={row.status === 'active'}
                onChange={onToggleStatus}
                ariaLabel={`Status ${row.name}`}
              />
            </div>
          </div>
        ) : null}

        <div className={rowActionsClass}>
          <button
            type="button"
            onClick={onEdit}
            className={dashboardListRowIconButtonClass}
            aria-label={`Edit ${row.name}`}
          >
            <PencilRowIcon />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className={dashboardListRowIconButtonClass}
            aria-label={`Delete ${row.name}`}
          >
            <TrashRowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
