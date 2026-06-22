import type { Dialogue } from "@/types";

// 学んだ型を会話としてつなぐミニ対話。you ターンには使う型(pattern)をヒントとして持たせる。
export const dialogues: Dialogue[] = [
  {
    id: "dlg-cafe",
    title: "カフェで注文する",
    sceneJa: "カフェのカウンターで注文します。",
    turns: [
      { speaker: "partner", ja: "いらっしゃいませ。ご注文はお決まりですか。", en: "Hi! What can I get for you?" },
      { speaker: "you", ja: "コーヒーを1つお願いできますか。", en: "Can I get a coffee, please?", pattern: "Can I ...?" },
      { speaker: "partner", ja: "かしこまりました。ほかにはございますか。", en: "Sure. Anything else?" },
      { speaker: "you", ja: "いいえ、それだけで大丈夫です。", en: "No, that's all. Thank you.", pattern: "That's all ..." },
      { speaker: "partner", ja: "400円になります。", en: "That'll be 400 yen." },
      { speaker: "you", ja: "カードで払ってもいいですか。", en: "Can I pay by card?", pattern: "Can I ...?" }
    ]
  },
  {
    id: "dlg-weekend",
    title: "週末の雑談",
    sceneJa: "同僚と週末の話をします。",
    turns: [
      { speaker: "partner", ja: "ねえ、週末はどうだった？", en: "Hey, how was your weekend?" },
      { speaker: "you", ja: "友達と新しいカフェに行きました。", en: "I went to a new cafe with my friend.", pattern: "I went to ..." },
      { speaker: "partner", ja: "いいね！どうだった？", en: "Nice! How was it?" },
      { speaker: "you", ja: "とても良かったです。また行きたいです。", en: "It was great. I want to go again.", pattern: "I want to ..." },
      { speaker: "partner", ja: "楽しそうだね。", en: "That sounds fun." },
      { speaker: "you", ja: "今度一緒に行きませんか。", en: "Do you want to come with me next time?", pattern: "Do you want to ...?" }
    ]
  },
  {
    id: "dlg-help",
    title: "同僚に手伝いを頼まれる",
    sceneJa: "仕事中、同僚から相談されます。",
    turns: [
      { speaker: "partner", ja: "このレポートを手伝ってもらえますか。", en: "Could you help me with this report?" },
      { speaker: "you", ja: "先に一つ質問してもいいですか。", en: "Can I ask one question first?", pattern: "Can I ...?" },
      { speaker: "partner", ja: "もちろん、どうぞ。", en: "Sure, go ahead." },
      { speaker: "you", ja: "この数字は間違っていると思います。", en: "I think this number is wrong.", pattern: "I think ..." },
      { speaker: "partner", ja: "あっ、本当だ。ありがとう！", en: "Oh, you're right. Thanks!" },
      { speaker: "you", ja: "直したら送りますね。", en: "I'll send it after I fix it.", pattern: "I'll ..." }
    ]
  },
  {
    id: "dlg-plans",
    title: "予定を合わせる",
    sceneJa: "友達と週末の予定を相談します。",
    turns: [
      { speaker: "partner", ja: "今週末は空いてる？", en: "Are you free this weekend?" },
      { speaker: "you", ja: "土曜は映画を見る予定です。", en: "I'm planning to watch a movie on Saturday.", pattern: "I'm planning to ..." },
      { speaker: "partner", ja: "日曜はどう？", en: "How about Sunday?" },
      { speaker: "you", ja: "日曜なら空いています。", en: "I'm free on Sunday.", pattern: "I'm free ..." },
      { speaker: "partner", ja: "いいね、ランチしよう。", en: "Great, let's get lunch." },
      { speaker: "you", ja: "駅で会いませんか。", en: "Do you want to meet at the station?", pattern: "Do you want to ...?" }
    ]
  },
  {
    id: "dlg-weather",
    title: "体調と天気の話",
    sceneJa: "夕方、同僚と少し立ち話をします。",
    turns: [
      { speaker: "partner", ja: "少し疲れて見えるよ。", en: "You look a little tired." },
      { speaker: "you", ja: "今日は早く帰りたい気分です。", en: "I feel like going home early today.", pattern: "I feel like ..." },
      { speaker: "partner", ja: "うん、今日は寒いしね。", en: "Yeah, it's cold today too." },
      { speaker: "you", ja: "雨が降ると思います。", en: "I think it's going to rain.", pattern: "I think ..." },
      { speaker: "partner", ja: "じゃあ傘を持って行きなよ。", en: "Then take an umbrella." },
      { speaker: "you", ja: "そうします。ありがとう。", en: "I'll do that. Thanks.", pattern: "I'll ..." }
    ]
  },
  {
    id: "dlg-shopping",
    title: "買い物をする",
    sceneJa: "お店で服を探しています。",
    turns: [
      { speaker: "partner", ja: "いらっしゃいませ、何かお探しですか。", en: "Hi, are you looking for anything?" },
      { speaker: "you", ja: "青いシャツを探しています。", en: "I'm looking for a blue shirt.", pattern: "I'm looking for ..." },
      { speaker: "partner", ja: "かしこまりました、サイズは？", en: "Sure, what size?" },
      { speaker: "you", ja: "これを試着してもいいですか。", en: "Can I try this on?", pattern: "Can I ...?" },
      { speaker: "partner", ja: "もちろんです、試着室はあちらです。", en: "Of course, the fitting room is over there." },
      { speaker: "you", ja: "これをください。", en: "I'll take this one.", pattern: "I'll take ..." }
    ]
  }
];

export const dialogueMap = Object.fromEntries(dialogues.map((d) => [d.id, d])) as Record<string, Dialogue>;
