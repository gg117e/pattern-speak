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

// 意見ビルダー（PREP）。1テーマを「意見→理由→例→まとめ」の数文で組み立てる。
export type SpeechStep = {
  label: string; // 意見 / 理由 / 例 / まとめ
  ja: string; // 日本語ガイド
  en: string; // モデル英文
  connector?: string; // 文頭で使うつなぎ語のヒント
};

export type SpeechTopic = {
  id: string;
  title: string;
  questionJa: string;
  questionEn: string;
  steps: SpeechStep[];
};
