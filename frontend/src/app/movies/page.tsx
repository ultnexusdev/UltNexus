import type { Metadata } from "next";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import { categoryMeta } from "@/lib/mockData";
import { fetchMovies } from "@/lib/api";

export const metadata: Metadata = {
  title: "Movies — UltNexus",
  description:
    "Discover, track, and rate movies. From blockbusters to hidden gems, find your next favorite film on UltNexus.",
};

export default async function MoviesPage() {
  const movies = await fetchMovies();

  return (
    <CategoryPageLayout
      title="Movies"
      description="From blockbusters to indie gems — discover, track, and rate every film you watch."
      accentColor={categoryMeta.MOVIE.color}
      items={movies}
    />
  );
}
