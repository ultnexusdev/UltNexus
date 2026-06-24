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
      className={`group relative rounded-2xl overflow-hidden bg-transparent border border-white/10 hover:border-white/20 animate-fade-in-up block transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]`}
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

        {/* Overlay gradient (Always visible at bottom for text, darker on hover) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs font-semibold text-yellow-400">
          <Star size={11} fill="currentColor" />
          {item.rating.toFixed(1)}
        </div>

        {/* Type badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[var(--accent-primary)]/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
          {item.type}
        </div>

        {/* Card Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-base font-bold text-white drop-shadow-md mb-1 line-clamp-1 group-hover:text-[var(--accent-primary)] transition-colors">
            {item.title}
          </h3>
          <div className="flex items-center justify-between text-xs font-medium text-white/80 drop-shadow">
            <span>{item.genre}</span>
            <span>{item.year}</span>
          </div>
          {/* Hover extra info (description) */}
          <div className="h-0 overflow-hidden opacity-0 group-hover:h-12 group-hover:opacity-100 transition-all duration-500 mt-2">
            <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
