const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function buildAnalyticsChartCategories(range, count) {
  const n = Math.max(0, Number(count) || 0);
  if (range === '24h') {
    return Array.from({ length: n }, (_, i) => `${String(i).padStart(2, '0')}:00`);
  }
  if (range === '7d') {
    const fmt = new Intl.DateTimeFormat('en', { weekday: 'short' });
    const base = new Date();
    return Array.from({ length: n }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() - (n - 1 - i));
      return fmt.format(d);
    });
  }
  if (range === '30d') {
    const fmt = new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit' });
    const base = new Date();
    return Array.from({ length: n }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() - (n - 1 - i));
      return fmt.format(d);
    });
  }
  return MONTH_LABELS.slice(0, n || 12);
}

/** Reduces label crowding on dense ranges. */
export function analyticsChartXLabelStep(range) {
  if (range === '24h') return 3;
  if (range === '7d') return 1;
  if (range === '30d') return 5;
  return 1;
}
