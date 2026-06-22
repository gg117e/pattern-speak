"use client";

import type { ReviewState } from "@/types";
import { todayKey } from "./streak";

const REVIEW_STATES_KEY = "speaking-pattern-practice.reviewStates.v1";
const REVIEW_HISTORY_KEY = "speaking-pattern-practice.reviewHistory.v1";
const VOCAB_STATES_KEY = "speaking-pattern-practice.vocabStates.v1";
const ACTIVITY_KEY = "speaking-pattern-practice.activity.v1";
const DAILY_GOAL_KEY = "speaking-pattern-practice.dailyGoal.v1";
const DEFAULT_DAILY_GOAL = 20;
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

// 単語学習のSRS状態（フレーズとは別キーで保存し、フレーズ統計を汚さない）。
// ReviewState 型を流用し、cardId に単語IDを格納する。
export const subscribeToVocabStorage = subscribeToReviewStorage;

export const getVocabStatesSnapshot = () => {
  if (!canUseStorage()) return "[]";
  return window.localStorage.getItem(VOCAB_STATES_KEY) ?? "[]";
};

export const getVocabStates = (): ReviewState[] => readJson<ReviewState[]>(VOCAB_STATES_KEY, []);

export const saveVocabStates = (states: ReviewState[]) => {
  writeJson(VOCAB_STATES_KEY, states);
};

export const getVocabStateMap = () =>
  Object.fromEntries(getVocabStates().map((state) => [state.cardId, state])) as Record<string, ReviewState>;

export const upsertVocabState = (nextState: ReviewState) => {
  const states = getVocabStates();
  const nextStates = states.some((state) => state.cardId === nextState.cardId)
    ? states.map((state) => (state.cardId === nextState.cardId ? nextState : state))
    : [...states, nextState];

  saveVocabStates(nextStates);
  return nextStates;
};

// 全アクティビティ共通の活動ログ（日付 -> 学習回数）。目標・ストリークの集計に使う。
export const subscribeToActivity = subscribeToReviewStorage;

export const getActivitySnapshot = () => {
  if (!canUseStorage()) return "{}";
  return window.localStorage.getItem(ACTIVITY_KEY) ?? "{}";
};

export const getActivityMap = (): Record<string, number> => readJson<Record<string, number>>(ACTIVITY_KEY, {});

export const recordActivity = (count = 1) => {
  const map = getActivityMap();
  const key = todayKey();
  writeJson(ACTIVITY_KEY, { ...map, [key]: (map[key] ?? 0) + count });
};

export const getDailyGoalSnapshot = () => {
  if (!canUseStorage()) return String(DEFAULT_DAILY_GOAL);
  return window.localStorage.getItem(DAILY_GOAL_KEY) ?? String(DEFAULT_DAILY_GOAL);
};

export const getDailyGoal = (): number => {
  const value = readJson<number>(DAILY_GOAL_KEY, DEFAULT_DAILY_GOAL);
  return Number.isFinite(value) && value > 0 ? value : DEFAULT_DAILY_GOAL;
};

export const setDailyGoal = (goal: number) => {
  writeJson(DAILY_GOAL_KEY, Math.max(1, Math.round(goal)));
};
