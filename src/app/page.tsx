import Link from "next/link";
import { cards } from "@/data/cards";
import { sections } from "@/data/sections";
import { units } from "@/data/units";
import { PrimaryLink } from "@/components/PrimaryLink";
import { ProgressSnapshot } from "@/components/ProgressSnapshot";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { ResumeButton } from "@/components/ResumeButton";

export default function HomePage() {
  return (
    <div className="space-y-7">
      <section className="rounded-lg border border-line bg-white p-5 shadow-soft sm:p-7">
        <p className="text-sm font-bold text-mint">2か月で、英語の型を口から出す</p>
        <h1 className="mt-2 text-3xl font-black leading-tight text-ink sm:text-4xl">Pattern Speak</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink/70">
          日本語を見た瞬間に、英語の定型表現で言う練習です。自動採点は使わず、口で言う練習と自己評価だけで進めます。
          日常会話とビジネス会話を分けて学び、復習では全カードをまとめて扱います。
        </p>
      </section>

      <DailyGoalCard />

      <ProgressSnapshot />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const unitCount = units.filter((unit) => unit.section === section.id).length;
          const cardCount = cards.filter((card) => card.section === section.id).length;

          return (
            <Link key={section.id} href={`/sections/${section.id}`} className="focus-ring rounded-lg border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-mint">
              <div className="text-xl font-black">{section.name}</div>
              <p className="mt-2 min-h-12 text-sm leading-6 text-ink/65">{section.description}</p>
              <div className="mt-4 text-sm font-bold text-mint">{unitCount} Units / {cardCount} Cards</div>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/practice" className="focus-ring rounded-lg border border-mint bg-mint/5 p-5 shadow-soft transition hover:-translate-y-0.5">
          <div className="text-xl font-black text-mint-deep">ランダム練習</div>
          <p className="mt-2 min-h-12 text-sm leading-6 text-ink/65">章と問題数を選んで、好きなときにランダム出題で練習します。</p>
          <div className="mt-4 text-sm font-bold text-mint-deep">Start Practice</div>
        </Link>

        <Link href="/dialogue" className="focus-ring rounded-lg border border-mint bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-mint">
          <div className="text-xl font-black text-ink">ミニ対話</div>
          <p className="mt-2 min-h-12 text-sm leading-6 text-ink/65">学んだ型をつなげて、短い会話として口に出す練習をします。</p>
          <div className="mt-4 text-sm font-bold text-mint-deep">Start Dialogue</div>
        </Link>

        <Link href="/speak" className="focus-ring rounded-lg border border-mint bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-mint">
          <div className="text-xl font-black text-ink">意見スピーチ</div>
          <p className="mt-2 min-h-12 text-sm leading-6 text-ink/65">意見→理由→例→まとめの順に、自分の考えを数文で話す練習をします。</p>
          <div className="mt-4 text-sm font-bold text-mint-deep">Start Speak</div>
        </Link>

        <Link href="/vocab" className="focus-ring rounded-lg border border-amber bg-amber/5 p-5 shadow-soft transition hover:-translate-y-0.5">
          <div className="text-xl font-black text-ink">単語学習</div>
          <p className="mt-2 min-h-12 text-sm leading-6 text-ink/65">日常語彙を意味→英単語で覚え、例文と音声で定着させます。</p>
          <div className="mt-4 text-sm font-bold text-amber">Start Vocab</div>
        </Link>

        <Link href="/review" className="focus-ring rounded-lg border border-ink bg-ink p-5 text-white shadow-soft transition hover:-translate-y-0.5">
          <div className="text-xl font-black">Review</div>
          <p className="mt-2 min-h-12 text-sm leading-6 text-white/70">復習期限が来たカードを全セクションからまとめて練習します。</p>
          <div className="mt-4 text-sm font-bold text-white">Start Review</div>
        </Link>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <ResumeButton />
        <PrimaryLink href="/stats" variant="outline">学習状況を見る</PrimaryLink>
      </div>
    </div>
  );
}
