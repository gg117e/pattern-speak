"use client";

import { useEffect, useMemo, useState } from "react";
import { recordActivity } from "@/lib/storage";
import { useSpeech } from "@/hooks/useSpeech";
import type { Dialogue } from "@/types";

type DialogueSessionProps = {
  dialogue: Dialogue;
  onExit: () => void;
};

export function DialogueSession({ dialogue, onExit }: DialogueSessionProps) {
  const { turns } = dialogue;
  const [step, setStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const speech = useSpeech();

  const finished = step >= turns.length;
  const activeTurn = finished ? undefined : turns[step];
  const progressPercent = Math.round((Math.min(step, turns.length) / turns.length) * 100);
  const fullScript = useMemo(() => turns.map((t) => t.en).join(" "), [turns]);

  const advance = () => {
    const next = step + 1;
    if (next >= turns.length) {
      recordActivity();
      setStep(turns.length);
    } else {
      setStep(next);
    }
    setShowAnswer(false);
  };

  const primaryAction = () => {
    if (!activeTurn) return;
    if (activeTurn.speaker === "you" && !showAnswer) {
      setShowAnswer(true);
    } else {
      speech.stop();
      advance();
    }
  };

  // 現在のターンで再生できる英文（partner は常に、you は開示後）
  const playableEn = activeTurn
    ? activeTurn.speaker === "partner" || showAnswer
      ? activeTurn.en
      : null
    : null;

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
      if (key === "p" && speech.supported && playableEn) {
        event.preventDefault();
        speech.speak(playableEn);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, activeTurn, showAnswer, speech, playableEn]);

  const visibleTurns = finished ? turns : turns.slice(0, step + 1);

  return (
    <section className="mx-auto max-w-3xl">
      <button
        type="button"
        onClick={onExit}
        className="focus-ring mb-4 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold text-ink/60 transition hover:text-ink"
      >
        ← 対話一覧に戻る
      </button>

      <div className="mb-4">
        <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-ink/60">
          <span>{dialogue.title}</span>
          <span className="tabular-nums">{Math.min(step + (finished ? 0 : 1), turns.length)} / {turns.length}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-line/70" role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-full rounded-full bg-mint transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <article className="rounded-2xl border border-line bg-white p-5 shadow-soft sm:p-7">
        <p className="text-sm font-semibold text-ink/55">{dialogue.sceneJa}</p>

        <div className="mt-4 space-y-3">
          {visibleTurns.map((turn, i) => {
            const isActive = !finished && i === step;
            const isYou = turn.speaker === "you";
            // you ターンが現在進行中で未開示なら、英文は隠して日本語プロンプトを出す
            const revealEn = !isYou || !isActive || showAnswer;

            return (
              <div key={i} className={`flex ${isYou ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl border px-4 py-3 ${isYou ? "border-mint/30 bg-mint/10" : "border-line bg-paper"} ${isActive ? "ring-2 ring-mint/30" : ""}`}>
                  <div className="text-[11px] font-bold uppercase tracking-wide text-ink/45">{isYou ? "You" : "Partner"}</div>

                  {revealEn ? (
                    <div className="mt-1 flex items-start justify-between gap-2">
                      <div>
                        <p className="text-lg font-bold leading-snug text-ink">{turn.en}</p>
                        <p className="mt-0.5 text-sm text-ink/60">{turn.ja}</p>
                      </div>
                      {speech.supported && (
                        <button
                          type="button"
                          onClick={() => speech.speak(turn.en)}
                          aria-label="この行を音声で聞く"
                          className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-mint-deep transition hover:bg-mint/10"
                        >
                          <span aria-hidden>🔊</span>
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="mt-1">
                      <p className="text-lg font-black leading-snug text-ink">{turn.ja}</p>
                      {turn.pattern && (
                        <div className="mt-2 inline-block rounded-lg border border-mint/30 bg-white px-3 py-1 text-sm font-bold text-mint-deep">
                          ヒント: {turn.pattern}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!finished && activeTurn && (
          <div className="mt-5">
            {activeTurn.speaker === "you" && !showAnswer ? (
              <button type="button" onClick={primaryAction} className="focus-ring flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-mint px-5 py-4 text-lg font-black text-white shadow-soft transition hover:bg-mint-deep hover:shadow-lift">
                答えを見る
                <kbd className="rounded border border-white/50 px-1.5 text-[11px] font-bold opacity-80">A</kbd>
              </button>
            ) : (
              <button type="button" onClick={primaryAction} className="focus-ring flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-4 text-lg font-black text-white transition hover:bg-ink/90">
                {step + 1 >= turns.length ? "対話を終える" : "次へ"}
                <kbd className="rounded border border-white/40 px-1.5 text-[11px] font-bold opacity-80">Space</kbd>
              </button>
            )}
          </div>
        )}

        {finished && (
          <div className="mt-6 rounded-xl border border-mint/30 bg-mint/5 p-5 text-center">
            <h2 className="text-xl font-black">完了しました 🎉</h2>
            <p className="mt-2 text-sm text-ink/65">型をつなげて1つの会話を言えました。</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
              {speech.supported && (
                <button type="button" onClick={() => speech.speak(fullScript)} className="focus-ring min-h-12 rounded-xl border border-mint bg-white px-5 py-3 font-bold text-mint-deep transition hover:bg-mint/10">
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
