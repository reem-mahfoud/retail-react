export function analyticsColumnTooltipFormatter() {
  if (this.series.type !== 'column' || !this.y) return false;
  return `<div style="min-width:24px;text-align:center;font-size:14px;font-weight:600;color:#181D27">${this.y}</div>`;
}

export function buildAnalyticsAxisOptions({ categories, xLabelStep, yAxisLabels }) {
  return {
    xAxis: {
      categories,
      lineColor: '#F5F5F5',
      tickColor: 'transparent',
      labels: {
        style: { color: '#535862', fontSize: '10px', fontWeight: '500' },
        step: xLabelStep,
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      tickPositions: [0, 20, 40, 60, 80, 100],
      gridLineColor: '#F5F5F5',
      title: { text: undefined },
      labels: yAxisLabels,
    },
  };
}

export function buildAnalyticsPlotOptions() {
  return {
    series: {
      animation: false,
      states: { inactive: { opacity: 1 } },
    },
    column: {
      borderRadius: 6,
      pointWidth: 14,
      groupPadding: 0.06,
      pointPadding: 0.08,
      minPointLength: 0,
    },
    spline: {
      marker: { enabled: false },
      dashStyle: 'Dot',
      lineWidth: 2,
      linecap: 'round',
    },
  };
}

export function buildAnalyticsChartShell({ categories, xLabelStep, yAxisLabels, series }) {
  const axes = buildAnalyticsAxisOptions({ categories, xLabelStep, yAxisLabels });

  return {
    chart: {
      height: 286,
      backgroundColor: 'transparent',
      spacing: [16, 18, 18, 18],
      style: {
        fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      },
    },
    title: { text: undefined },
    credits: { enabled: false },
    legend: { enabled: false },
    ...axes,
    tooltip: {
      shared: false,
      useHTML: true,
      backgroundColor: '#ffffff',
      borderWidth: 0,
      borderRadius: 12,
      shadow: true,
      shape: 'callout',
      padding: 8,
      formatter: analyticsColumnTooltipFormatter,
    },
    plotOptions: buildAnalyticsPlotOptions(),
    series,
    responsive: {
      rules: [
        {
          condition: { maxWidth: 520 },
          chartOptions: {
            chart: { height: 246 },
            plotOptions: { column: { pointWidth: 11 } },
          },
        },
      ],
    },
  };
}
