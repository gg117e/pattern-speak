"use client";

import { useMemo, useSyncExternalStore } from "react";
import {
  getActivitySnapshot,
  getDailyGoal,
  getDailyGoalSnapshot,
  setDailyGoal,
  subscribeToActivity
} from "@/lib/storage";
import { computeLongestStreak, computeStreak, getTodayCount } from "@/lib/streak";

const emptyActivity = () => "{}";
const defaultGoal = () => "20";

export function DailyGoalCard() {
  const activitySnapshot = useSyncExternalStore(subscribeToActivity, getActivitySnapshot, emptyActivity);
  const goalSnapshot = useSyncExternalStore(subscribeToActivity, getDailyGoalSnapshot, defaultGoal);

  const activityMap = useMemo(() => {
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

  const todayCount = getTodayCount(activityMap);
  const streak = computeStreak(activityMap);
  const longest = computeLongestStreak(activityMap);
  const percent = Math.min(100, Math.round((todayCount / goal) * 100));
  const reached = todayCount >= goal;
  const reminder =
    todayCount === 0
      ? "今日はまだ学習していません。1問から始めましょう。"
      : reached
        ? "今日の目標を達成しました 🎉"
        : `あと ${goal - todayCount} 問で今日の目標達成です。`;

  return (
    <section className="rounded-2xl border border-line bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-ink/55">今日の学習</div>
          <div className="mt-1 text-2xl font-black text-ink">
            {todayCount}
            <span className="text-base font-bold text-ink/45"> / {goal} 問</span>
            {reached && <span className="ml-2 text-base text-mint-deep">達成！</span>}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold uppercase tracking-wide text-ink/55">連続</div>
          <div className="mt-1 text-2xl font-black text-amber">🔥 {streak}<span className="text-base font-bold text-ink/45"> 日</span></div>
          <div className="mt-0.5 text-xs font-bold text-mint-deep">🏆 最長 {longest} 日</div>
        </div>
      </div>

      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-line/70" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <div className={`h-full rounded-full transition-all duration-300 ${reached ? "bg-mint" : "bg-amber"}`} style={{ width: `${percent}%` }} />
      </div>

      <p className={`mt-2 text-sm font-semibold ${reached ? "text-mint-deep" : "text-ink/60"}`}>{reminder}</p>

      <div className="mt-3 flex items-center justify-end gap-2 text-sm">
        <span className="font-semibold text-ink/55">1日の目標</span>
        <button
          type="button"
          onClick={() => setDailyGoal(goal - 5)}
          aria-label="目標を5減らす"
          className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-line font-black text-ink/70 transition hover:border-mint disabled:opacity-40"
          disabled={goal <= 5}
        >
          −
        </button>
        <span className="min-w-10 text-center font-black text-ink">{goal}</span>
        <button
          type="button"
          onClick={() => setDailyGoal(goal + 5)}
          aria-label="目標を5増やす"
          className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg border border-line font-black text-ink/70 transition hover:border-mint"
        >
          ＋
        </button>
      </div>
    </section>
  );
}
