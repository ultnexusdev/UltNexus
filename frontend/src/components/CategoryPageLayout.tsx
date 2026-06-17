import { Search, SlidersHorizontal } from "lucide-react";
import ContentCard from "./ContentCard";
import type { ContentItem } from "@/lib/mockData";

interface CategoryPageLayoutProps {
  title: string;
  description: string;
  accentColor: string;
  items: ContentItem[];
}

export default function CategoryPageLayout({
  title,
  description,
  accentColor,
  items,
}: CategoryPageLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-12 pb-10 overflow-hidden">
        {/* Accent orb */}
        <div
          className="orb w-[500px] h-[500px] -top-40 left-1/2 -translate-x-1/2"
          style={{ background: accentColor }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="w-1.5 h-10 rounded-full mb-4"
            style={{ background: accentColor }}
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            {title}
          </h1>
          <p className="text-lg text-[var(--foreground-muted)] max-w-xl">
            {description}
          </p>
        </div>
      </section>

      {/* Filters Bar (Visual) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-dim)]"
            />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--surface)] border border-white/5 text-sm text-white placeholder-[var(--foreground-dim)] focus:outline-none focus:border-[var(--accent-primary)]/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--surface)] border border-white/5 text-sm text-[var(--foreground-muted)] hover:text-white hover:border-white/10 transition-all">
            <SlidersHorizontal size={16} />
            Filters
          </button>
        </div>
      </section>

      {/* Content Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {items.map((item, i) => (
            <ContentCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* Results info */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[var(--foreground-dim)]">
            Showing {items.length} results
          </p>
        </div>
      </section>
    </div>
  );
}
