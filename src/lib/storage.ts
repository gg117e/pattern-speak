"use client";

import type { ReviewState } from "@/types";

const REVIEW_STATES_KEY = "speaking-pattern-practice.reviewStates.v1";
const REVIEW_HISTORY_KEY = "speaking-pattern-practice.reviewHistory.v1";
const STORAGE_EVENT = "speaking-pattern-practice.storage";

const canUseStorage = () => typeof window !== "undefined" && Boolean(window.localStorage);

const readJson = <T>(key: string, fallback: T): T => {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = <T>(key: string, value: T) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(STORAGE_EVENT));
};

export const subscribeToReviewStorage = (onStoreChange: () => void) => {
  if (!canUseStorage()) return () => {};

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_EVENT, onStoreChange);
  };
};

export const getReviewStatesSnapshot = () => {
  if (!canUseStorage()) return "[]";
  return window.localStorage.getItem(REVIEW_STATES_KEY) ?? "[]";
};

export const getReviewHistorySnapshot = () => {
  if (!canUseStorage()) return "[]";
  return window.localStorage.getItem(REVIEW_HISTORY_KEY) ?? "[]";
};

export const getReviewStates = (): ReviewState[] => readJson<ReviewState[]>(REVIEW_STATES_KEY, []);

export const saveReviewStates = (states: ReviewState[]) => {
  writeJson(REVIEW_STATES_KEY, states);
};

export const getReviewStateMap = () =>
  Object.fromEntries(getReviewStates().map((state) => [state.cardId, state])) as Record<string, ReviewState>;

export const upsertReviewState = (nextState: ReviewState) => {
  const states = getReviewStates();
  const nextStates = states.some((state) => state.cardId === nextState.cardId)
    ? states.map((state) => (state.cardId === nextState.cardId ? nextState : state))
    : [...states, nextState];

  saveReviewStates(nextStates);
  return nextStates;
};

export const getReviewHistory = (): ReviewState[] => readJson<ReviewState[]>(REVIEW_HISTORY_KEY, []);

export const addReviewHistory = (state: ReviewState) => {
  const history = getReviewHistory();
  writeJson(REVIEW_HISTORY_KEY, [...history, state]);
};
