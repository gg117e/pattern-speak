"use client";

import { useMemo, useState } from "react";
import { cards } from "@/data/cards";
import { sections } from "@/data/sections";
import { shuffle } from "@/lib/shuffle";
import type { Card, Section } from "@/types";
import { StudySession } from "./StudySession";

type SectionChoice = Section | "all";
type CountChoice = number | "all";

const sectionChoices: { id: SectionChoice; label: string }[] = [
  { id: "all", label: "全章" },
  ...sections.map((s) => ({ id: s.id as SectionChoice, label: s.shortName }))
];

const countChoices: CountChoice[] = [5, 10, 20, "all"];

export function PracticeDeck() {
  const [section, setSection] = useState<SectionChoice>("all");
  const [count, setCount] = useState<CountChoice>(10);
  const [deck, setDeck] = useState<Card[] | null>(null);

  const available = useMemo(
    () => (section === "all" ? cards : cards.filter((card) => card.section === section)),
    [section]
  );

  const start = () => {
    const shuffled = shuffle(available);
    setDeck(count === "all" ? shuffled : shuffled.slice(0, count));
  };

  if (deck) {
    return (
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => setDeck(null)}
          className="focus-ring mb-4 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold text-ink/60 transition hover:text-ink"
        >
          ← 設定に戻る
        </button>
        <StudySession key={deck.map((c) => c.id).join(",")} cards={deck} title="ランダム練習" doneHref="/" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
      <p className="text-sm font-bold text-mint">Practice</p>
      <h1 className="mt-2 text-2xl font-black sm:text-3xl">ランダム練習</h1>
      <p className="mt-3 text-ink/65">章と問題数を選んで、ランダムに出題します。自己評価は復習スケジュールに記録されます。</p>

      <div className="mt-6">
        <div className="text-xs font-bold uppercase tracking-wide text-ink/55">章を選ぶ</div>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {sectionChoices.map((choice) => (
            <button
              key={choice.id}
              type="button"
              onClick={() => setSection(choice.id)}
              className={`focus-ring min-h-12 rounded-xl border px-3 py-2 font-bold transition ${
                section === choice.id ? "border-mint bg-mint/10 text-mint-deep" : "border-line bg-white text-ink/70 hover:border-mint"
              }`}
            >
              {choice.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="text-xs font-bold uppercase tracking-wide text-ink/55">問題数</div>
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

      <p className="mt-5 text-sm font-semibold text-ink/55">
        この章のカード数: {available.length}
        {count !== "all" && available.length > count ? `（${count}問を出題）` : "（全問を出題）"}
      </p>

      <button
        type="button"
        onClick={start}
        disabled={available.length === 0}
        className="focus-ring mt-4 min-h-14 w-full rounded-xl bg-mint px-5 py-4 text-lg font-black text-white shadow-soft transition hover:bg-mint-deep hover:shadow-lift disabled:opacity-50"
      >
        練習を始める
      </button>
    </section>
  );
}
