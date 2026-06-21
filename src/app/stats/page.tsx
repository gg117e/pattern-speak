import { StatsPanel } from "@/components/StatsPanel";

export default function StatsPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-line bg-white p-5 shadow-soft sm:p-7">
        <p className="text-sm font-bold text-mint">Stats</p>
        <h1 className="mt-2 text-3xl font-black">学習状況</h1>
        <p className="mt-3 text-ink/65">自己評価だけを使って、学習済みカードと復習状況を集計します。</p>
      </section>
      <StatsPanel />
    </div>
  );
}
