"use client";

import { useCallback, useMemo, useState, useSyncExternalStore } from "react";

export type SpeechRate = "normal" | "slow";

const rateValue: Record<SpeechRate, number> = {
  normal: 1,
  slow: 0.72
};

const subscribeToSpeechSupport = () => () => {};
const getSpeechSupportSnapshot = () =>
  typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
const getServerSpeechSupportSnapshot = () => false;

export const useSpeech = () => {
  const supported = useSyncExternalStore(
    subscribeToSpeechSupport,
    getSpeechSupportSnapshot,
    getServerSpeechSupportSnapshot
  );
  const [rate, setRate] = useState<SpeechRate>("normal");
  const [speaking, setSpeaking] = useState(false);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !text.trim()) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = rateValue[rate];
      utterance.pitch = 1;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [rate, supported]
  );

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return useMemo(
    () => ({ supported, rate, setRate, speak, stop, speaking }),
    [rate, speak, speaking, stop, supported]
  );
};
