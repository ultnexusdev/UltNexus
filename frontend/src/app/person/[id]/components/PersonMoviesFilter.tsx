"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { ContentItem } from "@/lib/api";
import ContentCard from "@/components/ContentCard";
import { ChevronDown, Eye, Check } from "lucide-react";

interface PersonMoviesFilterProps {
  movies: ContentItem[];
  personName: string;
}

type SortOption = 
  | "Popularity" 
  | "Release Date (Newest First)" 
  | "Release Date (Earliest First)" 
  | "Rating (Highest First)" 
  | "Rating (Lowest First)"
  | "Film Name";

export default function PersonMoviesFilter({ movies, personName }: PersonMoviesFilterProps) {
  const [sort, setSort] = useState<SortOption>("Popularity");
  const [selectedDecade, setSelectedDecade] = useState<string>("All");
  const [selectedGenre, setSelectedGenre] = useState<string>("All");
  const [selectedService, setSelectedService] = useState<string>("All");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const decades = useMemo(() => {
    const decs = new Set<string>();
    movies.forEach(m => {
      if (m.year) {
        const dec = Math.floor(m.year / 10) * 10;
        decs.add(`${dec}s`);
      }
    });
    return ["All", ...Array.from(decs).sort((a, b) => b.localeCompare(a))];
  }, [movies]);

  const genres = useMemo(() => {
    const gens = new Set<string>();
    movies.forEach(m => {
      if (m.genre) {
        // split by / or , if multiple
        m.genre.split(/[/,]/).forEach(g => gens.add(g.trim()));
      }
    });
    return ["All", ...Array.from(gens).sort()];
  }, [movies]);

  const services = ["All", "Netflix", "Amazon Prime", "Hulu", "Disney+", "Apple TV+"];

  const sortOptions: SortOption[] = [
    "Popularity",
    "Film Name",
    "Release Date (Newest First)",
    "Release Date (Earliest First)",
    "Rating (Highest First)",
    "Rating (Lowest First)"
  ];

  const filteredMovies = useMemo(() => {
    return movies.filter(m => {
      if (selectedDecade !== "All") {
        if (!m.year) return false;
        const dec = Math.floor(m.year / 10) * 10;
        if (`${dec}s` !== selectedDecade) return false;
      }
      if (selectedGenre !== "All") {
        if (!m.genre || !m.genre.includes(selectedGenre)) return false;
      }
      // Service filter is visual only for now since mockData doesn't have it
      return true;
    });
  }, [movies, selectedDecade, selectedGenre]);

  const sortedMovies = useMemo(() => {
    return [...filteredMovies].sort((a, b) => {
      switch (sort) {
        case "Release Date (Newest First)":
          return (b.year || 0) - (a.year || 0);
        case "Release Date (Earliest First)":
          return (a.year || 0) - (b.year || 0);
        case "Rating (Highest First)":
          return (b.rating || 0) - (a.rating || 0);
        case "Rating (Lowest First)":
          return (a.rating || 0) - (b.rating || 0);
        case "Film Name":
          return a.title.localeCompare(b.title);
        case "Popularity":
        default:
          return 0; // Assuming original array is by popularity
      }
    });
  }, [filteredMovies, sort]);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const renderDropdownMenu = (name: string, options: string[], selectedValue: string, onSelect: (val: any) => void) => {
    if (openDropdown !== name) return null;
    return (
      <div className="absolute top-full left-0 mt-2 w-48 bg-[#1c2228] border border-white/10 rounded-md shadow-xl py-2 z-50">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              onSelect(opt);
              setOpenDropdown(null);
            }}
            className={`w-full text-left px-4 py-1.5 text-sm flex items-center justify-between hover:bg-white/10 transition-colors ${selectedValue === opt ? 'text-white' : 'text-white/60'}`}
          >
            {opt}
            {selectedValue === opt && <Check className="w-4 h-4 text-emerald-400" />}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="mt-12" ref={dropdownRef}>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4 mb-6">
        <h2 className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-4 md:mb-0">
          FILMS FEATURING <br/>
          <span className="text-white text-xl">{personName}</span>
        </h2>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white/50 relative">
          
          {/* DECADE */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('decade')}
              className={`flex items-center gap-1 hover:text-white transition-colors ${openDropdown === 'decade' || selectedDecade !== 'All' ? 'text-white' : ''}`}
            >
              DECADE {selectedDecade !== 'All' && <span className="text-emerald-400">({selectedDecade})</span>} <ChevronDown className="w-3 h-3" />
            </button>
            {renderDropdownMenu('decade', decades, selectedDecade, setSelectedDecade)}
          </div>

          {/* GENRE */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('genre')}
              className={`flex items-center gap-1 hover:text-white transition-colors ${openDropdown === 'genre' || selectedGenre !== 'All' ? 'text-white' : ''}`}
            >
              GENRE {selectedGenre !== 'All' && <span className="text-emerald-400">({selectedGenre})</span>} <ChevronDown className="w-3 h-3" />
            </button>
            {renderDropdownMenu('genre', genres, selectedGenre, setSelectedGenre)}
          </div>

          {/* SERVICE */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('service')}
              className={`flex items-center gap-1 hover:text-white transition-colors ${openDropdown === 'service' || selectedService !== 'All' ? 'text-white' : ''}`}
            >
              SERVICE {selectedService !== 'All' && <span className="text-emerald-400">({selectedService})</span>} <ChevronDown className="w-3 h-3" />
            </button>
            {renderDropdownMenu('service', services, selectedService, setSelectedService)}
          </div>

          <span className="text-white/20">|</span>
          
          {/* SORT BY */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('sort')}
              className={`flex items-center gap-1 hover:text-white transition-colors ${openDropdown === 'sort' ? 'text-white' : ''}`}
            >
              Sort by <span className="text-white">{sort}</span> <ChevronDown className="w-3 h-3" />
            </button>
            {renderDropdownMenu('sort', sortOptions, sort, setSort)}
          </div>

          <button className="hover:text-emerald-400 transition-colors ml-2">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {sortedMovies.length > 0 ? (
          sortedMovies.map((movie) => (
            <ContentCard key={movie.id} item={movie} />
          ))
        ) : (
          <p className="text-white/50 col-span-full py-10 text-center">No movies match your filters.</p>
        )}
      </div>
    </div>
  );
}
