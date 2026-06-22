import Link from "next/link";
import { notFound } from "next/navigation";
import { cards } from "@/data/cards";
import { sectionMap } from "@/data/sections";
import { unitMap, units } from "@/data/units";
import { PrimaryLink } from "@/components/PrimaryLink";
import { CardCheckmark, UnitProgressBadge } from "@/components/Checkmarks";

type UnitPageProps = { params: Promise<{ unitId: string }> };

export function generateStaticParams() {
  return units.map((unit) => ({ unitId: unit.id }));
}

export default async function UnitPage({ params }: UnitPageProps) {
  const { unitId } = await params;
  const unit = unitMap[unitId];
  if (!unit) notFound();

  const unitCards = cards.filter((card) => card.unitId === unit.id);
  const unitCardIds = unitCards.map((card) => card.id);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-line bg-white p-5 shadow-soft sm:p-7">
        <div className="flex items-center justify-between gap-2">
          <Link href={`/sections/${unit.section}`} className="focus-ring rounded-md text-sm font-bold text-mint">{sectionMap[unit.section].name}</Link>
          <UnitProgressBadge cardIds={unitCardIds} />
        </div>
        <h1 className="mt-3 text-3xl font-black">{unit.title}</h1>
        <div className="mt-3 inline-flex rounded-lg bg-mint/10 px-3 py-2 text-lg font-black text-mint">{unit.pattern}</div>
        <p className="mt-4 text-base font-bold text-ink/80">{unit.meaningJa}</p>
        <p className="mt-2 max-w-2xl leading-7 text-ink/70">{unit.description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <PrimaryLink href={`/study/${unit.id}`}>学習開始</PrimaryLink>
          <PrimaryLink href={`/sections/${unit.section}`} variant="outline">Unit一覧へ</PrimaryLink>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-black">カード一覧</h2>
        <div className="mt-3 grid gap-3">
          {unitCards.map((card, index) => (
            <div key={card.id} className="rounded-lg border border-line bg-white p-4 shadow-soft">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-bold text-ink/45">Card {index + 1}</div>
                <CardCheckmark cardId={card.id} />
              </div>
              <div className="mt-2 text-lg font-black">{card.questionJa}</div>
              <div className="mt-2 text-sm font-semibold text-ink/55">{card.hints.join(" / ")}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
