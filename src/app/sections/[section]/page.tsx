import Link from "next/link";
import { notFound } from "next/navigation";
import { cards } from "@/data/cards";
import { sectionMap } from "@/data/sections";
import { units } from "@/data/units";
import type { Section } from "@/types";

type SectionPageProps = { params: Promise<{ section: string }> };

const isSection = (value: string): value is Section => value === "core" || value === "daily" || value === "business";

export function generateStaticParams() {
  return (["core", "daily", "business"] satisfies Section[]).map((section) => ({ section }));
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section: rawSection } = await params;
  if (!isSection(rawSection)) notFound();

  const section = sectionMap[rawSection];
  const sectionUnits = units.filter((unit) => unit.section === rawSection);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-line bg-white p-5 shadow-soft sm:p-7">
        <p className="text-sm font-bold text-mint">{section.shortName}</p>
        <h1 className="mt-2 text-3xl font-black">{section.name}</h1>
        <p className="mt-3 max-w-2xl leading-7 text-ink/70">{section.description}</p>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        {sectionUnits.map((unit, index) => {
          const cardCount = cards.filter((card) => card.unitId === unit.id).length;
          return (
            <Link key={unit.id} href={`/units/${unit.id}`} className="focus-ring rounded-lg border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-mint">
              <div className="text-sm font-bold text-ink/45">Unit {index + 1}</div>
              <h2 className="mt-2 text-xl font-black">{unit.title}</h2>
              <div className="mt-2 inline-flex rounded-lg bg-mint/10 px-3 py-2 text-sm font-bold text-mint">{unit.pattern}</div>
              <p className="mt-3 text-sm leading-6 text-ink/65">{unit.description}</p>
              <div className="mt-4 text-sm font-bold text-ink/60">{cardCount} Cards</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
