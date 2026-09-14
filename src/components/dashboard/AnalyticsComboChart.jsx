import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const AXIS_TICKS = [0, 20, 40, 60, 80, 100];

function AttendanceTick({ x, y, payload }) {
  const value = Number(payload?.value) || 0;
  const color = value >= 80 ? '#D92D20' : value >= 60 ? '#F79009' : '#079455';
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill={color} fontSize={12} fontWeight={600}>
      {`${Math.round(value)}%`}
    </text>
  );
}

function PlainTick({ x, y, payload }) {
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#535862" fontSize={12} fontWeight={600}>
      {Math.round(Number(payload?.value) || 0)}
    </text>
  );
}

function ComboTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const barPoint = payload.find((p) => p.dataKey === 'bar' && p.value != null);
  const point = barPoint ?? payload[0];
  if (point?.value == null) return null;
  return (
    <div className="rounded-xl bg-white px-2 py-1 text-sm font-semibold text-[#181D27] shadow-[0_8px_24px_-6px_rgba(16,24,40,0.25)]">
      {Math.round(Number(point.value))}
    </div>
  );
}

/**
 * Recharts-based combo chart (dashed spline + rounded columns) shared by the
 * analytics grids. Renders whatever series are passed in (API data, entered
 * data, or fallbacks) on a fixed 0–100 axis.
 */
export default function AnalyticsComboChart({
  categories = [],
  line = [],
  bars = [],
  xLabelStep = 1,
  lineColor = '#B692F6',
  lineMode = 'solid',
  yTickVariant = 'plain',
  ariaLabel,
}) {
  const data = categories.map((label, i) => ({
    label,
    line: Number(line[i]) || 0,
    bar: Number(bars[i]) > 0 ? Number(bars[i]) : null,
  }));

  const strokeColor = lineMode === 'zones' ? 'url(#attnLineZones)' : lineColor;
  const YTick = yTickVariant === 'percent' ? AttendanceTick : PlainTick;

  return (
    <div className="relative w-full" dir="ltr" aria-label={ariaLabel} role="img">
      <ResponsiveContainer width="100%" height={286}>
        <ComposedChart data={data} margin={{ top: 16, right: 18, bottom: 8, left: 4 }}>
          <defs>
            {/* value-based zones: green < 60, amber 60–80, red > 80 (axis inverted top=100) */}
            <linearGradient id="attnLineZones" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D92D20" />
              <stop offset="20%" stopColor="#D92D20" />
              <stop offset="20%" stopColor="#F79009" />
              <stop offset="40%" stopColor="#F79009" />
              <stop offset="40%" stopColor="#17B26A" />
              <stop offset="100%" stopColor="#17B26A" />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#F5F5F5" />
          <XAxis
            dataKey="label"
            interval={Math.max(0, xLabelStep - 1)}
            tick={{ fill: '#535862', fontSize: 10, fontWeight: 500 }}
            tickLine={false}
            axisLine={{ stroke: '#F5F5F5' }}
          />
          <YAxis
            domain={[0, 100]}
            ticks={AXIS_TICKS}
            tick={<YTick />}
            tickLine={false}
            axisLine={false}
            width={44}
          />
          <Tooltip
            content={<ComboTooltip />}
            cursor={{ fill: 'rgba(127,86,217,0.06)' }}
          />
          <Bar
            dataKey="bar"
            barSize={14}
            radius={[6, 6, 6, 6]}
            fill="#7F56D9"
            isAnimationActive={false}
          />
          <Line
            dataKey="line"
            type="monotone"
            stroke={strokeColor}
            strokeWidth={2}
            strokeDasharray="2 5"
            strokeLinecap="round"
            dot={false}
            isAnimationActive={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
