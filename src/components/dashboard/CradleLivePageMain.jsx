import { useMemo, useState } from 'react';
import { AlertCircle, Clock, MapPin, Play, RefreshCw, Video } from 'lucide-react';

const cameras = [
  {
    id: 'main-entrance',
    name: 'Main Entrance',
    location: 'Building A, Front Door',
    status: 'Live',
    updated: 'Just now',
    tone: 'green',
  },
  {
    id: 'corridor',
    name: 'Corridor',
    location: 'First Floor',
    status: 'Live',
    updated: '1 min ago',
    tone: 'green',
  },
  {
    id: 'basement',
    name: 'Basement',
    location: 'Parking Level',
    status: 'Offline',
    updated: '8 min ago',
    tone: 'gray',
  },
  {
    id: 'street-view',
    name: 'Street View',
    location: 'Outdoor Gate',
    status: 'Warning',
    updated: '3 min ago',
    tone: 'amber',
  },
];

const activities = [
  'Main Entrance preview is live',
  'Corridor camera refreshed',
  'Basement preview is currently offline',
  'Street View needs attention',
];

const statusStyles = {
  green: 'border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]',
  amber: 'border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]',
  gray: 'border-[#E9EAEB] bg-[#F9FAFB] text-[#535862]',
};

function StatusBadge({ tone, children }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[tone]}`}>
      {children}
    </span>
  );
}

function PreviewSurface({ label, compact = false, isLive = true }) {
  return (
    <div
      className={`relative flex overflow-hidden rounded-2xl border border-white/10 bg-[#101828] text-white ${
        compact ? 'aspect-video min-h-[132px]' : 'min-h-[320px] sm:min-h-[420px]'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(127,86,217,0.35),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent" />
      {isLive ? (
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#F04438] px-3 py-1.5 text-xs font-bold tracking-wide text-white shadow-[0_8px_24px_rgba(240,68,56,0.24)]">
          <span className="h-2 w-2 rounded-full bg-white" />
          LIVE
        </span>
      ) : null}
      <div className="relative z-10 m-auto flex flex-col items-center gap-3 px-5 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15">
          <Video className="h-7 w-7" strokeWidth={1.75} aria-hidden />
        </span>
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          {!compact ? <p className="mt-1 text-sm text-white/65">Camera preview placeholder</p> : null}
        </div>
      </div>
    </div>
  );
}

function CameraCard({ camera, selected, onSelect }) {
  const isLive = camera.status === 'Live';

  return (
    <button
      type="button"
      onClick={() => onSelect(camera.id)}
      className={`group flex h-full min-w-0 flex-col rounded-3xl border bg-white p-3 text-left shadow-[0px_14px_42px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0px_18px_46px_rgba(16,24,40,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7F56D9] ${
        selected ? 'border-[#7F56D9]' : 'border-transparent'
      }`}
    >
      <PreviewSurface label={camera.name} compact isLive={isLive} />
      <div className="mt-4 flex min-w-0 flex-1 flex-col gap-3 px-1 pb-1">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-[#101828]">{camera.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 truncate text-xs font-medium text-[#667085]">
              <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.8} aria-hidden />
              {camera.location}
            </p>
          </div>
          <StatusBadge tone={camera.tone}>{camera.status}</StatusBadge>
        </div>
        <p className="flex items-center gap-1.5 text-xs font-medium text-[#667085]">
          <Clock className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden />
          Updated {camera.updated}
        </p>
      </div>
    </button>
  );
}

export default function CradleLivePageMain() {
  const [selectedCameraId, setSelectedCameraId] = useState(cameras[0].id);
  const [activeCameraId, setActiveCameraId] = useState(null);
  const [activityItems, setActivityItems] = useState(activities);
  const selectedCamera = useMemo(
    () => cameras.find((camera) => camera.id === selectedCameraId) ?? cameras[0],
    [selectedCameraId],
  );
  const previewActive = activeCameraId === selectedCamera.id;

  const startPreview = () => {
    setActiveCameraId(selectedCamera.id);
    setActivityItems((items) => [`${selectedCamera.name} preview started just now`, ...items].slice(0, 4));
  };

  const refreshPreview = () => {
    const currentIndex = cameras.findIndex((camera) => camera.id === selectedCameraId);
    const nextCamera = cameras[(currentIndex + 1) % cameras.length];

    setSelectedCameraId(nextCamera.id);
    setActivityItems((items) => [`${nextCamera.name} preview refreshed just now`, ...items].slice(0, 4));
  };

  return (
    <div className="min-h-full w-full bg-[#FAFAFA] pb-12 pt-2 text-[#101828] sm:pt-4">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[28px] bg-white p-5 shadow-[0px_14px_42px_rgba(0,0,0,0.06)] sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E9D7FE] bg-[#F9F5FF] px-3 py-1 text-xs font-semibold text-[#6941C6]">
              <span className="h-2 w-2 rounded-full bg-[#17B26A]" />
              Live Preview
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">Live</h1>
            <p className="mt-2 max-w-2xl text-base text-[#535862] sm:text-lg">
              Preview live camera views from selected locations.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <select
              className="h-11 min-w-[220px] rounded-full border border-[#D5D7DA] bg-white px-4 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[#7F56D9] focus:ring-2 focus:ring-[#7F56D9]/15"
              value={selectedCamera.id}
              onChange={(event) => setSelectedCameraId(event.target.value)}
              aria-label="Select camera"
            >
              {cameras.map((camera) => (
                <option key={camera.id} value={camera.id}>
                  {camera.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={startPreview}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#6941C6] bg-[#7F56D9] px-5 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#6941C6]"
            >
              <Play className="h-4 w-4 fill-current" strokeWidth={2} aria-hidden />
              {previewActive ? 'Preview Active' : 'Start Preview'}
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.75fr)]">
          <div className="rounded-[28px] bg-white p-4 shadow-[0px_14px_42px_rgba(0,0,0,0.06)] sm:p-5">
            <PreviewSurface label={`${selectedCamera.name} ${previewActive ? 'preview active' : 'ready to preview'}`} />
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-[#101828]">{selectedCamera.name}</h2>
                  <StatusBadge tone={selectedCamera.tone}>{selectedCamera.status}</StatusBadge>
                  {previewActive ? <StatusBadge tone="green">Preview Active</StatusBadge> : null}
                </div>
                <p className="mt-1 text-sm font-medium text-[#667085]">{selectedCamera.location}</p>
              </div>
              <button
                type="button"
                onClick={refreshPreview}
                className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full border border-[#D5D7DA] bg-white px-4 text-sm font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#F9FAFB]"
              >
                <RefreshCw className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                Refresh
              </button>
            </div>
          </div>

          <aside className="rounded-[28px] bg-white p-5 shadow-[0px_14px_42px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-[#101828]">Recent Activity</h2>
                <p className="mt-1 text-sm text-[#667085]">Latest camera preview updates.</p>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F9F5FF] text-[#7F56D9]">
                <AlertCircle className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {activityItems.map((activity, index) => (
                <div key={`${activity}-${index}`} className="flex gap-3 rounded-2xl border border-[#EAECF0] bg-[#FCFCFD] p-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#7F56D9]" />
                  <p className="text-sm font-medium text-[#535862]">{activity}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#101828]">Camera Previews</h2>
              <p className="text-sm text-[#667085]">Choose a camera card to focus the live preview area.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cameras.map((camera) => (
              <CameraCard
                key={camera.id}
                camera={camera}
                selected={camera.id === selectedCamera.id}
                onSelect={setSelectedCameraId}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
