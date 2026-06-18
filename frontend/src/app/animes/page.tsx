import type { Metadata } from "next";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import { categoryMeta } from "@/lib/mockData";
import { fetchAnimes } from "@/lib/api";

export const metadata: Metadata = {
  title: "Animes — UltNexus",
  description:
    "Explore the world of anime. From classics to currently airing seasonal hits.",
};

export default async function AnimesPage() {
  const animes = await fetchAnimes();

  return (
    <CategoryPageLayout
      title="Animes"
      description="Explore the world of anime. From classics to currently airing seasonal hits."
      accentColor={categoryMeta.ANIME.color}
      items={animes}
    />
  );
}
