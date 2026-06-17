import type { Metadata } from "next";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import { animes, categoryMeta } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Animes — UltNexus",
  description:
    "Explore and track your anime journey. From shonen to slice of life, rate and organize every title on UltNexus.",
};

export default function AnimesPage() {
  return (
    <CategoryPageLayout
      title="Animes"
      description="From shonen epics to slice of life — explore, rate, and track your anime journey."
      accentColor={categoryMeta.ANIME.color}
      items={animes}
    />
  );
}
