import type { VocabWord } from "@/types";

// 日常会話で頻出の語彙スターターセット。意味と例文（EN/JA）付き。
// 後から追加しやすいよう、カテゴリごとに並べている。
const rows: [word: string, meaningJa: string, exampleEn: string, exampleJa: string, category: string][] = [
  // daily（生活）
  ["errand", "用事・お使い", "I have a few errands to run today.", "今日はいくつか用事があります。", "daily"],
  ["chore", "家事・雑用", "Doing chores on weekends is tiring.", "週末に家事をするのは疲れます。", "daily"],
  ["laundry", "洗濯（物）", "I need to do the laundry tonight.", "今夜は洗濯をしないといけません。", "daily"],
  ["commute", "通勤（する）", "My commute takes about an hour.", "私の通勤は1時間ほどかかります。", "daily"],
  ["leftovers", "残り物", "Let's eat the leftovers for dinner.", "夕食は残り物を食べましょう。", "daily"],
  ["appointment", "予約・約束", "I have a dentist appointment at three.", "3時に歯医者の予約があります。", "daily"],
  ["neighbor", "近所の人", "My neighbor is very friendly.", "私の近所の人はとても親切です。", "daily"],
  ["grocery", "食料品", "I bought some groceries on the way home.", "帰り道で食料品を少し買いました。", "daily"],

  // work（仕事）
  ["deadline", "締め切り", "The deadline is next Friday.", "締め切りは来週の金曜です。", "work"],
  ["schedule", "予定・スケジュール", "Let's check the schedule together.", "一緒に予定を確認しましょう。", "work"],
  ["meeting", "会議", "The meeting was longer than expected.", "会議は思ったより長かったです。", "work"],
  ["client", "顧客・取引先", "We met the client this morning.", "今朝、取引先に会いました。", "work"],
  ["colleague", "同僚", "My colleague helped me with the report.", "同僚がレポートを手伝ってくれました。", "work"],
  ["task", "作業・タスク", "I finished the main task today.", "今日、主な作業を終えました。", "work"],
  ["overtime", "残業", "I had to work overtime yesterday.", "昨日は残業しなければなりませんでした。", "work"],
  ["budget", "予算", "The budget is a little tight this month.", "今月は予算が少し厳しいです。", "work"],

  // food（食）
  ["recipe", "レシピ・作り方", "Could you share the recipe with me?", "そのレシピを教えてもらえますか。", "food"],
  ["ingredient", "材料・食材", "We are missing one ingredient.", "材料が一つ足りません。", "food"],
  ["spicy", "辛い", "This soup is too spicy for me.", "このスープは私には辛すぎます。", "food"],
  ["snack", "軽食・おやつ", "I had a snack between meals.", "食事の間に軽食を食べました。", "food"],
  ["beverage", "飲み物", "Would you like a beverage with that?", "それと一緒に飲み物はいかがですか。", "food"],
  ["dessert", "デザート", "Let's save room for dessert.", "デザートのためにお腹を空けておきましょう。", "food"],

  // time（時間）
  ["recently", "最近", "I have been busy recently.", "最近は忙しいです。", "time"],
  ["lately", "近ごろ", "Have you watched anything good lately?", "近ごろ何かいいものを見ましたか。", "time"],
  ["eventually", "最終的に・いずれ", "We will get there eventually.", "いずれそこにたどり着きます。", "time"],
  ["meanwhile", "その間に", "Meanwhile, I will prepare the slides.", "その間に、私はスライドを準備します。", "time"],
  ["shortly", "まもなく", "The train will arrive shortly.", "電車はまもなく到着します。", "time"],
  ["frequently", "頻繁に", "I frequently forget my umbrella.", "私はよく傘を忘れます。", "time"],

  // feeling（気持ち）
  ["exhausted", "とても疲れた", "I was exhausted after the trip.", "旅行の後はとても疲れていました。", "feeling"],
  ["nervous", "緊張して", "I always get nervous before a speech.", "スピーチの前はいつも緊張します。", "feeling"],
  ["excited", "わくわくして", "I am excited about the weekend.", "週末が楽しみでわくわくしています。", "feeling"],
  ["relieved", "ほっとして", "I felt relieved when it was over.", "それが終わってほっとしました。", "feeling"],
  ["disappointed", "がっかりして", "I was a little disappointed with the result.", "結果に少しがっかりしました。", "feeling"],
  ["confident", "自信がある", "She is confident about the presentation.", "彼女はプレゼンに自信があります。", "feeling"],
  ["confused", "混乱して", "I am a bit confused about the schedule.", "予定について少し混乱しています。", "feeling"],

  // place（場所）
  ["downtown", "繁華街・中心街", "Let's meet downtown around noon.", "正午ごろ中心街で会いましょう。", "place"],
  ["nearby", "近くの・近くに", "Is there a convenience store nearby?", "近くにコンビニはありますか。", "place"],
  ["crowded", "混雑した", "The station was really crowded.", "駅は本当に混んでいました。", "place"],
  ["neighborhood", "近所・地域", "I like the quiet neighborhood.", "この静かな地域が気に入っています。", "place"],
  ["aisle", "通路", "The snacks are in the third aisle.", "お菓子は3番目の通路にあります。", "place"],

  // people / interaction（人・やりとり）
  ["coworker", "同僚", "I had lunch with a coworker.", "同僚と昼食をとりました。", "people"],
  ["acquaintance", "知り合い", "He is just an acquaintance.", "彼はただの知り合いです。", "people"],
  ["polite", "礼儀正しい", "The staff was very polite.", "スタッフはとても礼儀正しかったです。", "people"],
  ["honest", "正直な", "To be honest, I am not sure.", "正直に言うと、よく分かりません。", "people"],
  ["reliable", "頼りになる", "She is a reliable partner.", "彼女は頼りになる相棒です。", "people"],

  // useful verbs / misc（便利な動詞ほか）
  ["postpone", "延期する", "We had to postpone the meeting.", "会議を延期しなければなりませんでした。", "work"],
  ["remind", "思い出させる", "Please remind me before the call.", "電話の前に念のため教えてください。", "work"],
  ["figure out", "理解する・解決する", "I can't figure out this problem.", "この問題が解けません。", "work"],
  ["look forward to", "楽しみにする", "I look forward to seeing you.", "お会いするのを楽しみにしています。", "feeling"],
  ["run out of", "切らす・尽きる", "We ran out of coffee this morning.", "今朝コーヒーを切らしました。", "daily"],
  ["get along with", "仲良くやる", "I get along with my coworkers.", "私は同僚と仲良くやっています。", "people"]
];

export const vocabWords: VocabWord[] = rows.map(([word, meaningJa, exampleEn, exampleJa, category], index) => ({
  id: `vocab-${index + 1}`,
  word,
  meaningJa,
  exampleEn,
  exampleJa,
  category
}));

export const vocabCategories = Array.from(new Set(vocabWords.map((w) => w.category)));

export const vocabMap = Object.fromEntries(vocabWords.map((w) => [w.id, w])) as Record<string, VocabWord>;
