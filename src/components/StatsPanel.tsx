"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getProgressSummary } from "@/lib/progress";
import { getReviewHistorySnapshot, getReviewStatesSnapshot, getVocabStatesSnapshot, subscribeToReviewStorage, subscribeToVocabStorage } from "@/lib/storage";
import { isDue, ratingLabels } from "@/lib/review";
import { vocabWords } from "@/data/vocab";
import type { Rating, ReviewState } from "@/types";
import { SectionProgress } from "./SectionProgress";
import { DailyGoalCard } from "./DailyGoalCard";
import { StreakCalendar } from "./StreakCalendar";

const ratings: Rating[] = ["again", "almost", "good", "easy"];
const emptySnapshot = () => "[]";

export function StatsPanel() {
  const statesSnapshot = useSyncExternalStore(subscribeToReviewStorage, getReviewStatesSnapshot, emptySnapshot);
  const historySnapshot = useSyncExternalStore(subscribeToReviewStorage, getReviewHistorySnapshot, emptySnapshot);
  const states = useMemo(() => JSON.parse(statesSnapshot) as ReviewState[], [statesSnapshot]);
  const history = useMemo(() => JSON.parse(historySnapshot) as ReviewState[], [historySnapshot]);

  const vocabSnapshot = useSyncExternalStore(subscribeToVocabStorage, getVocabStatesSnapshot, emptySnapshot);
  const vocabStates = useMemo(() => JSON.parse(vocabSnapshot) as ReviewState[], [vocabSnapshot]);
  const vocabStats = useMemo(() => {
    const map = Object.fromEntries(vocabStates.map((state) => [state.cardId, state])) as Record<string, ReviewState>;
    return {
      total: vocabWords.length,
      learned: vocabStates.length,
      due: vocabWords.filter((word) => isDue(map[word.id])).length
    };
  }, [vocabStates]);

  const summary = useMemo(() => getProgressSummary(states), [states]);
  const ratingCounts = useMemo(
    () => Object.fromEntries(ratings.map((rating) => [rating, history.filter((item) => item.rating === rating).length])) as Record<Rating, number>,
    [history]
  );

  return (
    <div className="space-y-6">
      <DailyGoalCard />

      <StreakCalendar />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft"><div className="text-sm font-semibold text-ink/55">学習済みカード</div><div className="mt-2 text-3xl font-black">{summary.learnedCount}</div></div>
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft"><div className="text-sm font-semibold text-ink/55">復習回数</div><div className="mt-2 text-3xl font-black">{history.length}</div></div>
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft"><div className="text-sm font-semibold text-ink/55">今日の復習</div><div className="mt-2 text-3xl font-black">{summary.dueCount}</div></div>
        <div className="rounded-lg border border-line bg-white p-4 shadow-soft"><div className="text-sm font-semibold text-ink/55">全カード</div><div className="mt-2 text-3xl font-black">{summary.totalCards}</div></div>
      </div>

      <section>
        <h2 className="text-lg font-black">自己評価の回数</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ratings.map((rating) => (
            <div key={rating} className="rounded-lg border border-line bg-white p-4 shadow-soft">
              <div className="text-sm font-bold text-ink/60">{ratingLabels[rating]}</div>
              <div className="mt-2 text-3xl font-black text-mint">{ratingCounts[rating]}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-black">単語学習</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-line bg-white p-4 shadow-soft"><div className="text-sm font-semibold text-ink/55">学習済み単語</div><div className="mt-2 text-3xl font-black">{vocabStats.learned}</div></div>
          <div className="rounded-lg border border-line bg-white p-4 shadow-soft"><div className="text-sm font-semibold text-ink/55">今日の単語復習</div><div className="mt-2 text-3xl font-black">{vocabStats.due}</div></div>
          <div className="rounded-lg border border-line bg-white p-4 shadow-soft"><div className="text-sm font-semibold text-ink/55">全単語</div><div className="mt-2 text-3xl font-black">{vocabStats.total}</div></div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-black">セクション別の進捗</h2>
        <div className="mt-3"><SectionProgress /></div>
      </section>
    </div>
  );
}
