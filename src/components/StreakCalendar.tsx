"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getActivitySnapshot, getDailyGoal, getDailyGoalSnapshot, subscribeToActivity } from "@/lib/storage";
import {
  buildCalendarWeeks,
  computeLongestStreak,
  computeStreak,
  getTotalActiveDays,
  getWindowKeys,
  sumCounts
} from "@/lib/streak";

const emptyActivity = () => "{}";
const defaultGoal = () => "20";
const weekdayLabels = ["日", "月", "火", "水", "木", "金", "土"];

export function StreakCalendar() {
  const activitySnapshot = useSyncExternalStore(subscribeToActivity, getActivitySnapshot, emptyActivity);
  const goalSnapshot = useSyncExternalStore(subscribeToActivity, getDailyGoalSnapshot, defaultGoal);

  const map = useMemo(() => {
    try {
      return JSON.parse(activitySnapshot) as Record<string, number>;
    } catch {
      return {};
    }
  }, [activitySnapshot]);

  const goal = useMemo(() => {
    const parsed = Number(goalSnapshot);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : getDailyGoal();
  }, [goalSnapshot]);

  const weeks = useMemo(() => buildCalendarWeeks(map, 12), [map]);
  const streak = computeStreak(map);
  const longest = computeLongestStreak(map);
  const totalDays = getTotalActiveDays(map);
  const weekCount = sumCounts(map, getWindowKeys(7));

  const cellClass = (count: number) => {
    if (count <= 0) return "bg-line/60";
    if (count >= goal) return "bg-mint";
    if (count >= Math.ceil(goal / 2)) return "bg-amber";
    return "bg-amber/50";
  };

  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-soft">
      <h2 className="text-lg font-black">学習カレンダー</h2>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-line bg-paper p-3">
          <div className="text-xs font-bold text-ink/55">現在の連続</div>
          <div className="mt-1 text-2xl font-black text-amber">🔥 {streak}<span className="text-sm font-bold text-ink/45"> 日</span></div>
        </div>
        <div className="rounded-lg border border-line bg-paper p-3">
          <div className="text-xs font-bold text-ink/55">最長記録</div>
          <div className="mt-1 text-2xl font-black text-mint-deep">🏆 {longest}<span className="text-sm font-bold text-ink/45"> 日</span></div>
        </div>
        <div className="rounded-lg border border-line bg-paper p-3">
          <div className="text-xs font-bold text-ink/55">総学習日数</div>
          <div className="mt-1 text-2xl font-black text-ink">{totalDays}<span className="text-sm font-bold text-ink/45"> 日</span></div>
        </div>
        <div className="rounded-lg border border-line bg-paper p-3">
          <div className="text-xs font-bold text-ink/55">今週の学習</div>
          <div className="mt-1 text-2xl font-black text-ink">{weekCount}<span className="text-sm font-bold text-ink/45"> 問</span></div>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <div className="flex gap-2">
          <div className="flex flex-col gap-1 pt-0.5 text-[10px] font-bold text-ink/45">
            {weekdayLabels.map((label, i) => (
              <div key={label} className="flex h-3.5 items-center">{i % 2 === 1 ? label : ""}</div>
            ))}
          </div>
          <div className="flex gap-1">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((cell, di) => (
                  <div
                    key={di}
                    title={cell ? `${cell.key}：${cell.count}問` : undefined}
                    className={`h-3.5 w-3.5 rounded-sm ${cell ? cellClass(cell.count) : "bg-transparent"}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2 text-[11px] font-semibold text-ink/50">
        <span>少</span>
        <span className="h-3 w-3 rounded-sm bg-line/60" />
        <span className="h-3 w-3 rounded-sm bg-amber/50" />
        <span className="h-3 w-3 rounded-sm bg-amber" />
        <span className="h-3 w-3 rounded-sm bg-mint" />
        <span>多（目標達成）</span>
      </div>
    </section>
  );
}
