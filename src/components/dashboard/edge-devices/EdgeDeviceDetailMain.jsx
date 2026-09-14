import { Link } from 'react-router-dom';
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  History,
  SquarePen,
  Trash2,
} from 'lucide-react';
import ChangeHistoryDrawer from 'components/dashboard/edge-devices/ChangeHistoryDrawer';
import HomeOutlineIcon from 'components/icons/HomeOutlineIcon';
import { useEdgeDeviceDetailDashboard } from 'hooks/useEdgeDeviceDetailDashboard';
import {
  IconCpuMetric,
  IconDiskMetric,
  IconMetricMore,
  IconNetworkMetric,
  IconRamMetric,
  IconThermometerMetric,
} from 'components/dashboard/edge-devices/EdgeDeviceMetricIcons';

/** Camera glyph: thin outer ring, solid inner dot, short base — no stem (matches reference). */
function CameraIconDetached({ className = 'h-6 w-6' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle
        cx="12"
        cy="8.35"
        r="3.65"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <circle cx="12" cy="8.35" r="1.2" fill="currentColor" />
      <line
        x1="8.85"
        y1="14.35"
        x2="15.15"
        y2="14.35"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CameraTagPill({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border border-[#D1D5DB] bg-white px-1 py-0.5 text-inherit font-medium leading-tight text-[#101828] transition hover:border-[#c084fc] hover:bg-[#faf5fc] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-1 sm:px-1.5 md:px-2.5 md:py-1"
    >
      {children}
    </button>
  );
}

function ProgressBar({ pct, className = '' }) {
  const w = Math.min(100, Math.max(0, pct));
  return (
    <div
      className={`h-2.5 w-full overflow-hidden rounded-full border border-[#E9EAEB] bg-[#F2F4F7] ${className}`.trim()}
      role="progressbar"
      aria-valuenow={Math.round(w)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full min-w-0 rounded-full bg-white shadow-[inset_0_0_0_1px_rgba(15,23,42,0.04)] transition-[width] duration-300 ease-out"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

const metricCardShell =
  'min-w-0 rounded-2xl border border-[#EAECF0] bg-white p-3 text-[#181D27] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_14px_42px_rgba(0,0,0,0.04)] sm:p-4';

function MetricCardHeader({ icon, label, onMore }) {
  return (
    <div className="mb-3 flex items-start justify-between gap-2">
      <div className="flex min-w-0 items-center gap-2">
        {icon}
        <span className="text-sm font-semibold leading-5 text-[#535862]">{label}</span>
      </div>
      <button
        type="button"
        className="shrink-0 rounded-lg p-1 text-[#A4A7AE] transition hover:bg-[#F9FAFB] hover:text-[#717680]"
        aria-label={`More options for ${label}`}
        onClick={onMore}
      >
        <IconMetricMore />
      </button>
    </div>
  );
}

/** Circumcenter of triangle (outer arc passes through chart points). */
function circumcenter(ax, ay, bx, by, cx, cy) {
  const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
  if (Math.abs(d) < 1e-6) return [136, 141.5];
  const a2 = ax * ax + ay * ay;
  const b2 = bx * bx + by * by;
  const c2 = cx * cx + cy * cy;
  const ux = (a2 * (by - cy) + b2 * (cy - ay) + c2 * (ay - by)) / d;
  const uy = (a2 * (cx - bx) + b2 * (ax - cx) + c2 * (bx - ax)) / d;
  return [ux, uy];
}

/** Open arc along RAM gauge outer circle (left → top → right); stroke + round caps match design. */
function ramGaugeOpenArcD() {
  const [cx, cy] = circumcenter(17.2, 154, 136, 22, 254.8, 154);
  const R = Math.hypot(17.2 - cx, 154 - cy);
  const ang = (x, y) => Math.atan2(y - cy, x - cx);
  const t0 = ang(17.2, 154);
  const tTop = ang(136, 22);
  const t1 = ang(254.8, 154);
  const TAU = 2 * Math.PI;
  const tTopU = tTop < t0 ? tTop + TAU : tTop;
  const t1U = t1 < tTopU ? t1 + TAU : t1;
  const x0 = cx + R * Math.cos(t0);
  const y0 = cy + R * Math.sin(t0);
  const arc = (ta, tb) => {
    const dAng = tb - ta;
    const large = Math.abs(dAng) > Math.PI ? 1 : 0;
    const xe = cx + R * Math.cos(tb);
    const ye = cy + R * Math.sin(tb);
    return `A ${R} ${R} 0 ${large} 1 ${xe} ${ye}`;
  };
  return `M ${x0} ${y0} ${arc(t0, tTopU)} ${arc(tTopU, t1U)}`;
}

const RAM_GAUGE_OPEN_ARC_D = ramGaugeOpenArcD();
const RAM_GAUGE_STROKE = 13;
/** Gauge track — soft lavender on purple gradient (reference UI). */
const RAM_GAUGE_TRACK_STROKE = 'rgba(232, 213, 244, 0.55)';

/** RAM card — semicircle gauge: track + progress as stroked arcs with round caps (matches reference). */
function RamDonutFixed({ pct, usedGb, totalGb, segments }) {
  const p = Math.min(100, Math.max(0, pct));
  const dashGap = p >= 100 ? 0.01 : Math.max(0.01, 100 - p);

  return (
    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="relative mx-auto w-[11.25rem] shrink-0 sm:mx-0 sm:w-[11.75rem] lg:mx-0" style={{ minHeight: 100 }}>
        <svg
          className="block w-full"
          viewBox="0 18 272 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d={RAM_GAUGE_OPEN_ARC_D}
            fill="none"
            stroke={RAM_GAUGE_TRACK_STROKE}
            strokeWidth={RAM_GAUGE_STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
          />
          <path
            d={RAM_GAUGE_OPEN_ARC_D}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth={RAM_GAUGE_STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={100}
            strokeDasharray={`${p} ${dashGap}`}
            className="transition-all duration-300 ease-out"
          />
        </svg>
        <div className="pointer-events-none absolute inset-x-0 bottom-[18%] flex flex-col items-center text-center">
          <span className="text-xl font-semibold leading-tight tabular-nums text-white drop-shadow-sm">{p}%</span>
          <span className="mt-0.5 flex flex-wrap items-center justify-center gap-x-1 text-[11px] font-medium tabular-nums">
            <span className="text-white">{usedGb}</span>
            <span className="text-[#C9A8E0]" aria-hidden>
              /
            </span>
            <span className="text-white">
              {totalGb} GB
            </span>
          </span>
        </div>
      </div>
      <div className="min-w-0 flex-1 rounded-[12px] bg-black/15 px-3 py-2.5 ring-1 ring-white/10 sm:px-3.5 sm:py-3">
        <div className="space-y-2">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-xs font-medium text-white">
              <span className="w-3 shrink-0 tabular-nums">{s.label}</span>
              <div className="relative min-h-[10px] min-w-0 flex-1">
                <div
                  className="pointer-events-none absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[rgba(232,213,244,0.35)]"
                  aria-hidden
                />
                <div
                  className="relative z-[1] h-[9px] rounded-full bg-[rgba(245,235,252,0.88)] transition-[width] duration-300 ease-out"
                  style={{
                    width: `${Math.min(100, Math.max(0, s.pct))}%`,
                    minWidth: s.pct > 0 ? 8 : 0,
                  }}
                />
              </div>
              <span className="w-9 shrink-0 text-right tabular-nums text-white">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FieldCell({ label, value, action, onAction, onValueClick }) {
  return (
    <div className="min-w-0">
      <div className="text-xs font-medium text-[#667085]">{label}</div>
      <div className="mt-0.5 flex flex-wrap items-baseline gap-2 text-sm font-semibold">
        <button
          type="button"
          onClick={() => onValueClick?.(label, value)}
          className="-mx-1 max-w-full break-words rounded-md px-1 text-left text-sm font-semibold text-[#101828] transition hover:bg-[#F9FAFB] hover:text-[#6941C6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F56D9] focus-visible:ring-offset-2"
          aria-label={`Edit ${label}`}
        >
          {value}
        </button>
        {action ? (
          <button
            type="button"
            onClick={() => onAction?.(action, label)}
            className="shrink-0 text-sm font-semibold text-[#7F56D9] underline-offset-2 hover:underline"
          >
            {action}
          </button>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Edge device detail — light shell, metric cards match design SVG.
 */
export default function EdgeDeviceDetailMain({ detail }) {
  const {
    deviceOn,
    setDeviceOn,
    camerasOpen,
    setCamerasOpen,
    camTab,
    setCamTab,
    toast,
    setToast,
    changeHistoryOpen,
    setChangeHistoryOpen,
    activeCamCount,
    inactiveCamCount,
    visibleCameras,
    onMetricMore,
    onFieldAction,
    onFieldValueClick,
    onCameraTagClick,
    toggleCamera,
    removeCamera,
  } = useEdgeDeviceDetailDashboard(detail);

  const { cpu, disk, temperatures, network, ram, deviceInfo, gpu, changeHistory } = detail;

  return (
    <div className="min-h-full w-full min-w-0 bg-[#FAFAFA] pb-12 pt-4 text-[#101828] sm:pt-6">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <nav
          dir="ltr"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm"
          aria-label="Breadcrumb"
        >
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
          <span className="rounded-full border border-[#EAECF0] bg-white px-3 py-1.5 text-sm font-semibold text-[#101828] shadow-sm">
            {detail.title}
          </span>
        </nav>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[#101828] sm:text-4xl">{detail.title}</h1>
            <p className="mt-2 text-base text-[#667085] sm:text-lg">{detail.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#101828] shadow-sm transition hover:bg-[#F9FAFB]"
              onClick={() => setToast('Date picker')}
            >
              <Calendar className="h-4 w-4 text-[#667085]" strokeWidth={1.75} aria-hidden />
              {detail.headerDateLabel}
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#101828] shadow-sm transition hover:bg-[#F9FAFB]"
              onClick={() => setToast('Time scope')}
            >
              <Clock className="h-4 w-4 text-[#667085]" strokeWidth={1.75} aria-hidden />
              {detail.headerTimeLabel}
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#D0D5DD] bg-white px-4 text-sm font-semibold text-[#101828] shadow-sm transition hover:bg-[#F9FAFB]"
              onClick={() => setChangeHistoryOpen(true)}
            >
              <History className="h-4 w-4 text-[#667085]" strokeWidth={1.75} aria-hidden />
              Change history
            </button>
          </div>
        </div>

        <div className="mt-8 grid w-full min-w-0 grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12 lg:items-stretch">
          <div className="flex min-w-0 flex-col gap-3 sm:gap-4 lg:col-span-2">
            <div className={metricCardShell}>
              <MetricCardHeader
                icon={<IconCpuMetric />}
                label={cpu.label}
                onMore={() => onMetricMore(cpu.label)}
              />
              <p className="text-2xl font-semibold tabular-nums text-[#181D27]">{cpu.usagePct}%</p>
              <ProgressBar pct={cpu.usagePct} className="mt-3" />
            </div>

            <div className={metricCardShell}>
              <MetricCardHeader
                icon={<IconDiskMetric />}
                label={disk.label}
                onMore={() => onMetricMore(disk.label)}
              />
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-2xl font-semibold tabular-nums text-[#181D27]">{disk.usagePct}%</p>
                <p className="text-sm font-medium tabular-nums text-[#535862]">
                  {disk.usedGb} / {disk.totalGb} GB
                </p>
              </div>
              <ProgressBar pct={disk.usagePct} className="mt-3" />
            </div>
          </div>

          <div className={`${metricCardShell} flex min-h-0 flex-col lg:col-span-2`}>
            <MetricCardHeader
              icon={<IconThermometerMetric />}
              label={temperatures.label}
              onMore={() => onMetricMore(temperatures.label)}
            />
            <div className="mt-1 flex min-h-0 flex-1 flex-col gap-2.5">
              {temperatures.rows.map((row) => (
                <div
                  key={row.key}
                  className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 font-semibold ${
                    row.variant === 'hot'
                      ? 'bg-[#FEF2F2] text-[#C53030]'
                      : 'bg-[#F0FFF4] text-[#22543D]'
                  }`}
                >
                  <span className="text-sm">{row.label}</span>
                  <span className="text-xl tabular-nums">{row.celsius} °C</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${metricCardShell} lg:col-span-2`}>
            <MetricCardHeader
              icon={<IconNetworkMetric />}
              label={network.label}
              onMore={() => onMetricMore(network.label)}
            />
            <div className="mt-1 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-[#535862]">Connection</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D5D7DA] bg-white px-2.5 py-1">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#17B26A]" aria-hidden />
                  <span className="font-medium text-[#414651]">{network.status}</span>
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-[#535862]">Active</span>
                <span className="font-semibold tabular-nums text-[#181D27]">{network.activeTime}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-[#535862]">Sent</span>
                <span className="font-semibold tabular-nums text-[#181D27]">{network.sent}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-[#535862]">Received</span>
                <span className="font-semibold tabular-nums text-[#181D27]">{network.received}</span>
              </div>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-[#9C4BB0]/45 bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] p-3 text-white shadow-[0_1px_3px_rgba(0,0,0,0.12),0_14px_42px_rgba(0,0,0,0.08)] sm:p-4 lg:col-span-6">
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <IconRamMetric variant="light" />
                <span className="text-sm font-semibold text-white">RAM usage</span>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-lg p-1 text-white/85 transition hover:bg-white/12 hover:text-white"
                aria-label="More options for RAM usage"
                onClick={() => onMetricMore('RAM usage')}
              >
                <IconMetricMore variant="light" />
              </button>
            </div>
            <RamDonutFixed pct={ram.usagePct} usedGb={ram.usedGb} totalGb={ram.totalGb} segments={ram.segments} />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-start">
          <section
            className={`rounded-2xl border border-[#EAECF0] bg-white p-5 text-[#101828] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_14px_42px_rgba(0,0,0,0.04)] lg:col-span-7`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAECF0] pb-4">
              <h2 className="text-lg font-semibold">{deviceInfo.title}</h2>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  role="switch"
                  aria-checked={deviceOn}
                  onClick={() => setDeviceOn((v) => !v)}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${
                    deviceOn ? 'bg-[#7F56D9]' : 'bg-[#D0D5DD]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                      deviceOn ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-sm font-medium text-[#414651]">
                  {deviceOn ? 'Device is On' : 'Device is off'}
                </span>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E9EAEB] bg-white px-4 py-1.5 text-sm font-medium text-[#374151] shadow-sm transition hover:bg-[#F9FAFB]"
                  onClick={() => setToast('Edit device info')}
                >
                  Edit
                  <SquarePen className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-6">
              {deviceInfo.fields.map((row, i) => (
                <div key={i}>
                  {i > 0 ? <div className="mb-4 border-t border-[#EAECF0]" /> : null}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {row.map((cell) => (
                      <FieldCell
                        key={cell.label}
                        label={cell.label}
                        value={cell.value}
                        action={cell.action}
                        onAction={onFieldAction}
                        onValueClick={onFieldValueClick}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
            <section
              className={`rounded-2xl border border-[#EAECF0] bg-white p-5 text-[#101828] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_14px_42px_rgba(0,0,0,0.04)]`}
            >
              <MetricCardHeader
                icon={<IconCpuMetric />}
                label={gpu.title}
                onMore={() => onMetricMore(gpu.title)}
              />
              <div className="mt-2 space-y-4">
                {gpu.cards.map((card) => (
                  <div key={card.id} className="rounded-xl border border-[#EAECF0] bg-[#FAFAFA] p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-[#101828]">{card.name}</p>
                      <span
                        className={`rounded-lg px-2 py-0.5 text-xs font-semibold tabular-nums ${
                          card.tempVariant === 'hot'
                            ? 'bg-[#FEF3F2] text-[#D92D20]'
                            : 'bg-[#ECFDF3] text-[#079455]'
                        }`}
                      >
                        {card.tempC} °C
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline justify-between gap-2 text-sm">
                      <span className="text-2xl font-semibold tabular-nums text-[#181D27]">{card.usagePct}%</span>
                      <span className="font-medium tabular-nums text-[#535862]">
                        {card.vramUsedMb} / {card.vramTotalMb} MB
                      </span>
                    </div>
                    <ProgressBar pct={card.usagePct} className="mt-2" />
                  </div>
                ))}
              </div>
            </section>

            <section
              className={`min-w-0 rounded-2xl border border-[#EAECF0] bg-white p-5 text-[#101828] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_14px_42px_rgba(0,0,0,0.04)]`}
            >
          <button
            type="button"
            className="flex w-full items-center justify-between gap-3 text-left"
            onClick={() => setCamerasOpen((o) => !o)}
            aria-expanded={camerasOpen}
          >
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-lg font-semibold">{detail.cameras.title}</h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F9FAFB] px-2.5 py-1 text-xs font-semibold text-[#414651] ring-1 ring-[#EAECF0]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#17B26A]" aria-hidden />
                {activeCamCount}/{detail.cameras.badge.total}
              </span>
            </div>
            {camerasOpen ? (
              <ChevronUp className="h-5 w-5 shrink-0 text-[#667085]" aria-hidden />
            ) : (
              <ChevronDown className="h-5 w-5 shrink-0 text-[#667085]" aria-hidden />
            )}
          </button>

          {camerasOpen ? (
            <>
              <div
                className="mt-4 inline-flex rounded-full border border-[#E9EAEB] bg-[#FAFAFA] p-1"
                role="tablist"
                aria-label="Camera status"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={camTab === 'active'}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
                    camTab === 'active'
                      ? 'bg-white text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                      : 'text-[#667085] hover:text-[#414651]'
                  }`}
                  onClick={() => setCamTab('active')}
                >
                  <span>Active</span>
                  <span
                    className={`inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border px-1.5 text-xs font-semibold tabular-nums ${
                      camTab === 'active'
                        ? 'border-[#E9EAEB] bg-[#FAFAFA] text-[#414651]'
                        : 'border-[#E9EAEB] bg-white text-[#667085]'
                    }`}
                  >
                    {activeCamCount}
                  </span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={camTab === 'inactive'}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${
                    camTab === 'inactive'
                      ? 'bg-white text-[#101828] shadow-[0_1px_2px_rgba(16,24,40,0.06)]'
                      : 'text-[#667085] hover:text-[#414651]'
                  }`}
                  onClick={() => setCamTab('inactive')}
                >
                  <span>Inactive</span>
                  <span
                    className={`inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full border px-1.5 text-xs font-semibold tabular-nums ${
                      camTab === 'inactive'
                        ? 'border-[#E9EAEB] bg-[#FAFAFA] text-[#414651]'
                        : 'border-[#E9EAEB] bg-white text-[#667085]'
                    }`}
                  >
                    {inactiveCamCount}
                  </span>
                </button>
              </div>

              <ul className="mt-4 min-w-0 space-y-3 overflow-x-hidden pr-1">
                {visibleCameras.length === 0 ? (
                  <li className="rounded-xl border border-dashed border-[#D0D5DD] py-8 text-center text-sm text-[#667085]">
                    No cameras in this tab.
                  </li>
                ) : (
                  visibleCameras.map((cam) => (
                    <li
                      key={cam.id}
                      className="grid grid-cols-[auto,minmax(0,1fr),auto] grid-rows-[auto,auto] gap-x-4 gap-y-1.5 rounded-xl border border-[#EAECF0] bg-white px-4 py-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)] sm:gap-y-2 sm:py-3.5"
                    >
                      <div className="col-start-1 row-start-1 flex items-center text-[#535862]">
                        <CameraIconDetached />
                      </div>
                      <p
                        className={`col-start-2 row-start-1 min-w-0 self-center font-semibold leading-tight ${
                          cam.active ? 'text-[#101828]' : 'text-[#667085]'
                        }`}
                      >
                        {cam.name}
                      </p>
                      <div className="col-start-3 row-start-1 self-center justify-self-end">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={cam.active}
                          onClick={() => toggleCamera(cam.id)}
                          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${
                            cam.active ? 'bg-[#7F56D9]' : 'bg-[#D0D5DD]'
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                              cam.active ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="col-span-3 col-start-1 row-start-2 flex min-w-0 items-center gap-3 sm:gap-4">
                        <div
                          className="min-w-0 flex-1 basis-0 overflow-x-clip"
                          style={{ containerType: 'inline-size' }}
                        >
                          <div
                            className="flex min-h-0 min-w-0 flex-nowrap items-center gap-0.5 text-[10px] sm:gap-1 md:gap-1.5"
                            style={{ fontSize: 'clamp(7px, 6cqw, 12px)' }}
                          >
                            <CameraTagPill onClick={() => onCameraTagClick(cam.id, 'Camera Type')}>
                              Camera Type
                            </CameraTagPill>
                            <CameraTagPill onClick={() => onCameraTagClick(cam.id, 'Organization')}>
                              Organization
                            </CameraTagPill>
                            <CameraTagPill onClick={() => onCameraTagClick(cam.id, 'Building')}>
                              Building
                            </CameraTagPill>
                            <CameraTagPill onClick={() => onCameraTagClick(cam.id, 'Room')}>
                              Room
                            </CameraTagPill>
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center justify-end">
                          <button
                            type="button"
                            className="rounded-lg p-2 text-[#F04438] transition hover:bg-[#FEF3F2]"
                            aria-label={`Remove ${cam.name}`}
                            onClick={() => removeCamera(cam.id)}
                          >
                            <Trash2 className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </>
          ) : null}
            </section>
          </div>
        </div>
      </div>

      {toast ? (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[10060] max-w-md -translate-x-1/2 rounded-xl border border-[#EAECF0] bg-white px-4 py-3 text-center text-sm text-[#101828] shadow-lg"
        >
          {toast}
        </div>
      ) : null}

      {changeHistory ? (
        <ChangeHistoryDrawer
          open={changeHistoryOpen}
          onClose={() => setChangeHistoryOpen(false)}
          description={changeHistory.description}
          groups={changeHistory.groups}
        />
      ) : null}
    </div>
  );
}
