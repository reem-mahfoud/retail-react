import {
  analyticsChartXLabelStep,
  buildAnalyticsChartCategories,
} from 'lib/analyticsChartCategories';
import {
  resolveAnalyticsCategories,
  resolveAnalyticsChartPair,
  scaleChartPairToAxis,
} from 'lib/analyticsChartData';
import AnalyticsComboChart from './AnalyticsComboChart';

const DEFAULT_BARS = [18, 26, 14, 32, 24, 38, 46, 36, 58, 42, 28, 20];
const DEFAULT_TREND = [22, 24, 20, 28, 26, 34, 40, 38, 52, 48, 36, 30];

export default function AnalyticsCameraFailuresGrid({
  className = '',
  range = '12m',
  categories,
  bars,
  trend,
}) {
  const chartPair = resolveAnalyticsChartPair(trend, bars, DEFAULT_TREND, DEFAULT_BARS);
  const scaled = scaleChartPairToAxis(chartPair.bars, chartPair.line);
  const resolvedCategories = resolveAnalyticsCategories(
    categories,
    chartPair.length,
    range,
    buildAnalyticsChartCategories,
    chartPair.fromApi,
  );

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <AnalyticsComboChart
        categories={resolvedCategories}
        line={scaled.trend}
        bars={scaled.bars}
        xLabelStep={analyticsChartXLabelStep(range)}
        lineColor="rgba(182, 146, 246, 0.85)"
        lineMode="solid"
        yTickVariant="plain"
        ariaLabel="Number of camera failures chart"
      />
    </div>
  );
}
