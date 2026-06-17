import type { Metadata } from "next";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import { series, categoryMeta } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Series — UltNexus",
  description:
    "Track your favorite TV series, discover new shows, and never lose track of where you left off. UltNexus keeps your watchlist organized.",
};

export default function SeriesPage() {
  return (
    <CategoryPageLayout
      title="Series"
      description="Track your binge sessions, discover new shows, and never forget where you left off."
      accentColor={categoryMeta.SERIES.color}
      items={series}
    />
  );
}
