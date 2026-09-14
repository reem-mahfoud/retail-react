import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Plus, Search } from 'lucide-react';
import FilterLinesIcon from 'components/icons/FilterLinesIcon';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import ConfirmDeleteEntityDialog from 'components/dashboard/ConfirmDeleteEntityDialog';
import AddCameraDialog from 'components/dashboard/cameras/AddCameraDialog';
import CameraFormDialog from 'components/dashboard/cameras/CameraFormDialog';
import RoiSettingsDialog from 'components/dashboard/cameras/RoiSettingsDialog';
import {
  rowToForm,
  selectBaseClass,
  tabBtnBase,
  tabWrap,
} from 'components/dashboard/cameras/camerasDashboardConstants';
import CameraManagementRow from 'components/dashboard/cameras/CameraManagementRow';
import ListQueryPanel from 'components/dashboard/ListQueryPanel';
import ListEmptyState from 'components/dashboard/ListEmptyState';
import { useCamerasManagementDashboard } from 'hooks/useCamerasManagementDashboard';

function LabeledSelect({ id, label, tooltip, value, onChange, options }) {
  const hasValue = value !== '' && value != null;
  return (
    <div className="min-w-0">
      <div className="mb-1.5 flex min-w-0 flex-nowrap items-center gap-1">
        <label htmlFor={id} className="min-w-0 truncate text-xs font-medium text-[#667085]">
          {label}
        </label>
        <span className="text-sm font-semibold leading-none text-[#7F56D9]" aria-hidden>
          *
        </span>
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#E9EAEB] bg-white text-[10px] font-semibold text-[#98A2B3]">
          ?
        </span>
      </div>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${selectBaseClass} ${hasValue ? 'text-[#101828]' : 'text-[#667085]'}`}
        >
          {options.map((opt) => (
            <option key={opt.value === '' ? `empty-${id}` : opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
          strokeWidth={2}
          aria-hidden
        />
      </div>
    </div>
  );
}

export default function CradleCamerasManagementMain() {
  const {
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
    roiSettingsCameraId,
    setRoiSettingsCameraId,
    toggleRoi,
    toggleStatus,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useCamerasManagementDashboard({ enableRoi: true });

  return (
    <div className="min-h-full w-full bg-[#FAFAFA] pb-12 pt-2 text-[#101828] sm:pt-4">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <nav className="mb-5 flex flex-wrap items-center gap-2" aria-label="Breadcrumb">
          <Link
            to="/dashboard"
            className="inline-flex rounded-lg p-1 text-[#667085] transition hover:bg-[#EAECF0] hover:text-[#414651] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/30"
            aria-label="Home"
          >
            <HomeOutlineIcon className="h-5 w-5" stroke="#717680" aria-hidden />
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#D5D7DA]" strokeWidth={2} aria-hidden />
          <span className="rounded-full border border-[#EAECF0] bg-white px-3 py-1.5 text-sm font-semibold text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
            Camera Management
          </span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">Camera Management</h1>
          <p className="mt-2 max-w-xl text-base text-[#535862] sm:text-lg">
            Camera creation and management page.
          </p>
        </div>

        {/* Added Cameras */}
        <div className="rounded-[20px] border border-[#EAECF0] bg-white px-5 py-6 text-[#101828] shadow-[0px_4px_24px_-4px_rgba(16,24,40,0.08),0px_2px_8px_-2px_rgba(16,24,40,0.06)] sm:px-8 sm:py-8">
          <h2 className="text-base font-semibold text-[#101828]">Added Cameras</h2>

          <div className="mt-5 flex w-full min-w-0 flex-nowrap gap-4">
            <div className="min-w-0 flex-1 basis-0">
              <LabeledSelect
                id="add-camera-university"
                label="University"
                tooltip="Select a university"
                value={addUniversity}
                onChange={setAddUniversity}
                options={universityOptions}
              />
            </div>
            <div className="min-w-0 flex-1 basis-0">
              <LabeledSelect
                id="add-camera-building"
                label="Building"
                tooltip="Select a building"
                value={addBuilding}
                onChange={setAddBuilding}
                options={buildingOptions}
              />
            </div>
            <div className="min-w-0 flex-1 basis-0">
              <LabeledSelect
                id="add-camera-room"
                label="Room"
                tooltip="Select a room"
                value={addRoom}
                onChange={setAddRoom}
                options={roomOptions}
              />
            </div>
            <div className="min-w-0 flex-1 basis-0">
              <LabeledSelect
                id="add-camera-edge-device"
                label="Edge Device"
                tooltip="Select an edge device"
                value={addEdgeDevice}
                onChange={setAddEdgeDevice}
                options={edgeDeviceOptions}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={resetAddForm}
              className="h-10 rounded-full border border-[#D0D5DD] bg-white px-5 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB]"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setAddCameraOpen(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#6941C6] bg-[#7F56D9] px-5 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6]"
            >
              <Plus className="h-5 w-5" strokeWidth={2.25} aria-hidden />
              Add Camera
            </button>
          </div>
        </div>

        {/* List */}
        <div className="mt-6 rounded-[28px] border border-[#EAECF0] bg-white px-5 py-6 text-[#101828] shadow-[0px_4px_24px_-4px_rgba(16,24,40,0.08),0px_2px_8px_-2px_rgba(16,24,40,0.06)] sm:px-8 sm:py-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className={tabWrap} role="tablist" aria-label="Camera list tabs">
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'active'}
                onClick={() => setTab('active')}
                className={`${tabBtnBase} ${
                  tab === 'active'
                    ? 'bg-white text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'
                    : 'text-[#667085] hover:text-[#414651]'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === 'inactive'}
                onClick={() => setTab('inactive')}
                className={`${tabBtnBase} ${
                  tab === 'inactive'
                    ? 'bg-white text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'
                    : 'text-[#667085] hover:text-[#414651]'
                }`}
              >
                Inactive
              </button>
            </div>

            <div className="flex w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end md:w-auto md:flex-nowrap md:gap-2">
              <button
                type="button"
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-[#D5D7DA] bg-white px-4 text-sm font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB]"
              >
                <FilterLinesIcon className="h-4 w-4 text-[#0A0D12]" aria-hidden />
                Filter
              </button>
              <div className="relative min-h-10 min-w-0 flex-1 sm:min-w-[260px] md:max-w-[420px]">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A2B3]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="h-10 w-full rounded-full border border-[#D5D7DA] bg-white py-2 pl-10 pr-3.5 text-sm text-[#101828] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
                  aria-label="Search cameras"
                />
              </div>
            </div>
          </div>

          <ListQueryPanel
            className="mt-4 flex flex-col gap-3 overflow-x-hidden"
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            onRetry={refetch}
            isEmpty={filtered.length === 0}
            emptyState={
              <ListEmptyState variant="compact" className="mt-6">
                No cameras match the current filters.
              </ListEmptyState>
            }
            showPagination={showPagination}
            page={page}
            totalPages={totalPages}
            paginationItems={paginationItems}
            onPageChange={setPage}
          >
            {filtered.map((r) => (
              <CameraManagementRow
                key={r.id}
                row={r}
                enableRoi
                onEdit={() => setEditTarget(r)}
                onDelete={() => setDeleteTarget({ id: r.id, name: r.name })}
                onToggleRoi={(v) => toggleRoi(r.id, v)}
                onToggleStatus={(v) => toggleStatus(r.id, v)}
                onOpenRoiSettings={() => setRoiSettingsCameraId(r.id)}
              />
            ))}
          </ListQueryPanel>
        </div>
      </div>

      <ConfirmDeleteEntityDialog
        open={Boolean(deleteTarget)}
        title="Delete camera"
        entityName={deleteTarget?.name ?? ''}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
      {editTarget ? (
        <CameraFormDialog
          key={editTarget.id}
          open
          title="Edit Camera"
          primaryLabel="Save"
          defaultValues={rowToForm(editTarget)}
          formPrefix={`edit-camera-${editTarget.id}`}
          titleId={`edit-camera-title-${editTarget.id}`}
          descId={`edit-camera-desc-${editTarget.id}`}
          onClose={() => setEditTarget(null)}
          onConfirm={(form) => saveCameraFromForm(editTarget.id, form)}
        />
      ) : null}
      <AddCameraDialog open={addCameraOpen} onClose={() => setAddCameraOpen(false)} onConfirm={confirmAddCamera} />

      <RoiSettingsDialog
        open={Boolean(roiSettingsCameraId)}
        cameraLabel={cameraRows.find((c) => c.id === roiSettingsCameraId)?.name ?? ''}
        onCancel={() => setRoiSettingsCameraId(null)}
        onSave={() => setRoiSettingsCameraId(null)}
      />
    </div>
  );
}

