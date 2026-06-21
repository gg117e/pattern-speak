import type { Section, Unit } from "@/types";

const corePatterns = [
  ["core-i-think", "I think ...", "私は〜だと思います", "意見や感想をやわらかく言うための最重要パターンです。"],
  ["core-i-want-to", "I want to ...", "私は〜したいです", "希望や次にしたい行動を短く伝えます。"],
  ["core-i-need-to", "I need to ...", "私は〜する必要があります", "必要な行動、準備、確認を伝えるパターンです。"],
  ["core-i-have-to", "I have to ...", "私は〜しなければなりません", "締切や義務など、避けられない行動を伝えます。"],
  ["core-im-going-to", "I'm going to ...", "私は〜するつもりです", "予定やこれからする行動を自然に言います。"],
  ["core-can-i", "Can I ...?", "〜してもいいですか", "許可を求めたり、相手に確認したりする表現です。"],
  ["core-could-you", "Could you ...?", "〜していただけますか", "丁寧に依頼するときの基本パターンです。"],
  ["core-im-not-sure", "I'm not sure ...", "〜かどうか分かりません", "分からないことを自然に保留する表現です。"],
  ["core-it-depends-on", "It depends on ...", "それは〜によります", "条件次第だと伝え、会話を続けるパターンです。"],
  ["core-the-reason-is", "The reason is ...", "理由は〜です", "理由を一文で足して、説明を分かりやすくします。"]
];

const dailyPatterns = [
  ["daily-i-usually", "I usually ...", "私は普段〜します", "生活習慣やよくすることを話します。"],
  ["daily-i-like", "I like ...", "私は〜が好きです", "好きなものや好きな行動を簡単に話します。"],
  ["daily-im-into", "I'm into ...", "私は〜にはまっています", "最近の興味や趣味を自然な会話で伝えます。"],
  ["daily-i-went-to", "I went to ...", "私は〜へ行きました", "週末や最近行った場所について話します。"],
  ["daily-that-sounds", "That sounds ...", "それは〜そうですね", "相手の話に反応し、会話を続ける表現です。"]
];

const businessPatterns = [
  ["biz-in-my-opinion", "In my opinion, ...", "私の意見では〜です", "会議で自分の意見を丁寧に出すパターンです。"],
  ["biz-i-agree-with", "I agree with ...", "私は〜に賛成です", "人や意見への賛成を簡潔に伝えます。"],
  ["biz-i-disagree-with", "I disagree with ...", "私は〜に反対です", "反対意見をシンプルに伝えます。"],
  ["biz-could-you-explain", "Could you explain ...?", "〜を説明していただけますか", "分からない点を丁寧に確認します。"],
  ["biz-what-do-you-mean-by", "What do you mean by ...?", "〜とはどういう意味ですか", "言葉や意図の意味を聞き返す表現です。"],
  ["biz-main-issue", "The main issue is ...", "主な問題は〜です", "議論の焦点をはっきりさせる表現です。"],
  ["biz-one-concern", "One concern is ...", "懸念点の一つは〜です", "リスクや不安を強すぎない形で伝えます。"],
  ["biz-we-should", "We should ...", "私たちは〜すべきです", "チームとして取るべき行動を提案します。"],
  ["biz-i-suggest-that-we", "I suggest that we ...", "私たちは〜することを提案します", "少し丁寧に提案を出す会議向け表現です。"],
  ["biz-let-me-summarize", "Let me summarize ...", "〜を要約します", "議論の最後や途中で内容を整理します。"],
  ["biz-from-my-point-of-view", "From my point of view, ...", "私の見方では〜です", "立場や観点を明示してから意見を述べます。"],
  ["biz-i-see-your-point", "I see your point, but ...", "言いたいことは分かりますが〜です", "相手を受け止めながら、別の見方を出します。"],
  ["biz-what-if-we", "What if we ...?", "〜したらどうでしょうか", "代替案や仮説を会議で自然に出します。"],
  ["biz-we-need-to-prioritize", "We need to prioritize ...", "〜を優先する必要があります", "限られた時間や予算の中で優先順位を示します。"],
  ["biz-lets-focus-on", "Let's focus on ...", "〜に集中しましょう", "議論が広がったときに焦点を戻します。"],
  ["biz-the-key-point-is", "The key point is ...", "重要な点は〜です", "議論の中心となるポイントを強調します。"],
  ["biz-im-concerned-about", "I'm concerned about ...", "〜を懸念しています", "問題やリスクを率直に、丁寧に伝えます。"],
  ["biz-is-it-possible-to", "Is it possible to ...?", "〜することは可能ですか", "実現可能性を確認するときに使います。"],
  ["biz-could-we-clarify", "Could we clarify ...?", "〜を明確にできますか", "曖昧な点を会議で整理します。"],
  ["biz-lets-make-sure", "Let's make sure ...", "〜を確実にしましょう", "抜け漏れや認識違いを防ぐ確認表現です。"],
  ["biz-the-benefit-is", "The benefit is ...", "利点は〜です", "提案の価値やメリットを説明します。"],
  ["biz-the-risk-is", "The risk is ...", "リスクは〜です", "判断前にリスクを短く共有します。"],
  ["biz-it-might-be-better-to", "It might be better to ...", "〜した方がよいかもしれません", "強く言い切らず、改善案を出します。"],
  ["biz-i-recommend", "I recommend ...", "〜をおすすめします", "理由を添えて推奨案を伝えます。"],
  ["biz-can-we-agree-on", "Can we agree on ...?", "〜について合意できますか", "会議で合意点を確認します。"],
  ["biz-next-step-is", "The next step is ...", "次のステップは〜です", "議論を具体的な行動へつなげます。"],
  ["biz-ill-take-care-of", "I'll take care of ...", "〜は私が対応します", "自分の担当範囲を明確に伝えます。"],
  ["biz-could-you-take-care-of", "Could you take care of ...?", "〜を対応していただけますか", "相手にタスクを丁寧に依頼します。"],
  ["biz-by-when-can-we", "By when can we ...?", "いつまでに〜できますか", "期限や完了予定を確認します。"],
  ["biz-to-be-honest", "To be honest, ...", "正直に言うと〜です", "率直な意見や懸念を前置きして伝えます。"]
];

const makeUnits = (section: Section, rows: string[][]): Unit[] =>
  rows.map(([id, pattern, meaningJa, description]) => ({
    id,
    section,
    title: pattern,
    pattern,
    meaningJa,
    description,
    level: section === "core" || section === "daily" ? 1 : 2
  }));

export const units: Unit[] = [
  ...makeUnits("core", corePatterns),
  ...makeUnits("daily", dailyPatterns),
  ...makeUnits("business", businessPatterns)
];

export const unitMap = Object.fromEntries(units.map((unit) => [unit.id, unit])) as Record<string, Unit>;
