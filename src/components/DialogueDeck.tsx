"use client";

import { useState } from "react";
import { dialogues } from "@/data/dialogues";
import type { Dialogue } from "@/types";
import { DialogueSession } from "./DialogueSession";

export function DialogueDeck() {
  const [active, setActive] = useState<Dialogue | null>(null);

  if (active) {
    return <DialogueSession key={active.id} dialogue={active} onExit={() => setActive(null)} />;
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-8">
        <p className="text-sm font-bold text-mint">Dialogue</p>
        <h1 className="mt-2 text-2xl font-black sm:text-3xl">ミニ対話練習</h1>
        <p className="mt-3 text-ink/65">学んだ型をつなげて、短い会話として口に出す練習です。相手のセリフに、型を使って応答します。</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {dialogues.map((dialogue) => {
          const youPatterns = Array.from(new Set(dialogue.turns.filter((t) => t.pattern).map((t) => t.pattern as string)));
          return (
            <button
              key={dialogue.id}
              type="button"
              onClick={() => setActive(dialogue)}
              className="focus-ring rounded-2xl border border-line bg-white p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-mint"
            >
              <div className="text-lg font-black text-ink">{dialogue.title}</div>
              <p className="mt-1 text-sm text-ink/60">{dialogue.sceneJa}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {youPatterns.map((pattern) => (
                  <span key={pattern} className="rounded-lg bg-mint/10 px-2 py-1 text-xs font-bold text-mint-deep">{pattern}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
