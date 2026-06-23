"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { cards } from "@/data/cards";
import { units } from "@/data/units";
import { getReviewStatesSnapshot, subscribeToReviewStorage } from "@/lib/storage";
import type { ReviewState } from "@/types";

const emptySnapshot = () => "[]";

// ユニットごとのカードID一覧（学習順）。
const unitCardIds = units.map((unit) => ({
  unit,
  cardIds: cards.filter((card) => card.unitId === unit.id).map((card) => card.id)
}));

export function ResumeButton() {
  const snapshot = useSyncExternalStore(subscribeToReviewStorage, getReviewStatesSnapshot, emptySnapshot);

  const { learnedSize, resumeUnit } = useMemo(() => {
    let learned: Set<string>;
    try {
      learned = new Set((JSON.parse(snapshot) as ReviewState[]).map((state) => state.cardId));
    } catch {
      learned = new Set<string>();
    }
    // まだ全カードを学習していない最初のユニット = 次に学ぶユニット。
    const next = unitCardIds.find(({ cardIds }) => cardIds.some((id) => !learned.has(id)));
    return { learnedSize: learned.size, resumeUnit: next?.unit };
  }, [snapshot]);

  // 全ユニット学習済みなら総復習へ。
  if (!resumeUnit) {
    return (
      <Link
        href="/review"
        className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-mint px-5 py-3 text-center text-base font-bold text-white transition hover:bg-mint/90"
      >
        全ユニット学習済み！復習する
      </Link>
    );
  }

  const label = learnedSize > 0 ? `次のユニット「${resumeUnit.title}」から始める` : `「${resumeUnit.title}」から始める`;

  return (
    <Link
      href={`/study/${resumeUnit.id}`}
      className="focus-ring inline-flex min-h-12 items-center justify-center rounded-lg bg-mint px-5 py-3 text-center text-base font-bold text-white transition hover:bg-mint/90"
    >
      {label}
    </Link>
  );
}
