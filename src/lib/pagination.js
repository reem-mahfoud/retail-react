/** @typedef {import('types/list').PaginationItem} PaginationItem */

export const LIST_PAGE_SIZE = 10;

/**
 * @param {number} current
 * @param {number} total
 * @returns {PaginationItem[]}
 */
export function getPaginationItems(current, total) {
  if (total <= 0) return [];
  if (total <= 9) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const set = new Set([1, 2, 3, total - 2, total - 1, total]);
  set.add(current);
  if (current > 1) set.add(current - 1);
  if (current < total) set.add(current + 1);
  const sorted = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  /** @type {PaginationItem[]} */
  const out = [];
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i] > sorted[i - 1] + 1) out.push('ellipsis');
    out.push(sorted[i]);
  }
  return out;
}

/**
 * @param {Record<string, unknown> | null | undefined} data
 * @param {string} itemsKey
 * @returns {number}
 */
export function getListTotal(data, itemsKey) {
  try {
    if (data?.total != null) return Number(data.total) || 0;
    if (data?.count != null) return Number(data.count) || 0;
    const items = data?.[itemsKey];
    return Array.isArray(items) ? items.length : 0;
  } catch {
    return 0;
  }
}
