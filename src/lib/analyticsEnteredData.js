import { readExtraUsers } from 'lib/usersExtraStorage';

function timestampFromId(id) {
  const match = /^u-(\d+)$/.exec(String(id || ''));
  return match ? Number(match[1]) : null;
}

/**
 * Buckets locally added ("entered") users per calendar month so the analytics
 * charts can reflect real, user-entered data. Index 0 = Jan ... 11 = Dec,
 * matching the 12-month chart categories.
 * @returns {number[]} length-12 array of counts
 */
export function getEnteredMonthlyUserCounts() {
  const counts = new Array(12).fill(0);
  for (const user of readExtraUsers()) {
    const ts = timestampFromId(user?.id);
    const date = ts ? new Date(ts) : new Date();
    const month = date.getMonth();
    if (month >= 0 && month < 12) counts[month] += 1;
  }
  return counts;
}

/** Total number of entered users (used for summary/labels). */
export function getEnteredUserTotal() {
  return readExtraUsers().length;
}
