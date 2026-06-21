"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchContent } from "@/lib/api";
import type { ContentItem } from "@/lib/mockData";
import ContentCard from "@/components/ContentCard";
import { Loader2 } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState<ContentItem[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!query) return;

    const fetchInitial = async () => {
      setIsInitialLoad(true);
      setPage(1);
      const data = await searchContent(query, 1);
      setResults(data);
      setHasMore(data.length === 20); // Assuming 20 is TMDB's page size
      setIsInitialLoad(false);
    };

    fetchInitial();
  }, [query]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const nextPage = page + 1;
    const data = await searchContent(query, nextPage);
    
    if (data.length > 0) {
      setResults((prev) => [...prev, ...data]);
      setPage(nextPage);
    }
    if (data.length < 20) {
      setHasMore(false);
    }
    setIsLoading(false);
  };

  if (!query) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex justify-center text-white">
        Please enter a search query.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
          <h1 className="text-sm font-bold text-[#89a] uppercase tracking-wider">
            SHOWING MATCHES FOR "{query}"
          </h1>
          <span className="text-sm text-[#89a]">
            {results.length} {results.length === 1 ? "result" : "results"} loaded
          </span>
        </div>

        {isInitialLoad ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#00e054]" size={32} />
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
              {results.map((item, i) => (
                <ContentCard key={`${item.id}-${i}`} item={item} index={i} />
              ))}
            </div>
            
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-[#2c3440] hover:bg-[#445566] text-white px-8 py-3 rounded text-sm font-semibold transition-colors disabled:opacity-50"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {isLoading ? "LOADING..." : "SHOW MORE RESULTS"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center text-[#89a]">
            No films found matching "{query}".
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#14181c]" />}>
      <SearchResults />
    </Suspense>
  );
}
