import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContentCard from "./ContentCard";
import type { ContentItem } from "@/lib/mockData";

interface CategorySectionProps {
  title: string;
  href: string;
  items: ContentItem[];
  accentColor?: string;
}

export default function CategorySection({
  title,
  href,
  items,
  accentColor = "var(--accent-primary)",
}: CategorySectionProps) {
  return (
    <section className="py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div
            className="w-1 h-8 rounded-full"
            style={{ background: accentColor }}
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        </div>
        <Link
          href={href}
          className="group flex items-center gap-1.5 text-sm font-medium text-[var(--foreground-muted)] hover:text-white transition-colors"
        >
          View All
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Scrollable cards */}
      <div className="scroll-container flex gap-5 pb-4">
        {items.map((item, i) => (
          <div key={item.id} className="scroll-item w-[200px] sm:w-[220px]">
            <ContentCard item={item} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
