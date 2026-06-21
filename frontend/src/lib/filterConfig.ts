export interface SortOption {
  label: string;
  value: string;
}

export interface FilterCategory {
  label: string;
  options: { label: string; value: string }[];
}

export const sortOptions: SortOption[] = [
  { label: "Film Name (A-Z)", value: "name_asc" },
  { label: "Film Name (Z-A)", value: "name_desc" },
  { label: "Release Date (Newest First)", value: "date_desc" },
  { label: "Release Date (Earliest First)", value: "date_asc" },
  { label: "Average Rating (Highest First)", value: "rating_desc" },
  { label: "Average Rating (Lowest First)", value: "rating_asc" },
  { label: "Film Length (Shortest First)", value: "length_asc" },
  { label: "Film Length (Longest First)", value: "length_desc" },
  { label: "Popularity (All Time)", value: "popular_all_time" },
  { label: "Popularity (This Year)", value: "popular_this_year" },
  { label: "Popularity (This Month)", value: "popular_this_month" },
  { label: "Popularity (This Week)", value: "popular_this_week" },
];

export const yearsFilter: FilterCategory = {
  label: "YEAR",
  options: [
    { label: "All", value: "all" },
    { label: "Upcoming", value: "upcoming" },
    { label: "2026", value: "2026" },
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2020s", value: "2020s" },
    { label: "2010s", value: "2010s" },
    { label: "2000s", value: "2000s" },
    { label: "1990s", value: "1990s" },
    { label: "1980s", value: "1980s" },
    { label: "1870s", value: "1870s" },
  ],
};

export const ratingFilter: FilterCategory = {
  label: "RATING",
  options: [
    { label: "All", value: "all" },
    { label: "Highest Rated", value: "highest" },
    { label: "Most Voted", value: "most_voted" },
    { label: "IMDB Top 250", value: "imdb_top" },
  ],
};

export const genreFilter: FilterCategory = {
  label: "GENRE",
  options: [
    { label: "All", value: "all" },
    { label: "Action", value: "Action" },
    { label: "Adventure", value: "Adventure" },
    { label: "Animation", value: "Animation" },
    { label: "Comedy", value: "Comedy" },
    { label: "Crime", value: "Crime" },
    { label: "Documentary", value: "Documentary" },
    { label: "Drama", value: "Drama" },
    { label: "Family", value: "Family" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "History", value: "History" },
    { label: "Horror", value: "Horror" },
    { label: "Music", value: "Music" },
    { label: "Mystery", value: "Mystery" },
    { label: "Romance", value: "Romance" },
    { label: "Sci-Fi", value: "Sci-Fi" },
    { label: "Thriller", value: "Thriller" },
    { label: "War", value: "War" },
    { label: "Western", value: "Western" },
  ],
};

export const serviceFilter: FilterCategory = {
  label: "SERVICE",
  options: [
    { label: "All", value: "all" },
    { label: "Netflix", value: "netflix" },
    { label: "Amazon Prime Video", value: "amazon" },
    { label: "Disney+", value: "disney" },
    { label: "Apple TV+", value: "apple" },
    { label: "Hulu", value: "hulu" },
    { label: "Max", value: "max" },
    { label: "BluTV", value: "blutv" },
    { label: "Exxen", value: "exxen" },
  ],
};

export const otherFilter: FilterCategory = {
  label: "OTHER",
  options: [
    { label: "All", value: "all" },
    { label: "Most Anticipated", value: "anticipated" },
    { label: "Opening Soon (US)", value: "opening_soon" },
    { label: "Collections", value: "collections" },
    { label: "Countries / Languages", value: "countries" },
  ],
};
