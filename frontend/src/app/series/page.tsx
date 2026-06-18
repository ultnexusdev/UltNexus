import type { Metadata } from "next";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import { categoryMeta } from "@/lib/mockData";
import { fetchSeries } from "@/lib/api";

export const metadata: Metadata = {
  title: "Series — UltNexus",
  description:
    "Track your favorite TV series. Log episodes, rate seasons, and never lose your place again.",
};

export default async function SeriesPage() {
  const series = await fetchSeries();

  return (
    <CategoryPageLayout
      title="TV Series"
      description="Track your favorite shows, log episodes, and never lose your place again."
      accentColor={categoryMeta.SERIES.color}
      items={series}
    />
  );
}
