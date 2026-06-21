import { unitMap, units } from "@/data/units";
import type { Card } from "@/types";

type Phrase = [questionJa: string, phraseEn: string, tags: string[]];

const corePhrases: Record<string, Phrase[]> = {
  "core-i-think": [["この計画はいいと思います。", "this plan is good", ["opinion"]], ["今日は少し忙しいと思います。", "today will be a little busy", ["schedule"]], ["それは役に立つと思います。", "that is useful", ["opinion"]], ["彼女は正しいと思います。", "she is right", ["people"]], ["もっと時間が必要だと思います。", "we need more time", ["time"]]],
  "core-i-want-to": [["英語をもっと練習したいです。", "practice English more", ["learning"]], ["このメールを確認したいです。", "check this email", ["email"]], ["家で休みたいです。", "relax at home", ["daily"]], ["新しい方法を試したいです。", "try a new way", ["idea"]], ["あなたの意見を聞きたいです。", "hear your opinion", ["opinion"]]],
  "core-i-need-to": [["資料を読む必要があります。", "read the materials", ["preparation"]], ["今日この仕事を終える必要があります。", "finish this task today", ["task"]], ["予定を確認する必要があります。", "check the schedule", ["schedule"]], ["もっと水を飲む必要があります。", "drink more water", ["daily"]], ["上司に相談する必要があります。", "talk to my manager", ["manager"]]],
  "core-i-have-to": [["今すぐ出発しなければなりません。", "leave now", ["time"]], ["明日までにレポートを提出しなければなりません。", "submit the report by tomorrow", ["deadline"]], ["この問題を解決しなければなりません。", "solve this problem", ["problem"]], ["病院に電話しなければなりません。", "call the hospital", ["phone"]], ["パスワードを変更しなければなりません。", "change my password", ["security"]]],
  "core-im-going-to": [["今夜英語を勉強するつもりです。", "study English tonight", ["plan"]], ["来週資料を送るつもりです。", "send the document next week", ["document"]], ["昼食後に彼に電話するつもりです。", "call him after lunch", ["phone"]], ["週末に部屋を掃除するつもりです。", "clean my room this weekend", ["daily"]], ["このアイデアを共有するつもりです。", "share this idea with the team", ["team"]]],
  "core-can-i": [["ここに座ってもいいですか。", "sit here", ["permission"]], ["少し質問してもいいですか。", "ask a quick question", ["question"]], ["この資料を見てもいいですか。", "look at this document", ["document"]], ["後で電話してもいいですか。", "call you later", ["phone"]], ["窓を開けてもいいですか。", "open the window", ["daily"]]],
  "core-could-you": [["もう一度言っていただけますか。", "say that again", ["clarify"]], ["このファイルを送っていただけますか。", "send me this file", ["file"]], ["少しゆっくり話していただけますか。", "speak a little more slowly", ["listening"]], ["明日の予定を確認していただけますか。", "check tomorrow's schedule", ["schedule"]], ["ドアを閉めていただけますか。", "close the door", ["request"]]],
  "core-im-not-sure": [["それが正しいかどうか分かりません。", "if that is correct", ["uncertainty"]], ["彼が今日来るかどうか分かりません。", "if he will come today", ["schedule"]], ["どちらが良いか分かりません。", "which one is better", ["choice"]], ["この方法がうまくいくか分かりません。", "if this way will work", ["idea"]], ["その意味が分かりません。", "what that means", ["meaning"]]],
  "core-it-depends-on": [["それは天気によります。", "the weather", ["weather"]], ["それは予算によります。", "the budget", ["budget"]], ["それはチームの予定によります。", "the team's schedule", ["schedule"]], ["それは目的によります。", "your goal", ["goal"]], ["それは締切によります。", "the deadline", ["deadline"]]],
  "core-the-reason-is": [["理由は時間がないからです。", "we don't have enough time", ["time"]], ["理由は費用が高いからです。", "the cost is too high", ["cost"]], ["理由は彼女が忙しいからです。", "she is busy", ["people"]], ["理由はこの案がシンプルだからです。", "this idea is simple", ["idea"]], ["理由は顧客が急いでいるからです。", "the customer is in a hurry", ["customer"]]]
};

const dailyPhrases: Record<string, Phrase[]> = {
  "daily-i-usually": [["普段、朝にコーヒーを飲みます。", "drink coffee in the morning", ["routine"]], ["普段、電車で仕事に行きます。", "go to work by train", ["commute"]], ["普段、夜に英語を練習します。", "practice English at night", ["learning"]], ["普段、週末に買い物に行きます。", "go shopping on weekends", ["weekend"]], ["普段、昼食にサラダを食べます。", "eat salad for lunch", ["food"]]],
  "daily-i-like": [["音楽を聞くのが好きです。", "listening to music", ["music"]], ["辛い食べ物が好きです。", "spicy food", ["food"]], ["新しい場所を訪れるのが好きです。", "visiting new places", ["travel"]], ["家で映画を見るのが好きです。", "watching movies at home", ["movie"]], ["朝に散歩するのが好きです。", "taking a walk in the morning", ["health"]]],
  "daily-im-into": [["最近、料理にはまっています。", "cooking these days", ["food"]], ["最近、ランニングにはまっています。", "running these days", ["health"]], ["最近、海外ドラマにはまっています。", "foreign dramas these days", ["media"]], ["最近、カフェ巡りにはまっています。", "visiting cafes these days", ["cafe"]], ["最近、英語のポッドキャストにはまっています。", "English podcasts these days", ["learning"]]],
  "daily-i-went-to": [["昨日、駅の近くのカフェに行きました。", "a cafe near the station yesterday", ["cafe"]], ["先週末、映画館に行きました。", "the movie theater last weekend", ["movie"]], ["昼休みにコンビニに行きました。", "a convenience store during lunch break", ["lunch"]], ["友達と新しいレストランに行きました。", "a new restaurant with my friend", ["restaurant"]], ["仕事の後にジムに行きました。", "the gym after work", ["health"]]],
  "daily-that-sounds": [["それは楽しそうですね。", "fun", ["reaction"]], ["それは大変そうですね。", "tough", ["empathy"]], ["それはおいしそうですね。", "delicious", ["food"]], ["それはいい考えですね。", "like a good idea", ["idea"]], ["それは少し難しそうですね。", "a little difficult", ["difficulty"]]]
};

const businessBase: Phrase[] = [
  ["この案について発言してください。", "this plan", ["plan"]],
  ["顧客の反応について発言してください。", "the customer's reaction", ["customer"]],
  ["締切について発言してください。", "the deadline", ["deadline"]],
  ["予算について発言してください。", "the budget", ["budget"]],
  ["次のステップについて発言してください。", "the next steps", ["next-step"]]
];

const businessOverrides: Record<string, Phrase[]> = {
  "biz-in-my-opinion": [["この案は分かりやすいです。", "this idea is easy to understand", ["opinion"]], ["まず顧客に確認すべきです。", "we should check with the customer first", ["customer"]], ["この日程は少し厳しいです。", "this schedule is a little tight", ["schedule"]], ["品質が一番重要です。", "quality is the most important", ["quality"]], ["もう少しデータが必要です。", "we need a little more data", ["data"]]],
  "biz-i-see-your-point": [["言いたいことは分かりますが、締切が厳しいです。", "the deadline is tight", ["deadline"]], ["言いたいことは分かりますが、費用が高すぎます。", "the cost is too high", ["cost"]], ["言いたいことは分かりますが、データが必要です。", "we need more data", ["data"]], ["言いたいことは分かりますが、顧客に確認したいです。", "I want to check with the customer", ["customer"]], ["言いたいことは分かりますが、今は優先度が低いです。", "it is not a high priority now", ["priority"]]],
  "biz-what-if-we": [["まず一週間だけ試したらどうでしょうか。", "try it for just one week", ["test"]], ["顧客に二つの選択肢を見せたらどうでしょうか。", "show the customer two options", ["customer"]], ["この部分を後回しにしたらどうでしょうか。", "move this part to later", ["scope"]], ["会議の前に短いメモを送ったらどうでしょうか。", "send a short note before the meeting", ["meeting"]], ["別の方法で説明したらどうでしょうか。", "explain it in a different way", ["explanation"]]],
  "biz-we-need-to-prioritize": [["顧客の問題を優先する必要があります。", "the customer's problem", ["customer"]], ["品質を優先する必要があります。", "quality", ["quality"]], ["今週の締切を優先する必要があります。", "this week's deadline", ["deadline"]], ["影響が大きい項目を優先する必要があります。", "the item with the biggest impact", ["impact"]], ["短期的な対応を優先する必要があります。", "the short-term action", ["action"]]],
  "biz-lets-focus-on": [["今日は主な問題に集中しましょう。", "the main issue today", ["issue"]], ["まず顧客のニーズに集中しましょう。", "the customer's needs first", ["customer"]], ["次のステップに集中しましょう。", "the next steps", ["next-step"]], ["今はリスクに集中しましょう。", "the risks for now", ["risk"]], ["最初にできることに集中しましょう。", "what we can do first", ["action"]]],
  "biz-can-we-agree-on": [["今日の次のステップについて合意できますか。", "today's next steps", ["agreement"]], ["この優先順位について合意できますか。", "this priority", ["priority"]], ["今回の範囲について合意できますか。", "the scope for this time", ["scope"]], ["金曜日までに確認することについて合意できますか。", "checking it by Friday", ["deadline"]], ["この案を顧客に出すことについて合意できますか。", "sharing this plan with the customer", ["customer"]]],
  "biz-by-when-can-we": [["いつまでに顧客へ連絡できますか。", "contact the customer", ["customer"]], ["いつまでに資料を更新できますか。", "update the document", ["document"]], ["いつまでにデータを確認できますか。", "check the data", ["data"]], ["いつまでに最初の案を出せますか。", "share the first proposal", ["proposal"]], ["いつまでに判断できますか。", "make a decision", ["decision"]]]
};

const renderAnswer = (pattern: string, phrase: string) => pattern.replace("...", phrase);

const phrasesFor = (unitId: string): Phrase[] => {
  if (corePhrases[unitId]) return corePhrases[unitId];
  if (dailyPhrases[unitId]) return dailyPhrases[unitId];
  if (businessOverrides[unitId]) return businessOverrides[unitId];
  return businessBase;
};

export const cards: Card[] = units.flatMap((unit) =>
  phrasesFor(unit.id).map(([questionJa, phraseEn, tags], index) => {
    const prefix = unit.pattern.split("...")[0].trim().replace(/,$/, ",");
    return {
      id: `${unit.id}-${index + 1}`,
      section: unit.section,
      unitId: unit.id,
      pattern: unit.pattern,
      questionJa,
      answerEn: renderAnswer(unit.pattern, phraseEn),
      hints: phraseEn.split(" ").slice(0, 4),
      chunks: [prefix, phraseEn].filter(Boolean),
      level: unit.level,
      tags: [unit.section, ...tags]
    };
  })
);

export const cardMap = Object.fromEntries(cards.map((card) => [card.id, card])) as Record<string, Card>;
