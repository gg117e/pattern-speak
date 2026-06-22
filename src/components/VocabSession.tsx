"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatNextInterval, ratingLabels, buildNextReviewState } from "@/lib/review";
import { getVocabStateMap, recordActivity, upsertVocabState } from "@/lib/storage";
import { useSpeech } from "@/hooks/useSpeech";
import type { Rating, VocabWord } from "@/types";

type VocabSessionProps = {
  words: VocabWord[];
  title: string;
  emptyMessage?: string;
  doneHref?: string;
};

const ratings: Rating[] = ["again", "almost", "good", "easy"];

const ratingStyles: Record<Rating, string> = {
  again: "border-coral/40 bg-coral/10 text-coral hover:border-coral",
  almost: "border-amber/40 bg-amber/10 text-amber hover:border-amber",
  good: "border-mint/40 bg-mint/10 text-mint-deep hover:border-mint",
  easy: "border-ink bg-ink text-white hover:bg-ink/90"
};

export function VocabSession({ words, title, emptyMessage = "単語がありません", doneHref = "/vocab" }: VocabSessionProps) {
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [prevStreak, setPrevStreak] = useState(0);
  const [finished, setFinished] = useState(words.length === 0);
  const speech = useSpeech();

  const word = words[index];
  const progressText = useMemo(() => `${Math.min(index + 1, words.length)} / ${words.length}`, [words.length, index]);
  const progressPercent = words.length === 0 ? 0 : Math.round((index / words.length) * 100);

  const revealAnswer = () => {
    if (word) setPrevStreak(getVocabStateMap()[word.id]?.successStreak ?? 0);
    setShowAnswer(true);
  };

  const handleRating = (rating: Rating) => {
    if (!word) return;

    const previous = getVocabStateMap()[word.id];
    const nextState = buildNextReviewState(word.id, rating, previous);
    upsertVocabState(nextState);
    recordActivity();

    speech.stop();
    setShowAnswer(false);

    if (index + 1 >= words.length) {
      setFinished(true);
    } else {
      setIndex((current) => current + 1);
    }
  };

  // キーボードショートカット: Space/A=答えを開く / P=単語を再生 / 1〜4=自己評価
  useEffect(() => {
    if (finished || !word) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      if (event.code === "Space") {
        event.preventDefault();
        if (!showAnswer) revealAnswer();
        return;
      }
      const key = event.key.toLowerCase();
      if (key === "a" && !showAnswer) {
        event.preventDefault();
        revealAnswer();
        return;
      }
      if (key === "p" && showAnswer && speech.supported) {
        event.preventDefault();
        speech.speak(word.word);
        return;
      }
      if (showAnswer && ["1", "2", "3", "4"].includes(event.key)) {
        event.preventDefault();
        handleRating(ratings[Number(event.key) - 1]);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, word, showAnswer, speech]);

  if (finished) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-bold text-mint">{title}</p>
        <h1 className="mt-3 text-2xl font-black">完了しました 🎉</h1>
        <p className="mt-3 text-ink/65">{words.length === 0 ? emptyMessage : "このセットはここまでです。"}</p>
        <Link href={doneHref} className="focus-ring mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-mint px-6 py-3 font-bold text-white transition hover:bg-mint-deep">
          戻る
        </Link>
      </section>
    );
  }

  if (!word) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-8 text-center shadow-soft">
        <h1 className="text-2xl font-black">{emptyMessage}</h1>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-ink/60">
          <span>{title}</span>
          <span className="tabular-nums">{progressText}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-line/70" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-mint transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <article className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-7">
        <div className="rounded-xl bg-paper p-5">
          <div className="text-xs font-bold uppercase tracking-wide text-ink/55">この意味の英単語は？</div>
          <h1 className="mt-2 text-2xl font-black leading-snug text-ink sm:text-3xl">{word.meaningJa}</h1>
        </div>

        {!showAnswer ? (
          <button type="button" onClick={revealAnswer} className="focus-ring mt-4 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-mint px-5 py-4 text-lg font-black text-white shadow-soft transition hover:bg-mint-deep hover:shadow-lift">
            答えを見る
            <kbd className="rounded border border-white/50 px-1.5 text-[11px] font-bold opacity-80">A</kbd>
          </button>
        ) : (
          <div className="mt-4 space-y-6">
            <div className="animate-reveal-up rounded-xl border border-mint/30 bg-mint/5 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-mint-deep">単語</div>
                  <p className="mt-2 text-3xl font-black leading-snug text-ink">{word.word}</p>
                </div>
                {speech.supported && (
                  <div className="flex shrink-0 flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={() => speech.speak(word.word)}
                      aria-label="単語を音声で聞く"
                      title="再生 (P)"
                      className={`focus-ring flex h-12 w-12 items-center justify-center rounded-full bg-mint text-white transition hover:bg-mint-deep ${speech.speaking ? "animate-pulse" : ""}`}
                    >
                      <span aria-hidden className="text-xl">🔊</span>
                    </button>
                    <kbd className="rounded border border-mint/40 px-1.5 text-[10px] font-bold text-mint-deep opacity-70">P</kbd>
                  </div>
                )}
              </div>

              <div className="mt-4 border-t border-mint/20 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-ink/55">例文</div>
                    <p className="mt-1 text-lg font-bold text-ink">{word.exampleEn}</p>
                    <p className="mt-1 text-sm text-ink/65">{word.exampleJa}</p>
                  </div>
                  {speech.supported && (
                    <button
                      type="button"
                      onClick={() => speech.speak(word.exampleEn)}
                      aria-label="例文を音声で聞く"
                      className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-mint/40 text-mint-deep transition hover:bg-mint/10"
                    >
                      <span aria-hidden>🔊</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold">自己評価</div>
              <p className="mt-1 text-xs text-ink/55">覚えていたかを選ぶと、復習タイミングが決まります。</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ratings.map((rating, i) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRating(rating)}
                    className={`focus-ring min-h-20 rounded-xl border px-3 py-3 text-center font-black transition ${ratingStyles[rating]}`}
                  >
                    <span className="block text-base">{ratingLabels[rating]}</span>
                    <span className="mt-1 block text-xs font-semibold opacity-80">{formatNextInterval(rating, prevStreak)}</span>
                    <span className="mt-1 block text-[10px] font-bold opacity-50">{i + 1}</span>
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
