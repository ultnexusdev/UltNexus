import { Star } from "lucide-react";
import Link from "next/link";
import type { ContentItem } from "@/lib/mockData";

interface ContentCardProps {
  item: ContentItem;
  index?: number;
}

export default function ContentCard({ item, index = 0 }: ContentCardProps) {
  return (
    <Link
      href={`/${item.type.toLowerCase()}s/${item.id}`}
      className={`group relative rounded-2xl overflow-hidden bg-[var(--surface)] border border-white/5 card-hover animate-fade-in-up block`}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        {item.poster ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.poster}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/30 text-xs">
            No Image
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs font-semibold text-yellow-400">
          <Star size={11} fill="currentColor" />
          {item.rating.toFixed(1)}
        </div>

        {/* Type badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[var(--accent-primary)]/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
          {item.type}
        </div>

        {/* Hover info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-[var(--accent-primary)] transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-[var(--foreground-dim)]">
            {item.genre}
          </span>
          <span className="text-xs text-[var(--foreground-dim)]">
            {item.year}
          </span>
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}
