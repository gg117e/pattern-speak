// 活動ログ（日付 -> 回数）からストリークと当日の学習数を計算する純関数。
export const todayKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const shiftDayKey = (key: string, deltaDays: number) => {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + deltaDays);
  return todayKey(date);
};

export const getTodayCount = (map: Record<string, number>, now = new Date()) => map[todayKey(now)] ?? 0;

// 活動のある日付を昇順に並べ、連続した区間の最大長を返す（最長ストリーク）。
export const computeLongestStreak = (map: Record<string, number>) => {
  const days = Object.keys(map)
    .filter((key) => (map[key] ?? 0) > 0)
    .sort();
  let longest = 0;
  let current = 0;
  let prev: string | null = null;
  for (const day of days) {
    current = prev !== null && shiftDayKey(prev, 1) === day ? current + 1 : 1;
    longest = Math.max(longest, current);
    prev = day;
  }
  return longest;
};

// 学習した日数（count > 0 の日）。
export const getTotalActiveDays = (map: Record<string, number>) =>
  Object.values(map).filter((count) => count > 0).length;

// 直近 days 日分の日付キー（古い順）。
export const getWindowKeys = (days: number, now = new Date()) => {
  const end = todayKey(now);
  const keys: string[] = [];
  for (let i = days - 1; i >= 0; i -= 1) keys.push(shiftDayKey(end, -i));
  return keys;
};

// 指定した日付群の学習回数合計。
export const sumCounts = (map: Record<string, number>, keys: string[]) =>
  keys.reduce((total, key) => total + (map[key] ?? 0), 0);

export type CalendarCell = { key: string; count: number };

// 直近 weeks 週（日曜始まり）を週ごとの配列にして返す。今日より後のセルは null。
export const buildCalendarWeeks = (
  map: Record<string, number>,
  weeks = 12,
  now = new Date()
): (CalendarCell | null)[][] => {
  const today = todayKey(now);
  const weekday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getDay(); // 0=日
  // 今日を含む週を最終週とし、その weeks 週前の日曜を起点にする。
  const firstSunday = shiftDayKey(today, -((weeks - 1) * 7 + weekday));
  const grid: (CalendarCell | null)[][] = [];
  for (let w = 0; w < weeks; w += 1) {
    const week: (CalendarCell | null)[] = [];
    for (let d = 0; d < 7; d += 1) {
      const key = shiftDayKey(firstSunday, w * 7 + d);
      week.push(key > today ? null : { key, count: map[key] ?? 0 });
    }
    grid.push(week);
  }
  return grid;
};

// 連続学習日数。今日に活動があれば今日から、無ければ昨日から遡って連続日数を数える（当日分の猶予あり）。
export const computeStreak = (map: Record<string, number>, now = new Date()) => {
  const today = todayKey(now);
  let cursor = (map[today] ?? 0) > 0 ? today : shiftDayKey(today, -1);
  let streak = 0;
  while ((map[cursor] ?? 0) > 0) {
    streak += 1;
    cursor = shiftDayKey(cursor, -1);
  }
  return streak;
};
