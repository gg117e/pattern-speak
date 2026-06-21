import type { Rating, ReviewState } from "@/types";

export const ratingLabels: Record<Rating, string> = {
  again: "もう一度",
  almost: "あいまい",
  good: "言えた",
  easy: "スラスラ"
};

const minutes = (value: number) => value * 60 * 1000;
const days = (value: number) => value * 24 * 60 * 60 * 1000;

export const getGoodEasyIntervalMs = (rating: "good" | "easy", successStreak: number) => {
  const base =
    successStreak <= 0 ? days(3) : successStreak === 1 ? days(7) : successStreak === 2 ? days(14) : days(30);
  // easy は good より一段先まで定着しているとみなし、間隔を長めにする
  return rating === "easy" ? base * 2 : base;
};

export const getNextReviewIntervalMs = (rating: Rating, successStreak: number) =>
  rating === "again"
    ? minutes(10)
    : rating === "almost"
      ? days(1)
      : getGoodEasyIntervalMs(rating, successStreak);

export const getNextReviewDate = (rating: Rating, successStreak: number, now = new Date()) =>
  new Date(now.getTime() + getNextReviewIntervalMs(rating, successStreak));

// 自己評価ボタンのサブ表記「次にいつ復習するか」を全段階で統一して返す
export const formatNextInterval = (rating: Rating, successStreak: number) => {
  const ms = getNextReviewIntervalMs(rating, successStreak);
  const dayMs = days(1);
  if (ms < dayMs) {
    const mins = Math.round(ms / minutes(1));
    return `約${mins}分後`;
  }
  const dayCount = Math.round(ms / dayMs);
  return `${dayCount}日後`;
};

export const buildNextReviewState = (
  cardId: string,
  rating: Rating,
  previous?: ReviewState,
  now = new Date()
): ReviewState => {
  const previousStreak = previous?.successStreak ?? 0;
  const isSuccess = rating === "good" || rating === "easy";
  const successStreak = isSuccess ? previousStreak + 1 : 0;
  const nextReviewAt = getNextReviewDate(rating, previousStreak, now);

  return {
    cardId,
    rating,
    reviewedAt: now.toISOString(),
    nextReviewAt: nextReviewAt.toISOString(),
    successStreak,
    reviewCount: (previous?.reviewCount ?? 0) + 1,
    mistakeCount: (previous?.mistakeCount ?? 0) + (isSuccess ? 0 : 1)
  };
};

export const isDue = (state: ReviewState | undefined, now = new Date()) => {
  if (!state) return false;
  return new Date(state.nextReviewAt).getTime() <= now.getTime();
};
