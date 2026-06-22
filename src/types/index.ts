export type Section = "core" | "daily" | "business";

export type Unit = {
  id: string;
  section: Section;
  title: string;
  pattern: string;
  meaningJa: string;
  description: string;
  level: number;
};

export type Card = {
  id: string;
  section: Section;
  unitId: string;
  pattern: string;
  questionJa: string;
  answerEn: string;
  hints: string[];
  chunks: string[];
  level: number;
  tags: string[];
};

export type Rating = "again" | "almost" | "good" | "easy";

export type ReviewState = {
  cardId: string;
  rating: Rating;
  reviewedAt: string;
  nextReviewAt: string;
  successStreak: number;
  reviewCount: number;
  mistakeCount: number;
};

export type SectionInfo = {
  id: Section;
  name: string;
  shortName: string;
  description: string;
};

export type VocabWord = {
  id: string;
  word: string;
  meaningJa: string;
  exampleEn: string;
  exampleJa: string;
  category: string;
  tags?: string[];
};

export type DialogueTurn = {
  speaker: "you" | "partner";
  ja: string;
  en: string;
  pattern?: string;
};

export type Dialogue = {
  id: string;
  title: string;
  sceneJa: string;
  turns: DialogueTurn[];
};
