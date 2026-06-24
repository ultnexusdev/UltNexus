"use client";

import { ChevronDown, Search, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  yearsFilter,
  ratingFilter,
  genreFilter,
  serviceFilter,
  otherFilter,
  sortOptions,
  FilterCategory,
} from "@/lib/filterConfig";
import { searchContent } from "@/lib/api";
import type { ContentItem } from "@/lib/mockData";

// Mock i18n function
const t = (key: string) => {
  const translations: Record<string, string> = {
    "filter.search_placeholder": "Search...",
  };
  return translations[key] || key;
};

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedYear: string;
  setSelectedYear: (y: string) => void;
  selectedRating: string;
  setSelectedRating: (r: string) => void;
  selectedGenre: string;
  setSelectedGenre: (g: string) => void;
  selectedService: string;
  setSelectedService: (s: string) => void;
  selectedOther: string;
  setSelectedOther: (o: string) => void;
  selectedSort: string;
  setSelectedSort: (s: string) => void;
}

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedRating,
  setSelectedRating,
  selectedGenre,
  setSelectedGenre,
  selectedService,
  setSelectedService,
  selectedOther,
  setSelectedOther,
  selectedSort,
  setSelectedSort,
}: FilterBarProps) {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<ContentItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced search for autocomplete
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setShowDropdown(true);
      const results = await searchContent(searchQuery);
      setSuggestions(results.slice(0, 5)); // Show max 5 suggestions
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setShowDropdown(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const FilterDropdown = ({
    category,
    selectedValue,
    onSelect,
  }: {
    category: FilterCategory;
    selectedValue: string;
    onSelect: (val: string) => void;
  }) => {
    const activeOption = category.options.find((o) => o.value === selectedValue);
    const displayLabel = selectedValue !== "all" && activeOption ? activeOption.label : category.label;

    return (
      <div className="relative group/dropdown">
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 hover:border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 uppercase tracking-wide">
          <span className="truncate max-w-[120px]">{displayLabel}</span>
          <ChevronDown size={14} className="group-hover/dropdown:rotate-180 transition-transform duration-200" />
        </button>

        <div className="absolute top-full left-0 mt-0 w-48 pt-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 z-50">
          <div className="bg-[#2c3440] border border-[#445566] rounded shadow-xl overflow-hidden py-1">
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              {category.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onSelect(opt.value)}
                  className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                    selectedValue === opt.value
                      ? "bg-[#00e054] text-white font-semibold"
                      : "text-[#89a] hover:bg-[#445566] hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SortDropdown = () => {
    const activeSort = sortOptions.find((o) => o.value === selectedSort);
    return (
      <div className="relative group/dropdown">
        <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 hover:border-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all duration-300 uppercase tracking-wide">
          <span className="truncate max-w-[120px]">
            {activeSort ? activeSort.label.split(" (")[0] : "SORT BY"}
          </span>
          <ChevronDown size={14} className="group-hover/dropdown:rotate-180 transition-transform duration-200" />
        </button>

        <div className="absolute top-full left-0 mt-0 w-56 pt-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200 z-50">
          <div className="bg-[#2c3440] border border-[#445566] rounded shadow-xl overflow-hidden py-1">
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedSort(opt.value)}
                  className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                    selectedSort === opt.value
                      ? "bg-[#00e054] text-white font-semibold"
                      : "text-[#89a] hover:bg-[#445566] hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-transparent border-b border-white/5 px-4 py-4 mb-8 gap-4">
      <div className="flex items-center">
        <span className="text-xs text-[var(--foreground-muted)] font-semibold tracking-wider mr-4">BROWSE BY</span>
        <div className="flex items-center gap-2 flex-wrap">
          <FilterDropdown category={yearsFilter} selectedValue={selectedYear} onSelect={setSelectedYear} />
          <FilterDropdown category={ratingFilter} selectedValue={selectedRating} onSelect={setSelectedRating} />
          <SortDropdown />
          <FilterDropdown category={genreFilter} selectedValue={selectedGenre} onSelect={setSelectedGenre} />
          <FilterDropdown category={serviceFilter} selectedValue={selectedService} onSelect={setSelectedService} />
          <FilterDropdown category={otherFilter} selectedValue={selectedOther} onSelect={setSelectedOther} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-[var(--foreground-muted)] font-semibold tracking-wider uppercase hidden md:inline-block">Find A Film</span>
        <div className="relative" ref={searchContainerRef}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (searchQuery.length >= 2) setShowDropdown(true);
            }}
            placeholder={t("filter.search_placeholder")}
            className="w-64 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent-primary)] focus:bg-white/10 focus:shadow-[0_0_20px_var(--accent-primary-transparent)] transition-all duration-300"
          />
          {isSearching ? (
            <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89a] animate-spin" />
          ) : (
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#89a]" />
          )}

          {/* Autocomplete Dropdown */}
          {showDropdown && (
            <div className="absolute top-full right-0 mt-1 w-72 bg-[#2c3440] border border-[#445566] rounded shadow-2xl z-50 overflow-hidden">
              {suggestions.length > 0 ? (
                <div className="flex flex-col">
                  {suggestions.map((item, idx) => (
                    <Link
                      key={item.id}
                      href={`/movies/${item.id.replace('m_', '')}`}
                      className={`flex flex-col px-4 py-2 hover:bg-[#445566] transition-colors ${
                        idx !== 0 ? 'border-t border-[#445566]/50' : ''
                      }`}
                    >
                      <span className="text-sm font-semibold text-white">{item.title}</span>
                      <span className="text-xs text-[#89a]">{item.year || 'Unknown Year'}</span>
                    </Link>
                  ))}
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="block w-full text-center px-4 py-2 text-xs font-semibold text-white bg-[#445566]/50 hover:bg-[#445566] transition-colors"
                  >
                    Show all results for "{searchQuery}"
                  </Link>
                </div>
              ) : !isSearching ? (
                <div className="px-4 py-3 text-sm text-[#89a]">No results found.</div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
