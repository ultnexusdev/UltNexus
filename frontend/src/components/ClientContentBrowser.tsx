"use client";

import { useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import ContentCard from "./ContentCard";
import type { ContentItem } from "@/lib/mockData";

interface ClientContentBrowserProps {
  initialItems: ContentItem[];
}

export default function ClientContentBrowser({ initialItems }: ClientContentBrowserProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedService, setSelectedService] = useState("all");
  const [selectedOther, setSelectedOther] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular_all_time");

  const filteredAndSortedItems = useMemo(() => {
    let result = [...initialItems];

    // 1. Search Query Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    // 2. Year Filter
    if (selectedYear !== "all") {
      if (selectedYear === "upcoming") {
        result = result.filter((item) => item.year > new Date().getFullYear());
      } else if (selectedYear.endsWith("s")) {
        const decade = parseInt(selectedYear.replace("s", ""));
        result = result.filter((item) => item.year >= decade && item.year < decade + 10);
      } else {
        const year = parseInt(selectedYear);
        result = result.filter((item) => item.year === year);
      }
    }

    // 3. Genre Filter
    if (selectedGenre !== "all") {
      // Mock data uses a single string for genre (e.g., "Sci-Fi", "Action / Fantasy")
      // In a real app with arrays of genres, this would check if the array includes the genre
      result = result.filter((item) => 
        item.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Note: Rating, Service, Other filters are mocked for now since mockData doesn't fully support all fields yet.
    // E.g., highest rating
    if (selectedRating === "highest") {
        result = result.filter(item => item.rating >= 8.5);
    } else if (selectedRating === "imdb_top") {
        result = result.filter(item => item.rating >= 8.0);
    }

    // 4. Sorting
    result.sort((a, b) => {
      switch (selectedSort) {
        case "name_asc":
          return a.title.localeCompare(b.title);
        case "name_desc":
          return b.title.localeCompare(a.title);
        case "date_desc":
          return b.year - a.year;
        case "date_asc":
          return a.year - b.year;
        case "rating_desc":
          return b.rating - a.rating;
        case "rating_asc":
          return a.rating - b.rating;
        // Mock sorting for length and popularity since mockData doesn't have it
        case "length_asc":
        case "length_desc":
        case "popular_all_time":
        case "popular_this_year":
        case "popular_this_month":
        case "popular_this_week":
        default:
           // Keep default or fallback to rating for popularity
          return b.rating - a.rating; 
      }
    });

    return result;
  }, [
    initialItems,
    searchQuery,
    selectedYear,
    selectedRating,
    selectedGenre,
    selectedService,
    selectedOther,
    selectedSort,
  ]);

  return (
    <div className="w-full">
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        selectedOther={selectedOther}
        setSelectedOther={setSelectedOther}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      {/* Content Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        {filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
            {filteredAndSortedItems.map((item, i) => (
              <ContentCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-[var(--foreground-muted)]">
            <p className="text-lg font-medium mb-2">No results found</p>
            <p className="text-sm">Try adjusting your filters or search query.</p>
          </div>
        )}

        {/* Results info */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[var(--foreground-dim)]">
            Showing {filteredAndSortedItems.length} results
          </p>
        </div>
      </section>
    </div>
  );
}
