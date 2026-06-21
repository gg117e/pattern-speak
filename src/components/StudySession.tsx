"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ratingDescriptions, ratingLabels, buildNextReviewState } from "@/lib/review";
import { addReviewHistory, getReviewStateMap, upsertReviewState } from "@/lib/storage";
import { useSpeech } from "@/hooks/useSpeech";
import type { Card, Rating } from "@/types";

type StudySessionProps = {
  cards: Card[];
  title: string;
  emptyMessage?: string;
  doneHref?: string;
};

const ratings: Rating[] = ["again", "almost", "good", "easy"];

const ratingStyles: Record<Rating, string> = {
  again: "border-coral bg-coral/10 text-coral",
  almost: "border-amber bg-amber/10 text-amber",
  good: "border-mint bg-mint/10 text-mint",
  easy: "border-ink bg-ink text-white"
};

export function StudySession({ cards, title, emptyMessage = "カードがありません", doneHref = "/" }: StudySessionProps) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [memo, setMemo] = useState("");
  const [finished, setFinished] = useState(cards.length === 0);
  const speech = useSpeech();

  const card = cards[index];
  const progressText = useMemo(() => `${Math.min(index + 1, cards.length)} / ${cards.length}`, [cards.length, index]);

  const handleRating = (rating: Rating) => {
    if (!card) return;

    const previous = getReviewStateMap()[card.id];
    const nextState = buildNextReviewState(card.id, rating, previous);
    upsertReviewState(nextState);
    addReviewHistory(nextState);

    speech.stop();
    setMemo("");
    setShowAnswer(false);

    if (index + 1 >= cards.length) {
      setFinished(true);
    } else {
      setIndex((current) => current + 1);
    }
  };

  if (finished) {
    return (
      <section className="rounded-lg border border-line bg-white p-6 text-center shadow-soft">
        <p className="text-sm font-bold text-mint">{title}</p>
        <h1 className="mt-3 text-2xl font-black">完了しました</h1>
        <p className="mt-3 text-ink/65">{cards.length === 0 ? emptyMessage : "今日の分はここまでです。"}</p>
        <Link href={doneHref} className="focus-ring mt-6 inline-flex min-h-12 items-center justify-center rounded-lg bg-mint px-6 py-3 font-bold text-white">
          戻る
        </Link>
      </section>
    );
  }

  if (!card) {
    return (
      <section className="rounded-lg border border-line bg-white p-6 text-center shadow-soft">
        <h1 className="text-2xl font-black">{emptyMessage}</h1>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm font-semibold text-ink/60">
        <span>{title}</span>
        <span>{progressText}</span>
      </div>

      <article className="rounded-lg border border-line bg-white p-5 shadow-soft sm:p-7">
        <div className="rounded-lg bg-paper p-4">
          <div className="text-xs font-bold uppercase tracking-wide text-ink/45">日本語</div>
          <h1 className="mt-2 text-2xl font-black leading-snug text-ink sm:text-3xl">{card.questionJa}</h1>
        </div>

        <div className="mt-5">
          <div className="text-xs font-bold uppercase tracking-wide text-ink/45">使う表現パターン</div>
          <div className="mt-2 rounded-lg border border-line bg-white px-4 py-3 text-xl font-black text-mint">
            {card.pattern}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-xs font-bold uppercase tracking-wide text-ink/45">ヒント</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {card.hints.map((hint) => (
              <span key={hint} className="rounded-lg bg-amber/12 px-3 py-2 text-sm font-bold text-ink/75">
                {hint}
              </span>
            ))}
          </div>
        </div>

        <label className="mt-5 block">
          <span className="text-xs font-bold uppercase tracking-wide text-ink/45">任意メモ</span>
          <textarea value={memo} onChange={(event) => setMemo(event.target.value)} rows={3} placeholder="自分の回答や気づきを残せます" className="focus-ring mt-2 w-full resize-none rounded-lg border border-line bg-white px-4 py-3 text-base" />
        </label>

        {!showAnswer ? (
          <button type="button" onClick={() => setShowAnswer(true)} className="focus-ring mt-6 min-h-14 w-full rounded-lg bg-mint px-5 py-4 text-lg font-black text-white transition hover:bg-mint/90">
            答えを見る
          </button>
        ) : (
          <div className="mt-6 space-y-5">
            <div className="rounded-lg border border-mint/30 bg-mint/5 p-4">
              <div className="text-xs font-bold uppercase tracking-wide text-mint">模範解答</div>
              <p className="mt-2 text-2xl font-black leading-snug text-ink">{card.answerEn}</p>
            </div>

            <div className="rounded-lg border border-line p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold">音声読み上げ</div>
                  <div className="mt-1 text-sm text-ink/60">速度を選んで、全文またはチャンクごとに聞けます。</div>
                </div>
                <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-line text-sm font-bold">
                  <button type="button" onClick={() => speech.setRate("normal")} className={`px-3 py-2 ${speech.rate === "normal" ? "bg-ink text-white" : "bg-white text-ink/65"}`}>普通</button>
                  <button type="button" onClick={() => speech.setRate("slow")} className={`px-3 py-2 ${speech.rate === "slow" ? "bg-ink text-white" : "bg-white text-ink/65"}`}>ゆっくり</button>
                </div>
              </div>

              {!speech.supported ? (
                <p className="mt-4 rounded-lg bg-coral/10 px-3 py-2 text-sm font-semibold text-coral">このブラウザは音声読み上げに対応していません。</p>
              ) : (
                <div className="mt-4 space-y-3">
                  <button type="button" onClick={() => speech.speak(card.answerEn)} className="focus-ring min-h-12 w-full rounded-lg bg-ink px-4 py-3 font-bold text-white">全文を聞く</button>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {card.chunks.map((chunk) => (
                      <button key={chunk} type="button" onClick={() => speech.speak(chunk)} className="focus-ring min-h-12 rounded-lg border border-line bg-white px-4 py-3 text-left text-sm font-bold text-ink transition hover:bg-paper">
                        {chunk}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <div className="text-sm font-bold">自己評価</div>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ratings.map((rating) => (
                  <button key={rating} type="button" onClick={() => handleRating(rating)} className={`focus-ring min-h-16 rounded-lg border px-3 py-3 text-center font-black ${ratingStyles[rating]}`}>
                    <span className="block">{ratingLabels[rating]}</span>
                    <span className="mt-1 block text-xs font-semibold opacity-75">{ratingDescriptions[rating]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>
    </section>
  );
}
