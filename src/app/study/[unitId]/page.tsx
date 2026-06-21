import { notFound } from "next/navigation";
import { cards } from "@/data/cards";
import { unitMap } from "@/data/units";
import { StudySession } from "@/components/StudySession";

type StudyPageProps = { params: Promise<{ unitId: string }> };

export default async function StudyPage({ params }: StudyPageProps) {
  const { unitId } = await params;
  const unit = unitMap[unitId];
  if (!unit) notFound();

  const unitCards = cards.filter((card) => card.unitId === unit.id);
  return <StudySession cards={unitCards} title={unit.title} doneHref={`/units/${unit.id}`} />;
}
