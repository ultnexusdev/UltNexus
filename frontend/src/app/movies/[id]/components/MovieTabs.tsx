"use client";

import { useState } from "react";
import { MovieDetail } from "@/lib/api";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface MovieTabsProps {
  movie: MovieDetail;
}

type Tab = "CAST" | "CREW" | "DETAILS" | "GENRES" | "WHERE TO WATCH";

export default function MovieTabs({ movie }: MovieTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab | null>("CAST");

  const tabs: Tab[] = ["CAST", "CREW", "DETAILS", "GENRES", "WHERE TO WATCH"];

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-4 border-b border-white/10 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(activeTab === tab ? null : tab)}
            className={`text-sm tracking-wider font-semibold uppercase transition-colors ${
              activeTab === tab ? "text-white border-b-2 border-emerald-500" : "text-white/50 hover:text-white/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab && (
        <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2">
          {activeTab === "CAST" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movie.cast?.length > 0 ? (
                movie.cast.map((person) => (
                  <Link key={person.id} href={`/person/${person.id}`} className="group flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 shrink-0">
                      {person.profile_path ? (
                        <img src={person.profile_path} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">No Img</div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{person.name}</span>
                      <span className="text-xs text-white/50">{person.character}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-white/50">No cast information available.</p>
              )}
            </div>
          )}

          {activeTab === "CREW" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {movie.crew?.length > 0 ? (
                movie.crew.map((person, idx) => (
                  <Link key={`${person.id}-${idx}`} href={`/person/${person.id}`} className="group flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{person.name}</span>
                      <span className="text-xs text-white/50">{person.job}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-white/50">No crew information available.</p>
              )}
            </div>
          )}

          {activeTab === "DETAILS" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-2">Studios</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.studios?.length > 0 ? movie.studios.map((s, i) => <span key={i} className="text-sm text-white">{s}</span>) : <span className="text-white/50">-</span>}
                </div>
              </div>
              <div>
                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-2">Countries</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.countries?.length > 0 ? movie.countries.map((c, i) => <span key={i} className="text-sm text-white">{c}</span>) : <span className="text-white/50">-</span>}
                </div>
              </div>
              <div>
                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {movie.languages?.length > 0 ? movie.languages.map((l, i) => <span key={i} className="text-sm text-white">{l}</span>) : <span className="text-white/50">-</span>}
                </div>
              </div>
            </div>
          )}

          {activeTab === "GENRES" && (
            <div className="flex flex-wrap gap-2">
              {movie.genres?.length > 0 ? movie.genres.map((g, i) => (
                <Link key={i} href={`/search?genre=${encodeURIComponent(g)}`} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 transition-colors">{g}</Link>
              )) : <span className="text-white/50">No genres listed.</span>}
            </div>
          )}

          {activeTab === "WHERE TO WATCH" && (
            <div className="flex flex-col gap-6">
              {movie.videos?.length > 0 && (
                <div>
                  <h4 className="text-white/70 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" /> Trailer
                  </h4>
                  <div className="aspect-video w-full max-w-2xl bg-black rounded-lg overflow-hidden">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${movie.videos[0].key}`} 
                      title="Trailer"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-white/70 text-xs uppercase tracking-wider mb-3">Streaming Platforms (US)</h4>
                <div className="flex flex-wrap gap-4">
                  {movie.watchProviders?.length > 0 ? (
                    movie.watchProviders.map((p) => (
                      <div key={p.provider_id} className="flex flex-col items-center gap-2">
                        <img src={p.logo_path} alt={p.provider_name} className="w-12 h-12 rounded-xl shadow-lg" />
                        <span className="text-xs text-white/70">{p.provider_name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-white/50 text-sm">Not available for streaming currently.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
