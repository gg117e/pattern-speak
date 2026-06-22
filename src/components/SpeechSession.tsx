"use client";

import { useEffect, useMemo, useState } from "react";
import { recordActivity } from "@/lib/storage";
import { useSpeech } from "@/hooks/useSpeech";
import type { SpeechTopic } from "@/types";

type SpeechSessionProps = {
  topic: SpeechTopic;
  onExit: () => void;
};

export function SpeechSession({ topic, onExit }: SpeechSessionProps) {
  const { steps } = topic;
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const speech = useSpeech();

  const finished = step >= steps.length;
  const activeStep = finished ? undefined : steps[step];
  const progressPercent = Math.round((Math.min(step, steps.length) / steps.length) * 100);
  const fullParagraph = useMemo(() => steps.map((s) => s.en).join(" "), [steps]);

  const advance = () => {
    const next = step + 1;
    if (next >= steps.length) {
      recordActivity();
      setStep(steps.length);
    } else {
      setStep(next);
    }
    setShowAnswer(false);
  };

  const primaryAction = () => {
    if (!activeStep) return;
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      speech.stop();
      advance();
    }
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const key = event.key.toLowerCase();

      if (event.code === "Space" || key === "a") {
        if (!finished) {
          event.preventDefault();
          primaryAction();
        }
        return;
      }
      if (key === "p" && speech.supported && activeStep && showAnswer) {
        event.preventDefault();
        speech.speak(activeStep.en);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, activeStep, showAnswer, speech]);

  const visibleSteps = finished ? steps : steps.slice(0, step + 1);

  return (
    <section className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={onExit}
        className="focus-ring mb-4 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold text-ink/60 transition hover:text-ink"
      >
        ← トピック一覧に戻る
      </button>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-ink/60">
          <span>{topic.title}</span>
          <span className="tabular-nums">{Math.min(step + (finished ? 0 : 1), steps.length)} / {steps.length}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-line/70" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-mint transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <article className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-7">
        <p className="text-sm font-semibold text-ink/55">お題</p>
        <p className="mt-1 text-lg font-black text-ink">{topic.questionJa}</p>
        <p className="mt-0.5 text-sm text-ink/55">{topic.questionEn}</p>

        <div className="mt-5 space-y-3">
          {visibleSteps.map((s, i) => {
            const isActive = !finished && i === step;
            const revealEn = !isActive || showAnswer;

            return (
              <div key={i} className={`rounded-2xl border px-4 py-3 ${isActive ? "border-mint/40 bg-mint/5 ring-2 ring-mint/20" : "border-line bg-paper"}`}>
                <div className="text-[11px] font-black uppercase tracking-wide text-mint-deep">{s.label}</div>

                {revealEn ? (
                  <div className="mt-1 flex items-start justify-between gap-2">
                    <div>
                      <p className="text-lg font-bold leading-snug text-ink">{s.en}</p>
                      <p className="mt-0.5 text-sm text-ink/60">{s.ja}</p>
                    </div>
                    {speech.supported && (
                      <button
                        type="button"
                        onClick={() => speech.speak(s.en)}
                        aria-label="この文を音声で聞く"
                        className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-mint-deep transition hover:bg-mint/10"
                      >
                        <span aria-hidden>🔊</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-1">
                    <p className="text-lg font-black leading-snug text-ink">{s.ja}</p>
                    {s.connector && (
                      <div className="mt-2 inline-block rounded-lg border border-mint/30 bg-white px-3 py-1 text-sm font-bold text-mint-deep">
                        つなぎ語: {s.connector}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!finished && activeStep && (
          <div className="mt-5">
            {!showAnswer ? (
              <button type="button" onClick={primaryAction} className="focus-ring flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-mint px-5 py-4 text-lg font-black text-white shadow-soft transition hover:bg-mint-deep hover:shadow-lift">
                答えを見る
                <kbd className="rounded border border-white/50 px-1.5 text-[11px] font-bold opacity-80">A</kbd>
              </button>
            ) : (
              <button type="button" onClick={primaryAction} className="focus-ring flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-4 text-lg font-black text-white transition hover:bg-ink/90">
                {step + 1 >= steps.length ? "仕上げる" : "次へ"}
                <kbd className="rounded border border-white/40 px-1.5 text-[11px] font-bold opacity-80">Space</kbd>
              </button>
            )}
          </div>
        )}

        {finished && (
          <div className="mt-6 rounded-xl border border-mint/30 bg-mint/5 p-5">
            <h2 className="text-center text-xl font-black">完成しました 🎉</h2>
            <p className="mt-2 text-center text-sm text-ink/65">意見・理由・例・まとめをつなげて、ひとまとまりで言ってみましょう。</p>
            <p className="mt-4 rounded-xl border border-line bg-white p-4 text-lg font-bold leading-relaxed text-ink">{fullParagraph}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
              {speech.supported && (
                <button type="button" onClick={() => speech.speak(fullParagraph)} className="focus-ring min-h-12 rounded-xl border border-mint bg-white px-5 py-3 font-bold text-mint-deep transition hover:bg-mint/10">
                  🔊 通しで聞く
                </button>
              )}
              <button type="button" onClick={() => { speech.stop(); setStep(0); setShowAnswer(false); }} className="focus-ring min-h-12 rounded-xl bg-mint px-5 py-3 font-bold text-white transition hover:bg-mint-deep">
                もう一度
              </button>
              <button type="button" onClick={onExit} className="focus-ring min-h-12 rounded-xl border border-line bg-white px-5 py-3 font-bold text-ink/70 transition hover:border-mint">
                一覧に戻る
              </button>
            </div>
          </div>
        )}
      </article>
    </section>
  );
}
