// 活動ログ（日付 -> 回数）からストリークと当日の学習数を計算する純関数。
export const todayKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const shiftDayKey = (key: string, deltaDays: number) => {
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + deltaDays);
  return todayKey(date);
};

export const getTodayCount = (map: Record<string, number>, now = new Date()) => map[todayKey(now)] ?? 0;

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
