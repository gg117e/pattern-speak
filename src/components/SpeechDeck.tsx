"use client";

import { useState } from "react";
import { speechTopics } from "@/data/speeches";
import type { SpeechTopic } from "@/types";
import { SpeechSession } from "./SpeechSession";

export function SpeechDeck() {
  const [active, setActive] = useState<SpeechTopic | null>(null);

  if (active) {
    return <SpeechSession key={active.id} topic={active} onExit={() => setActive(null)} />;
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-bold text-mint">Speak</p>
        <h1 className="mt-2 text-2xl font-black sm:text-3xl">意見スピーチ（PREP）</h1>
        <p className="mt-3 text-ink/65">1つのテーマについて「意見 → 理由 → 例 → まとめ」を1文ずつ組み立て、最後に数文をつなげて話す練習です。</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {speechTopics.map((topic) => (
          <button
            key={topic.id}
            type="button"
            onClick={() => setActive(topic)}
            className="focus-ring rounded-2xl border border-line bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-mint"
          >
            <div className="text-lg font-black text-ink">{topic.title}</div>
            <p className="mt-1 text-sm text-ink/60">{topic.questionJa}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {topic.steps.map((s) => (
                <span key={s.label} className="rounded-lg bg-mint/10 px-2 py-1 text-xs font-bold text-mint-deep">{s.label}</span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
