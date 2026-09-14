import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, CircleHelp } from 'lucide-react';
import ConnectionTestDialog from 'components/dashboard/ConnectionTestDialog';
import ActivePeriodDialog from 'components/dashboard/ActivePeriodDialog';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import { useAddEdgeDeviceDashboard } from 'hooks/useAddEdgeDeviceDashboard';

/** Required asterisk — same purple as section titles across the page. */
const REQ_STAR_CLASS = 'font-semibold text-[#7F56D9]';

const req = (text) => (
  <>
    {text}
    <span className={`ml-0.5 ${REQ_STAR_CLASS}`} aria-hidden>
      *
    </span>
  </>
);

/** Pill-shaped fields — matches Basic information reference. */
const inputPillCls =
  'w-full rounded-full border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none transition placeholder:text-[#667085] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/20';

const textareaDescriptionCls =
  'w-full min-h-[168px] resize-y rounded-2xl border border-[#D0D5DD] bg-white px-4 py-3.5 text-sm leading-relaxed text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#98A2B3] focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/20';

/** Form field labels — muted slate (all sections). */
const labelBasicCls =
  'mb-2 block text-sm font-medium leading-5 text-[#51525C]';

const sectionCard =
  'min-w-0 rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_-1px_rgba(0,0,0,0.06)] sm:p-8';

/** ~25% / ~75% split on large screens (matches reference). */
const sectionGrid = 'grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:items-start lg:gap-x-10';

function SectionHeading({ title, description, showHelp = true, sectionRequired = false }) {
  return (
    <div className="min-w-0 lg:max-w-[260px]">
      <div className="flex flex-wrap items-start gap-x-1.5 gap-y-1">
        <h2 className="text-lg font-semibold leading-7 text-[#101828]">
          {title}
          {sectionRequired ? (
            <span className={`ml-0.5 ${REQ_STAR_CLASS}`} aria-hidden>
              *
            </span>
          ) : null}
        </h2>
        {showHelp ? (
          <button
            type="button"
            className="mt-0.5 shrink-0 rounded-full p-0.5 text-[#98A2B3] transition hover:bg-[#F2F4F7] hover:text-[#667085] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
            aria-label={`Help: ${title}`}
          >
            <CircleHelp className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
          </button>
        ) : null}
      </div>
      {description ? (
        <p className="mt-2 text-sm font-normal leading-6 text-[#667085]">{description}</p>
      ) : null}
    </div>
  );
}

function FormRow2({ children }) {
  return <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">{children}</div>;
}

function SelectWithChevron({ id, value, onChange, options, fieldClassName = inputPillCls }) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`${fieldClassName} appearance-none pr-10`}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]"
        strokeWidth={2}
        aria-hidden
      />
    </div>
  );
}

const DROPDOWN_OPTIONS = ['Student', 'Teacher', 'Staff', 'Visitor'];

/**
 * Add edge device — full form beside sidebar; matches product reference layout.
 */
export default function AddEdgeDeviceMain() {
  const {
    fileInputRef,
    testDialog,
    closeTestDialog,
    deviceName,
    setDeviceName,
    deviceType,
    setDeviceType,
    assignedBuilding,
    setAssignedBuilding,
    activeFrom,
    setActiveFrom,
    activeTo,
    setActiveTo,
    description,
    setDescription,
    activePeriodOpen,
    setActivePeriodOpen,
    ipAddress,
    setIpAddress,
    macAddress,
    setMacAddress,
    cpuArchitecture,
    setCpuArchitecture,
    gpuSpecifications,
    setGpuSpecifications,
    memory,
    setMemory,
    storage,
    setStorage,
    registrationToken,
    setRegistrationToken,
    certificateFile,
    dropActive,
    setDropActive,
    onCertificateFiles,
    onDrop,
    handleTest,
    handleSave,
    navigate,
  } = useAddEdgeDeviceDashboard();

  return (
    <div className="min-h-full w-full min-w-0 bg-[#FAFAFA] pb-12 pt-4 text-[#101828] sm:pt-6">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm" aria-label="Breadcrumb">
          <Link
            to="/dashboard"
            className="inline-flex rounded-lg p-1.5 text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#101828]"
            aria-label="Home"
          >
            <HomeOutlineIcon className="h-5 w-5" stroke="#717680" aria-hidden />
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#D0D5DD]" strokeWidth={2} aria-hidden />
          <Link
            to="/dashboard/edge-devices"
            className="rounded-full px-2 py-1 font-semibold text-[#667085] transition hover:bg-[#F2F4F7] hover:text-[#101828]"
          >
            Edge devices
          </Link>
          <ChevronRight className="h-4 w-4 shrink-0 text-[#D0D5DD]" strokeWidth={2} aria-hidden />
          <span className="rounded-full border border-[#EAECF0] bg-white px-3 py-1.5 text-sm font-semibold text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
            Add edge device
          </span>
        </nav>

        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">Add edge device</h1>
          <p className="mt-2 max-w-2xl text-base text-[#667085] sm:text-lg">
            This page serves as an interface for adding a new device to the system.
          </p>
        </header>

        <div className="flex flex-col gap-14 lg:gap-16">
          {/* Basic information */}
          <section className={sectionGrid}>
            <SectionHeading
              title="Basic information"
              description="Enter the basic information about the device"
              sectionRequired
            />
            <div className={sectionCard}>
              
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8">
                <div className="min-w-0">
                  <label htmlFor="add-device-name" className={labelBasicCls}>
                    {req('Device name')}
                  </label>
                  <input
                    id="add-device-name"
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    className={inputPillCls}
                    autoComplete="off"
                  />
                </div>
                <div className="min-w-0">
                  <label htmlFor="add-device-type" className={labelBasicCls}>
                    {req('Device type')}
                  </label>
                  <SelectWithChevron
                    id="add-device-type"
                    value={deviceType}
                    onChange={(e) => setDeviceType(e.target.value)}
                    options={DROPDOWN_OPTIONS}
                  />
                </div>
                <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                  <label htmlFor="add-assigned-building" className={labelBasicCls}>
                    Assigned building
                  </label>
                  <SelectWithChevron
                    id="add-assigned-building"
                    value={assignedBuilding}
                    onChange={(e) => setAssignedBuilding(e.target.value)}
                    options={DROPDOWN_OPTIONS}
                  />
                </div>

                <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      className={`${labelBasicCls} rounded-md text-left outline-none transition hover:text-[#344054] focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25`}
                      onClick={() => setActivePeriodOpen(true)}
                      aria-label="Edit active period"
                    >
                      {req('Active period')}
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="00:00"
                      value={activeFrom}
                      readOnly
                      onClick={() => setActivePeriodOpen(true)}
                      className={`${inputPillCls} w-[6.75rem] shrink-0 cursor-pointer text-center font-semibold tabular-nums text-[#101828] sm:w-[7.25rem]`}
                      aria-label="Active period start (HH:MM)"
                    />
                    <span
                      className="select-none px-0.5 text-sm font-medium text-[#98A2B3]"
                      aria-hidden
                    >
                      -
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="23:59"
                      value={activeTo}
                      readOnly
                      onClick={() => setActivePeriodOpen(true)}
                      className={`${inputPillCls} w-[6.75rem] shrink-0 cursor-pointer text-center font-semibold tabular-nums text-[#101828] sm:w-[7.25rem]`}
                      aria-label="Active period end (HH:MM)"
                    />
                  </div>
                </div>
                <div className="min-w-0 sm:col-span-2 lg:col-span-2">
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    <label htmlFor="add-description" className="text-sm font-medium leading-5 text-[#51525C]">
                      Description
                    </label>
                    <button
                      type="button"
                      className="shrink-0 rounded-full p-0.5 text-[#98A2B3] transition hover:bg-[#F2F4F7] hover:text-[#667085] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
                      aria-label="Help: Description"
                    >
                      <CircleHelp className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                    </button>
                  </div>
                  <textarea
                    id="add-description"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a description..."
                    className={textareaDescriptionCls}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Network data */}
          <section className={sectionGrid}>
            <SectionHeading
              title="Network data"
              description="Enter the device's IP address and MAC address"
              sectionRequired
            />
            <div className={sectionCard}>
              <FormRow2>
                <div>
                  <label htmlFor="add-ip" className={labelBasicCls}>
                    {req('IP address')}
                  </label>
                  <input
                    id="add-ip"
                    type="text"
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className={inputPillCls}
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="add-mac" className={labelBasicCls}>
                    {req('MAC address')}
                  </label>
                  <input
                    id="add-mac"
                    type="text"
                    value={macAddress}
                    onChange={(e) => setMacAddress(e.target.value)}
                    className={inputPillCls}
                    autoComplete="off"
                  />
                </div>
              </FormRow2>
            </div>
          </section>

          {/* Hardware specifications — row1: CPU | GPU | Memory; row2: Storage (first column width) */}
          <section className={sectionGrid}>
            <SectionHeading
              title="Hardware specifications"
              description="Enter all necessary data about the device's specifications"
              sectionRequired
            />
            <div className={sectionCard}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div>
                    <label htmlFor="add-cpu" className={labelBasicCls}>
                      {req('CPU architecture')}
                    </label>
                    <input
                      id="add-cpu"
                      type="text"
                      value={cpuArchitecture}
                      onChange={(e) => setCpuArchitecture(e.target.value)}
                      className={inputPillCls}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="add-gpu" className={labelBasicCls}>
                      {req('GPU specifications')}
                    </label>
                    <input
                      id="add-gpu"
                      type="text"
                      value={gpuSpecifications}
                      onChange={(e) => setGpuSpecifications(e.target.value)}
                      className={inputPillCls}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="add-memory" className={labelBasicCls}>
                      {req('Memory')}
                    </label>
                    <input
                      id="add-memory"
                      type="text"
                      value={memory}
                      onChange={(e) => setMemory(e.target.value)}
                      className={inputPillCls}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-[calc((100%-2.5rem)/3)]">
                  <label htmlFor="add-storage" className={labelBasicCls}>
                    {req('Storage')}
                  </label>
                  <input
                    id="add-storage"
                    type="text"
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                    className={inputPillCls}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className={sectionGrid}>
            <SectionHeading title="Security" description={null} sectionRequired />
            <div className={sectionCard}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="add-token" className={labelBasicCls}>
                    {req('Registration token')}
                  </label>
                  <div className="max-w-[320px]">
                    <input
                      id="add-token"
                      type="text"
                      value={registrationToken}
                      onChange={(e) => setRegistrationToken(e.target.value)}
                      className={inputPillCls}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div>
                  <div className={labelBasicCls}>{req('Certificate')}</div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".svg,.png,.jpg,.jpeg,.gif,image/*"
                    className="sr-only"
                    aria-label="Upload certificate file"
                    onChange={(e) => onCertificateFiles(e.target.files)}
                  />
                  <div className="max-w-[560px]">
                    <div
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onDragEnter={(e) => {
                        e.preventDefault();
                        setDropActive(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        if (!e.currentTarget.contains(e.relatedTarget)) setDropActive(false);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'copy';
                      }}
                      onDrop={onDrop}
                      className={`cursor-pointer rounded-2xl border border-[#D0D5DD] bg-white px-4 py-10 text-center shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition ${
                        dropActive
                          ? 'border-[#7F56D9] bg-[#F4EBFF]'
                          : 'hover:border-[#D6BBFB] hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#EAECF0] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
                        <svg
                          width="19"
                          height="17"
                          viewBox="0 0 19 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                        >
                          <path
                            d="M5.83325 11.6667L9.16659 8.33333M9.16659 8.33333L12.4999 11.6667M9.16659 8.33333V15.8333M15.8333 12.2857C16.8512 11.445 17.4999 10.1733 17.4999 8.74999C17.4999 6.21869 15.4479 4.16666 12.9166 4.16666C12.7345 4.16666 12.5641 4.07166 12.4717 3.91478C11.385 2.07069 9.37861 0.833328 7.08325 0.833328C3.63147 0.833328 0.833252 3.63155 0.833252 7.08333C0.833252 8.80508 1.52946 10.3642 2.65571 11.4946"
                            stroke="#414651"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-[#6941C6]">
                        Click to upload <span className="font-normal text-[#667085]">or drag and drop</span>
                      </p>
                      <p className="mt-1 text-xs text-[#667085]">SVG, PNG, JPG or GIF (max. 800×400px)</p>
                      {certificateFile ? (
                        <p className="mt-3 text-sm font-medium text-[#101828]">{certificateFile.name}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 rounded-3xl border border-[#EAECF0] bg-white px-6 py-4 shadow-[0_14px_42px_rgba(0,0,0,0.06)]">
          <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleTest}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#D6BBFB] bg-white px-4 text-sm font-semibold text-[#6941C6] shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9F5FF] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/25"
          >
            Test
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/edge-devices')}
            className="inline-flex h-10 items-center justify-center rounded-full border border-[#D5D7DA] bg-white px-4 text-sm font-semibold text-[#414651] shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#98A2B3]/25"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-10 items-center justify-center rounded-full border-2 border-transparent bg-[#7F56D9] px-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#7F56D9]/35"
          >
            Save
          </button>
          </div>
        </div>
      </div>

      <ConnectionTestDialog
        open={testDialog.open}
        variant={testDialog.variant}
        onClose={closeTestDialog}
        onSecondary={closeTestDialog}
        onPrimary={() => {
          if (testDialog.variant === 'error') {
            closeTestDialog();
            window.setTimeout(() => handleTest(), 0);
          } else {
            closeTestDialog();
          }
        }}
      />

      <ActivePeriodDialog
        open={activePeriodOpen}
        fromValue={activeFrom}
        toValue={activeTo}
        onChangeFrom={setActiveFrom}
        onChangeTo={setActiveTo}
        onClose={() => setActivePeriodOpen(false)}
        onSave={() => setActivePeriodOpen(false)}
      />
    </div>
  );
}
