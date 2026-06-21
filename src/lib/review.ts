import type { Rating, ReviewState } from "@/types";

export const ratingLabels: Record<Rating, string> = {
  again: "もう一度",
  almost: "惜しい",
  good: "できた",
  easy: "すぐ言えた"
};

export const ratingDescriptions: Record<Rating, string> = {
  again: "10分後",
  almost: "1日後",
  good: "理解して言えた",
  easy: "迷わず言えた"
};

const minutes = (value: number) => value * 60 * 1000;
const days = (value: number) => value * 24 * 60 * 60 * 1000;

export const getGoodEasyIntervalMs = (successStreak: number) => {
  if (successStreak <= 0) return days(3);
  if (successStreak === 1) return days(7);
  if (successStreak === 2) return days(14);
  return days(30);
};

export const getNextReviewDate = (rating: Rating, successStreak: number, now = new Date()) => {
  const interval =
    rating === "again"
      ? minutes(10)
      : rating === "almost"
        ? days(1)
        : getGoodEasyIntervalMs(successStreak);

  return new Date(now.getTime() + interval);
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
