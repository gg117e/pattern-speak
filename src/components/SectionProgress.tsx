"use client";

import { useMemo, useSyncExternalStore } from "react";
import { sectionMap } from "@/data/sections";
import { getProgressSummary } from "@/lib/progress";
import { getReviewStatesSnapshot, subscribeToReviewStorage } from "@/lib/storage";
import type { ReviewState } from "@/types";

const emptySnapshot = () => "[]";

export function SectionProgress() {
  const snapshot = useSyncExternalStore(subscribeToReviewStorage, getReviewStatesSnapshot, emptySnapshot);
  const summary = useMemo(() => getProgressSummary(JSON.parse(snapshot) as ReviewState[]), [snapshot]);

  return (
    <div className="space-y-3">
      {summary.bySection.map((item) => {
        const percent = item.total === 0 ? 0 : Math.round((item.learned / item.total) * 100);

        return (
          <div key={item.section} className="rounded-lg border border-line bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-bold">{sectionMap[item.section].name}</div>
                <div className="mt-1 text-sm text-ink/60">
                  {item.learned} / {item.total} cards
                </div>
              </div>
              <div className="text-xl font-black text-mint">{percent}%</div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-line">
              <div className="h-2 rounded-full bg-mint" style={{ width: `${percent}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
