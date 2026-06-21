import ClientContentBrowser from "./ClientContentBrowser";
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

      {/* Filter Bar and Content Grid */}
      <ClientContentBrowser initialItems={items} />
    </div>
  );
}
