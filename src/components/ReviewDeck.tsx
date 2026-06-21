"use client";

import { useMemo, useSyncExternalStore } from "react";
import { cards } from "@/data/cards";
import { isDue } from "@/lib/review";
import { getReviewStatesSnapshot, subscribeToReviewStorage } from "@/lib/storage";
import type { ReviewState } from "@/types";
import { StudySession } from "./StudySession";

const emptySnapshot = () => "[]";

export function ReviewDeck() {
  const snapshot = useSyncExternalStore(subscribeToReviewStorage, getReviewStatesSnapshot, emptySnapshot);
  const dueCards = useMemo(() => {
    const states = JSON.parse(snapshot) as ReviewState[];
    const stateMap = Object.fromEntries(states.map((state) => [state.cardId, state])) as Record<string, ReviewState>;
    return cards.filter((card) => isDue(stateMap[card.id]));
  }, [snapshot]);

  if (dueCards.length === 0) {
    return (
      <section className="rounded-lg border border-line bg-white p-6 text-center shadow-soft">
        <p className="text-sm font-bold text-mint">Review</p>
        <h1 className="mt-3 text-2xl font-black">今日の復習はありません</h1>
        <p className="mt-3 text-ink/65">新しいUnitを学習すると、自己評価に応じて復習予定が作られます。</p>
      </section>
    );
  }

  return <StudySession cards={dueCards} title="Review" emptyMessage="今日の復習はありません" doneHref="/" />;
}
