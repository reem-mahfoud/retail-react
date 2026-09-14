function hasRenderableSeries(series) {
  if (!Array.isArray(series) || series.length < 2) return false;
  const max = Math.max(...series.map((v) => Number(v) || 0));
  return max > 0;
}

export function resolveAnalyticsChartPair(apiLine, apiBars, fallbackLine, fallbackBars) {
  const lineOk = hasRenderableSeries(apiLine);
  const barsOk = Array.isArray(apiBars) && apiBars.length >= 2;
  const lengthsMatch = lineOk && barsOk && apiLine.length === apiBars.length;

  if (lengthsMatch) {
    return {
      line: apiLine,
      bars: apiBars,
      fromApi: true,
      length: apiLine.length,
    };
  }

  return {
    line: fallbackLine,
    bars: fallbackBars,
    fromApi: false,
    length: fallbackLine.length,
  };
}

export function resolveAnalyticsCategories(
  apiCategories,
  dataLength,
  range,
  buildCategories,
  fromApi,
) {
  if (
    fromApi &&
    Array.isArray(apiCategories) &&
    apiCategories.length >= dataLength &&
    dataLength > 0
  ) {
    return apiCategories.slice(0, dataLength);
  }
  return buildCategories(range, dataLength || 12);
}

// Hide zero-height columns — design shows bars only on peak months.
export function formatColumnPoints(values) {
  return values.map((value) => {
    const n = Number(value);
    return n > 0 ? n : null;
  });
}

// Scale bar heights to the 0–100 axis without affecting the line series.
export function scaleBarSeriesToAxis(bars, axisMax = 100) {
  const nums = bars.map((v) => Number(v) || 0);
  const peak = Math.max(...nums, 1);
  if (peak <= axisMax) return nums;
  return nums.map((v) => Math.round((v / peak) * axisMax));
}

export function scaleChartPairToAxis(bars, trend, axisMax = 100) {
  const nums = [...bars, ...trend].map((v) => Number(v) || 0);
  const peak = Math.max(...nums, 1);
  if (peak <= axisMax) {
    return { bars, trend };
  }
  return {
    bars: bars.map((v) => Math.round(((Number(v) || 0) / peak) * axisMax)),
    trend: trend.map((v) => Math.round(((Number(v) || 0) / peak) * axisMax)),
  };
}
