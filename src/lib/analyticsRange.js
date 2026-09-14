const DAY_SECONDS = 86_400;

const RANGE_GRANULARITY = {
  '24h': 'daily',
  '7d': 'daily',
  '30d': 'daily',
  '12m': 'monthly',
};

export function analyticsRangeToQuery(range, { dateStr } = {}) {
  const endDate = Math.floor(Date.now() / 1000);
  const granularity = RANGE_GRANULARITY[range] ?? 'monthly';

  switch (range) {
    case '24h':
      return {
        period: granularity,
        granularity,
        startDate: endDate - DAY_SECONDS,
        endDate,
        ...(dateStr ? { dateStr } : {}),
      };
    case '7d':
      return {
        period: granularity,
        granularity,
        startDate: endDate - 7 * DAY_SECONDS,
        endDate,
        ...(dateStr ? { dateStr } : {}),
      };
    case '30d':
      return {
        period: granularity,
        granularity,
        startDate: endDate - 30 * DAY_SECONDS,
        endDate,
        ...(dateStr ? { dateStr } : {}),
      };
    case '12m':
    default:
      return {
        period: granularity,
        granularity,
        startDate: endDate - 365 * DAY_SECONDS,
        endDate,
        ...(dateStr ? { dateStr } : {}),
      };
  }
}

export function formatAnalyticsPeriodLabel(period, range) {
  if (!period) return '';
  const parsed = Date.parse(period);
  if (!Number.isNaN(parsed)) {
    const date = new Date(parsed);
    if (range === '12m') {
      return new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    }
    return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit' }).format(date);
  }
  return String(period);
}
