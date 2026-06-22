import type { SpeechTopic } from "@/types";

// 意見ビルダー（PREP）。1テーマを「意見 → 理由 → 例 → まとめ」の数文で組み立てる。
// 既習の型（I think / The reason is / For example / So など）とつなぎ語を活用する。
export const speechTopics: SpeechTopic[] = [
  {
    id: "speak-weekend",
    title: "休日の過ごし方",
    questionJa: "休日はどう過ごしますか？",
    questionEn: "How do you spend your days off?",
    steps: [
      { label: "意見", connector: "I think", ja: "週末はリラックスするための時間だと思います。", en: "I think weekends are for relaxing." },
      { label: "理由", connector: "The reason is", ja: "平日は一生懸命働いているからです。", en: "The reason is that I work hard during the week." },
      { label: "例", connector: "For example", ja: "例えば、よく家で映画を見ます。", en: "For example, I often stay home and watch movies." },
      { label: "まとめ", connector: "So", ja: "だから週末は次の週に向けて充電する助けになります。", en: "So weekends help me recharge for the next week." }
    ]
  },
  {
    id: "speak-food",
    title: "好きな食べ物",
    questionJa: "好きな食べ物は何ですか？",
    questionEn: "What is your favorite food?",
    steps: [
      { label: "意見", connector: "I like", ja: "私はラーメンが一番好きです。", en: "I like ramen the best." },
      { label: "理由", connector: "because", ja: "スープが濃厚で温かいので好きです。", en: "I like it because the soup is rich and warm." },
      { label: "例", connector: "For example", ja: "例えば、少なくとも週に一度は食べます。", en: "For example, I have it at least once a week." },
      { label: "まとめ", connector: "That's why", ja: "だからラーメンを食べるといつも幸せな気分になります。", en: "That's why I always feel happy when I eat ramen." }
    ]
  },
  {
    id: "speak-remote",
    title: "リモートワーク",
    questionJa: "リモートワークについてどう思いますか？",
    questionEn: "What do you think about remote work?",
    steps: [
      { label: "意見", connector: "In my opinion", ja: "私の意見では、リモートワークには多くの利点があります。", en: "In my opinion, remote work has many benefits." },
      { label: "理由", connector: "The reason is", ja: "通勤時間を節約できるからです。", en: "The reason is that I can save time on commuting." },
      { label: "例", connector: "For example", ja: "例えば、その時間を英語の勉強に使います。", en: "For example, I use that time to study English." },
      { label: "まとめ", connector: "So", ja: "だからリモートワークは生活のバランスを良くすると思います。", en: "So I think remote work makes my life more balanced." }
    ]
  },
  {
    id: "speak-place",
    title: "おすすめの街",
    questionJa: "おすすめの旅行先を教えてください。",
    questionEn: "What place do you recommend visiting?",
    steps: [
      { label: "意見", connector: "I recommend", ja: "京都を訪れるのをおすすめします。", en: "I recommend visiting Kyoto." },
      { label: "理由", connector: "The reason is", ja: "街が歴史にあふれているからです。", en: "The reason is that the city is full of history." },
      { label: "例", connector: "For example", ja: "例えば、美しい古いお寺を見られます。", en: "For example, you can see beautiful old temples." },
      { label: "まとめ", connector: "So", ja: "だから京都はリラックスして学べる素晴らしい場所です。", en: "So Kyoto is a great place to relax and learn." }
    ]
  },
  {
    id: "speak-morning",
    title: "朝型か夜型か",
    questionJa: "あなたは朝型ですか、夜型ですか？",
    questionEn: "Are you a morning person or a night person?",
    steps: [
      { label: "意見", connector: "I think", ja: "私は朝型だと思います。", en: "I think I'm a morning person." },
      { label: "理由", connector: "The reason is", ja: "朝の方が集中できるからです。", en: "The reason is that I feel more focused in the morning." },
      { label: "例", connector: "For example", ja: "例えば、たいてい朝食前に勉強します。", en: "For example, I usually study before breakfast." },
      { label: "まとめ", connector: "That's why", ja: "だから早く寝るようにしています。", en: "That's why I try to go to bed early." }
    ]
  },
  {
    id: "speak-skill",
    title: "学びたいスキル",
    questionJa: "今、何を学びたいですか？",
    questionEn: "What do you want to learn now?",
    steps: [
      { label: "意見", connector: "I want to", ja: "料理を学びたいです。", en: "I want to learn how to cook." },
      { label: "理由", connector: "The reason is", ja: "外食が多すぎるからです。", en: "The reason is that I eat out too much." },
      { label: "例", connector: "For example", ja: "例えば、家で健康的な食事を作りたいです。", en: "For example, I want to make healthy meals at home." },
      { label: "まとめ", connector: "So", ja: "だから来月、料理教室に通う予定です。", en: "So I'm planning to take a cooking class next month." }
    ]
  },
  {
    id: "speak-plan",
    title: "このプロジェクト案への意見",
    questionJa: "この案についてどう思いますか？",
    questionEn: "What do you think about this plan?",
    steps: [
      { label: "意見", connector: "In my opinion", ja: "私の意見では、この案は良い考えです。", en: "In my opinion, this plan is a good idea." },
      { label: "理由", connector: "The reason is", ja: "時間とお金を節約できるからです。", en: "The reason is that it can save us time and money." },
      { label: "例", connector: "For example", ja: "例えば、2週間で作業を終えられます。", en: "For example, we can finish the work in two weeks." },
      { label: "まとめ", connector: "So", ja: "だからこの案を試すべきだと思います。", en: "So I think we should try this plan." }
    ]
  },
  {
    id: "speak-deadline",
    title: "締切の相談",
    questionJa: "厳しい締切について相談してみましょう。",
    questionEn: "Let's talk about a tight deadline.",
    steps: [
      { label: "意見", connector: "I think", ja: "締切が厳しすぎると思います。", en: "I think the deadline is too tight." },
      { label: "理由", connector: "The reason is", ja: "人手が足りないからです。", en: "The reason is that we don't have enough people." },
      { label: "例", connector: "For example", ja: "例えば、今週は2人が休暇中です。", en: "For example, two members are on vacation this week." },
      { label: "まとめ", connector: "So", ja: "だから締切を来週の金曜に延ばせますか？", en: "So could we move the deadline to next Friday?" }
    ]
  }
];

export const speechTopicMap = Object.fromEntries(speechTopics.map((topic) => [topic.id, topic])) as Record<string, SpeechTopic>;
