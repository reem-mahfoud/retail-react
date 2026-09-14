function makeRoomRows() {
  const pairs = [
    [13, 15],
    [10, 10],
    [14, 12],
    [11, 11],
    [15, 13],
    [12, 14],
    [16, 15],
    [13, 16],
    [17, 17],
    [14, 18],
    [18, 19],
    [15, 20],
    [19, 21],
    [16, 22],
    [20, 23],
    [17, 24],
    [21, 25],
    [18, 26],
    [22, 27],
    [19, 28],
  ];

  const rows = [];
  for (let n = 101; n <= 120; n += 1) {
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

export const INITIAL_UNIVERSITY_ROOMS = makeRoomRows();

