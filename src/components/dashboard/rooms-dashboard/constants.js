/** Seed rows for Cradle Rooms demo (design: long scrollable list). */
function makeRoomRows() {
  const pairs = [
    [13, 15],
    [10, 10],
    [14, 12],
    [8, 12],
    [11, 11],
    [9, 14],
    [15, 15],
    [7, 10],
    [12, 12],
    [6, 8],
    [10, 12],
    [5, 10],
    [14, 14],
    [8, 8],
    [11, 14],
    [9, 9],
    [13, 13],
    [7, 12],
    [12, 15],
    [10, 14],
    [8, 10],
    [11, 12],
    [6, 10],
    [14, 16],
    [9, 11],
    [15, 18],
  ];

  const rows = [];
  for (let n = 101; n <= 125; n += 1) {
    const idx = (n - 101) % pairs.length;
    const [used, total] = pairs[idx];
    rows.push({
      id: `room-${n}`,
      name: String(n),
      quotaUsed: used,
      quotaTotal: total,
      active: true,
    });
  }
  return rows;
}

export const INITIAL_ROOM_ROWS = makeRoomRows();
