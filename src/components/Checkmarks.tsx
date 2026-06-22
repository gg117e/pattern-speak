"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getReviewStatesSnapshot, subscribeToReviewStorage } from "@/lib/storage";
import type { ReviewState } from "@/types";

const emptySnapshot = () => "[]";

// 学習済み（復習状態が存在する）カードIDの集合を購読する。
function useLearnedIds() {
  const snapshot = useSyncExternalStore(subscribeToReviewStorage, getReviewStatesSnapshot, emptySnapshot);
  return useMemo(() => {
    try {
      return new Set((JSON.parse(snapshot) as ReviewState[]).map((state) => state.cardId));
    } catch {
      return new Set<string>();
    }
  }, [snapshot]);
}

// カード1枚が学習済みなら「✓ 学習済み」バッジを表示。
export function CardCheckmark({ cardId }: { cardId: string }) {
  const learned = useLearnedIds().has(cardId);
  if (!learned) return null;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-mint/10 px-2 py-0.5 text-xs font-bold text-mint-deep" title="学習済み">
      <span aria-hidden>✓</span> 学習済み
    </span>
  );
}

// ユニット内のカードの学習状況。全部済みなら✓、一部なら N/M を表示。
export function UnitProgressBadge({ cardIds }: { cardIds: string[] }) {
  const learnedIds = useLearnedIds();
  const learned = cardIds.filter((id) => learnedIds.has(id)).length;
  const total = cardIds.length;
  if (learned === 0) return null;
  const done = learned >= total;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${done ? "bg-mint text-white" : "bg-amber/15 text-amber"}`}
      title={done ? "学習済み" : `${learned} / ${total} 学習済み`}
    >
      {done ? (
        <>
          <span aria-hidden>✓</span> 学習済み
        </>
      ) : (
        <>{learned} / {total}</>
      )}
    </span>
  );
}
