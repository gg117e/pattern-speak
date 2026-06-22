"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { vocabCategories, vocabWords } from "@/data/vocab";
import { isDue } from "@/lib/review";
import { shuffle } from "@/lib/shuffle";
import { getVocabStatesSnapshot, subscribeToVocabStorage } from "@/lib/storage";
import type { ReviewState, VocabWord } from "@/types";
import { VocabSession } from "./VocabSession";

type CategoryChoice = string; // "all" もしくはカテゴリ名
type CountChoice = number | "all";

const categoryLabels: Record<string, string> = {
  daily: "生活",
  work: "仕事",
  food: "食",
  time: "時間",
  feeling: "気持ち",
  place: "場所",
  people: "人"
};

const countChoices: CountChoice[] = [5, 10, 20, "all"];
const emptySnapshot = () => "[]";

export function VocabDeck() {
  const [category, setCategory] = useState<CategoryChoice>("all");
  const [count, setCount] = useState<CountChoice>(10);
  const [deck, setDeck] = useState<{ words: VocabWord[]; title: string } | null>(null);

  const snapshot = useSyncExternalStore(subscribeToVocabStorage, getVocabStatesSnapshot, emptySnapshot);
  const stateMap = useMemo(() => {
    const states = JSON.parse(snapshot) as ReviewState[];
    return Object.fromEntries(states.map((state) => [state.cardId, state])) as Record<string, ReviewState>;
  }, [snapshot]);

  const pool = useMemo(
    () => (category === "all" ? vocabWords : vocabWords.filter((w) => w.category === category)),
    [category]
  );
  const newWords = useMemo(() => pool.filter((w) => !stateMap[w.id]), [pool, stateMap]);
  const dueWords = useMemo(() => pool.filter((w) => isDue(stateMap[w.id])), [pool, stateMap]);

  const startNew = () => {
    const shuffled = shuffle(newWords);
    const picked = count === "all" ? shuffled : shuffled.slice(0, count);
    setDeck({ words: picked, title: "新しい単語" });
  };

  const startReview = () => {
    setDeck({ words: shuffle(dueWords), title: "単語の復習" });
  };

  if (deck) {
    return (
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => setDeck(null)}
          className="focus-ring mb-4 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold text-ink/60 transition hover:text-ink"
        >
          ← 単語メニューに戻る
        </button>
        <VocabSession key={deck.title + deck.words.map((w) => w.id).join(",")} words={deck.words} title={deck.title} doneHref="/vocab" />
      </div>
    );
  }

  const categoryChoices: CategoryChoice[] = ["all", ...vocabCategories];

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
      <p className="text-sm font-bold text-mint">Vocabulary</p>
      <h1 className="mt-2 text-2xl font-black sm:text-3xl">単語学習</h1>
      <p className="mt-3 text-ink/65">日常会話で使う語彙を、意味→英単語の順に思い出す練習です。例文と音声付き。</p>

      <div className="mt-6">
        <div className="text-xs font-bold uppercase tracking-wide text-ink/55">カテゴリ</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {categoryChoices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => setCategory(choice)}
              className={`focus-ring min-h-10 rounded-xl border px-4 py-2 text-sm font-bold transition ${
                category === choice ? "border-mint bg-mint/10 text-mint-deep" : "border-line bg-white text-ink/70 hover:border-mint"
              }`}
            >
              {choice === "all" ? "全部" : categoryLabels[choice] ?? choice}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="text-xs font-bold uppercase tracking-wide text-ink/55">新規学習の語数</div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {countChoices.map((choice) => (
            <button
              key={String(choice)}
              type="button"
              onClick={() => setCount(choice)}
              className={`focus-ring min-h-12 rounded-xl border px-3 py-2 font-bold transition ${
                count === choice ? "border-mint bg-mint/10 text-mint-deep" : "border-line bg-white text-ink/70 hover:border-mint"
              }`}
            >
              {choice === "all" ? "全部" : choice}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={startNew}
          disabled={newWords.length === 0}
          className="focus-ring min-h-14 rounded-xl bg-mint px-5 py-4 text-lg font-black text-white shadow-soft transition hover:bg-mint-deep hover:shadow-lift disabled:opacity-50"
        >
          新しい単語を学ぶ（{newWords.length}）
        </button>
        <button
          type="button"
          onClick={startReview}
          disabled={dueWords.length === 0}
          className="focus-ring min-h-14 rounded-xl border border-ink bg-ink px-5 py-4 text-lg font-black text-white transition hover:bg-ink/90 disabled:opacity-40"
        >
          復習する（{dueWords.length}）
        </button>
      </div>
    </section>
  );
}
