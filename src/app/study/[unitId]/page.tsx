import { notFound } from "next/navigation";
import { cards } from "@/data/cards";
import { unitMap, units } from "@/data/units";
import { StudySession } from "@/components/StudySession";

type StudyPageProps = { params: Promise<{ unitId: string }> };

export function generateStaticParams() {
  return units.map((unit) => ({ unitId: unit.id }));
}

export default async function StudyPage({ params }: StudyPageProps) {
  const { unitId } = await params;
  const unit = unitMap[unitId];
  if (!unit) notFound();

  const unitCards = cards.filter((card) => card.unitId === unit.id);
  const nextUnit = units[units.findIndex((item) => item.id === unit.id) + 1];

  return (
    <StudySession
      key={unit.id}
      cards={unitCards}
      title={unit.title}
      doneHref={`/units/${unit.id}`}
      nextHref={nextUnit ? `/study/${nextUnit.id}` : undefined}
      nextLabel={nextUnit?.title}
    />
  );
}
