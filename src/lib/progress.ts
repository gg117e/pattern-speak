import { cards } from "@/data/cards";
import { units } from "@/data/units";
import { isDue } from "@/lib/review";
import type { ReviewState, Section } from "@/types";

export const getProgressSummary = (states: ReviewState[], now = new Date()) => {
  const stateMap = Object.fromEntries(states.map((state) => [state.cardId, state])) as Record<string, ReviewState>;
  const learnedCount = states.length;
  const dueCount = cards.filter((card) => isDue(stateMap[card.id], now)).length;

  const bySection = (["core", "daily", "business"] as Section[]).map((section) => {
    const sectionCards = cards.filter((card) => card.section === section);
    const learned = sectionCards.filter((card) => stateMap[card.id]).length;

    return {
      section,
      unitCount: units.filter((unit) => unit.section === section).length,
      total: sectionCards.length,
      learned,
      due: sectionCards.filter((card) => isDue(stateMap[card.id], now)).length
    };
  });

  return {
    totalCards: cards.length,
    learnedCount,
    dueCount,
    bySection
  };
};
