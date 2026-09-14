import { useCallback, useMemo, useState } from 'react';
import {
  analyticsChartXLabelStep,
  buildAnalyticsChartCategories,
} from 'lib/analyticsChartCategories';
import {
  resolveAnalyticsCategories,
  resolveAnalyticsChartPair,
  scaleBarSeriesToAxis,
} from 'lib/analyticsChartData';
import { getEnteredMonthlyUserCounts } from 'lib/analyticsEnteredData';
import { EXTRA_USERS_CHANGED } from 'lib/usersExtraStorage';
import { useStorageListSubscription } from 'hooks/useStorageListSubscription';
import AnalyticsComboChart from './AnalyticsComboChart';

const DEFAULT_LINE = [22, 28, 26, 34, 32, 38, 41, 62, 58, 72, 78, 82];
const DEFAULT_BARS = [0, 0, 0, 0, 0, 0, 0, 46, 58, 76, 34, 18];

export default function AnalyticsTemperatureGrid({
  className = '',
  range = '12m',
  categories,
  temperatureLine,
  peakBars,
}) {
  const [enteredCounts, setEnteredCounts] = useState(() => getEnteredMonthlyUserCounts());
  const refreshEntered = useCallback(
    () => setEnteredCounts(getEnteredMonthlyUserCounts()),
    [],
  );
  useStorageListSubscription(EXTRA_USERS_CHANGED, refreshEntered);

  const chartPair = resolveAnalyticsChartPair(
    temperatureLine,
    peakBars,
    DEFAULT_LINE,
    DEFAULT_BARS,
  );
  const resolvedCategories = resolveAnalyticsCategories(
    categories,
    chartPair.length,
    range,
    buildAnalyticsChartCategories,
    chartPair.fromApi,
  );

  const bars = useMemo(() => {
    const base = chartPair.bars.map((v) => Number(v) || 0);
    // On the 12-month view, overlay entered (added-user) counts so the chart
    // updates live whenever a new user is added on the Users page.
    if (range === '12m' && base.length === 12) {
      const merged = base.map((v, i) => v + (enteredCounts[i] || 0));
      return scaleBarSeriesToAxis(merged);
    }
    return scaleBarSeriesToAxis(base);
  }, [chartPair.bars, enteredCounts, range]);

  return (
    <div className={`relative w-full ${className}`.trim()}>
      <AnalyticsComboChart
        categories={resolvedCategories}
        line={chartPair.line}
        bars={bars}
        xLabelStep={analyticsChartXLabelStep(range)}
        lineMode="zones"
        yTickVariant="percent"
        ariaLabel="Attendance rate chart"
      />
    </div>
  );
}
