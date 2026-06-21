import type { SectionInfo } from "@/types";

export const sections: SectionInfo[] = [
  {
    id: "core",
    name: "Core Speaking",
    shortName: "Core",
    description: "日常会話にもビジネス会話にも使う、口ならし用の基礎表現です。"
  },
  {
    id: "daily",
    name: "Daily Conversation",
    shortName: "Daily",
    description: "雑談、予定、好み、最近のできごとを話すための表現です。"
  },
  {
    id: "business",
    name: "Business Discussion",
    shortName: "Business",
    description: "会議、確認、提案、反対、説明、合意形成で使う基本表現です。"
  }
];

export const sectionMap = Object.fromEntries(sections.map((section) => [section.id, section])) as Record<
  SectionInfo["id"],
  SectionInfo
>;
