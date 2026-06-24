"use client";

import React from "react";
import Link from "next/link";
import { Zap, Compass, Star } from "lucide-react";
import type { ContentItem } from "@/lib/mockData";

// Mock i18n
const t = (key: string) => {
  const translations: Record<string, string> = {
    "categories.movies": "MOVIES",
    "categories.series": "SERIES",
    "categories.animes": "ANIMES",
    "categories.books": "BOOKS",
  };
  return translations[key] || key;
};

interface HomeShowcaseProps {
  movies: ContentItem[];
  series: ContentItem[];
  animes: ContentItem[];
  books: ContentItem[];
}

// Helper to fill grid with enough posters seamlessly
const fillItems = (items: ContentItem[], count: number) => {
  if (!items || items.length === 0) return [];
  if (items.length >= count) return items.slice(0, count);
  const repeated = [];
  while (repeated.length < count) {
    repeated.push(...items);
  }
  return repeated.slice(0, count);
};

export default function HomeShowcase({ movies, series, animes, books }: HomeShowcaseProps) {
  const slices = [
    { 
      id: 'left-deco', 
      title: "", 
      items: [], 
      href: '#', 
      color: 'from-zinc-950', 
      hoverBorder: 'group-hover:border-white/20', 
      shadow: 'group-hover:shadow-none',
      isDeco: true
    },
    { 
      id: 'movies', 
      title: t("categories.movies"), 
      items: movies, 
      href: '/movies', 
      color: 'from-blue-600/30', 
      hoverBorder: 'group-hover:border-blue-500', 
      shadow: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]' 
    },
    { 
      id: 'series', 
      title: t("categories.series"), 
      items: series, 
      href: '/series', 
      color: 'from-emerald-600/30', 
      hoverBorder: 'group-hover:border-emerald-500', 
      shadow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)]' 
    },
    { 
      id: 'animes', 
      title: t("categories.animes"), 
      items: animes, 
      href: '/animes', 
      color: 'from-rose-600/30', 
      hoverBorder: 'group-hover:border-rose-500', 
      shadow: 'group-hover:shadow-[0_0_30px_rgba(244,63,94,0.6)]' 
    },
    { 
      id: 'books', 
      title: t("categories.books"), 
      items: books, 
      href: '/books', 
      color: 'from-amber-600/30', 
      hoverBorder: 'group-hover:border-amber-500', 
      shadow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.6)]' 
    },
    { 
      id: 'right-deco', 
      title: "", 
      items: [], 
      href: '#', 
      color: 'from-zinc-950', 
      hoverBorder: 'group-hover:border-white/20', 
      shadow: 'group-hover:shadow-none',
      isDeco: true
    },
  ];

  return (
    <div className="w-full flex flex-col font-sans">
      {/* 1. Showcase Banner (The Slanted Slices) */}
      <section className="relative w-full h-[60vh] md:h-[550px] bg-zinc-950 overflow-hidden flex">
        
        {/* We make the container slightly wider to hide the skewed edges */}
        <div className="absolute inset-y-0 -left-[10%] -right-[10%] flex z-0">
          {slices.map((slice, index) => (
            <Link
              key={`${slice.id}-${index}`}
              href={slice.href}
              className={`group relative flex-1 skew-x-[-12deg] overflow-hidden transition-all duration-700 ease-out ${slice.isDeco ? 'hover:flex-[1]' : 'hover:flex-[1.8]'} border-r-2 border-white/20 last:border-r-0 block hover:z-10 ${slice.hoverBorder} ${slice.shadow} ${slice.isDeco ? 'cursor-default pointer-events-none' : 'cursor-pointer'}`}
              onClick={(e) => slice.isDeco && e.preventDefault()}
            >
              {/* Unskewed Content Container for Background Posters */}
              <div className={`absolute inset-[-50%] skew-x-[12deg] ${slice.isDeco ? 'bg-zinc-950' : 'bg-zinc-900'} overflow-hidden`}>
                
                {/* Mosaic/Grid of Posters (No gaps, Dense Grid) */}
                {!slice.isDeco && (
                  <div className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-0 opacity-40 group-hover:opacity-100 blur-[3px] group-hover:blur-none transition-all duration-700 ease-in-out scale-105 group-hover:scale-100 bg-black">
                    {fillItems(slice.items, 30).map((item, idx) => (
                      <div key={`${item.id}-${idx}`} className="relative w-full aspect-[2/3] overflow-hidden m-0 p-0">
                        <img 
                          src={item.poster || "https://via.placeholder.com/300x450?text=No+Poster"} 
                          alt={item.title}
                          className="block w-full h-full object-cover scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Dark Overlay Gradient to ensure text readability */}
                {!slice.isDeco && (
                  <div className={`absolute inset-0 bg-gradient-to-t ${slice.color} to-zinc-950/90 group-hover:to-zinc-950/20 transition-colors duration-700`} />
                )}
              </div>

              {/* Category Title positioned perfectly centered and unskewed */}
              {!slice.isDeco && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <h2 className="skew-x-[12deg] text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/40 group-hover:from-white group-hover:to-white/90 transition-all duration-700 transform group-hover:scale-110 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                    {slice.title}
                  </h2>
                </div>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Slogan & CTA (Normal Flow Below Banner) */}
      <section className="relative w-full py-16 flex flex-col items-center justify-center px-4 bg-zinc-950">
        <div className="max-w-4xl flex flex-col items-center text-center animate-fade-in-up">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300 mb-8">
            <Zap size={12} className="text-indigo-400" />
            Your Ultimate Entertainment Hub
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
            Track Everything
            <br />
            You{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Love
            </span> to Watch
            <br />
            &amp; Read
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 leading-relaxed mb-10">
            Discover, rate, and organize your favorite movies, series, animes, and books.
            Join a global community of entertainment enthusiasts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#" className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-base px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-1">
              <Compass size={18} />
              Start Exploring
            </Link>
            <Link href="#trending" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium text-base px-8 py-3.5 rounded-xl backdrop-blur-md transition-all border border-white/10 hover:-translate-y-1">
              <Star size={18} />
              See What&apos;s Trending
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
