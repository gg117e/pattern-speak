"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getProgressSummary } from "@/lib/progress";
import { getReviewStatesSnapshot, subscribeToReviewStorage } from "@/lib/storage";
import type { ReviewState } from "@/types";

const emptySnapshot = () => "[]";

export function ProgressSnapshot() {
  const snapshot = useSyncExternalStore(subscribeToReviewStorage, getReviewStatesSnapshot, emptySnapshot);
  const summary = useMemo(() => getProgressSummary(JSON.parse(snapshot) as ReviewState[]), [snapshot]);

  const stats = [
    { label: "今日の復習", value: summary.dueCount },
    { label: "全カード", value: summary.totalCards },
    { label: "学習済み", value: summary.learnedCount }
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-lg border border-line bg-white p-4 shadow-soft">
          <div className="text-xs font-semibold text-ink/55">{stat.label}</div>
          <div className="mt-2 text-3xl font-black text-ink">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}
