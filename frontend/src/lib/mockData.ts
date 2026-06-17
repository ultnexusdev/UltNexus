// ============================================================================
// UltNexus — Mock Data
// Realistic placeholder data for Movies, Series, Animes, and Books.
// This will be replaced by real API data in later phases.
// ============================================================================

export interface ContentItem {
  id: string;
  title: string;
  year: number;
  rating: number;
  genre: string;
  poster: string;
  description: string;
  type: "MOVIE" | "SERIES" | "ANIME" | "BOOK";
}

// Placeholder poster colors — will be replaced with real API images
const posterPlaceholder = (seed: string, hue: number) =>
  `https://placehold.co/300x450/${hueToHex(hue)}/${hueToHex((hue + 180) % 360)}?text=${encodeURIComponent(seed)}`;

function hueToHex(hue: number): string {
  const h = hue / 360;
  const s = 0.5;
  const l = 0.3;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
  return [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

// ---------------------------------------------------------------------------
// MOVIES
// ---------------------------------------------------------------------------
export const movies: ContentItem[] = [
  {
    id: "m1",
    title: "Echoes of Tomorrow",
    year: 2024,
    rating: 8.4,
    genre: "Sci-Fi",
    poster: posterPlaceholder("Echoes", 220),
    description: "A physicist discovers a way to send messages to her past self, but each change ripples forward in unexpected ways.",
    type: "MOVIE",
  },
  {
    id: "m2",
    title: "The Last Frontier",
    year: 2024,
    rating: 7.9,
    genre: "Adventure",
    poster: posterPlaceholder("Frontier", 140),
    description: "An expedition team ventures into uncharted territory where ancient civilizations left behind powerful secrets.",
    type: "MOVIE",
  },
  {
    id: "m3",
    title: "Crimson Veil",
    year: 2023,
    rating: 8.1,
    genre: "Thriller",
    poster: posterPlaceholder("Crimson", 0),
    description: "A retired detective is pulled back into the world of crime when a series of murders mirrors an unsolved case from her past.",
    type: "MOVIE",
  },
  {
    id: "m4",
    title: "Starborn",
    year: 2024,
    rating: 9.0,
    genre: "Sci-Fi",
    poster: posterPlaceholder("Starborn", 260),
    description: "Humanity's first contact with an alien civilization challenges everything we know about our place in the universe.",
    type: "MOVIE",
  },
  {
    id: "m5",
    title: "Winds of Change",
    year: 2023,
    rating: 7.6,
    genre: "Drama",
    poster: posterPlaceholder("Winds", 40),
    description: "Three generations of a family confront their legacy as political upheaval reshapes their homeland.",
    type: "MOVIE",
  },
  {
    id: "m6",
    title: "Neon Nights",
    year: 2024,
    rating: 8.3,
    genre: "Action",
    poster: posterPlaceholder("Neon", 300),
    description: "In a cyberpunk megacity, a street racer uncovers a corporate conspiracy that threatens millions of lives.",
    type: "MOVIE",
  },
  {
    id: "m7",
    title: "The Quiet Earth",
    year: 2023,
    rating: 7.8,
    genre: "Mystery",
    poster: posterPlaceholder("Quiet", 180),
    description: "A small town wakes up to find every electronic device has stopped working — and some residents have vanished.",
    type: "MOVIE",
  },
  {
    id: "m8",
    title: "Atlas Rising",
    year: 2024,
    rating: 8.7,
    genre: "Fantasy",
    poster: posterPlaceholder("Atlas", 280),
    description: "An ancient titan awakens beneath the ocean, and a young archaeologist holds the only key to preventing catastrophe.",
    type: "MOVIE",
  },
];

// ---------------------------------------------------------------------------
// SERIES
// ---------------------------------------------------------------------------
export const series: ContentItem[] = [
  {
    id: "s1",
    title: "Shadow Protocol",
    year: 2024,
    rating: 8.8,
    genre: "Thriller",
    poster: posterPlaceholder("Shadow", 210),
    description: "An elite intelligence unit operates in the gray zone between nations, where loyalty is the most dangerous weapon.",
    type: "SERIES",
  },
  {
    id: "s2",
    title: "The Gilded Age",
    year: 2023,
    rating: 8.2,
    genre: "Period Drama",
    poster: posterPlaceholder("Gilded", 45),
    description: "Rival families clash in 1880s New York as old money confronts the rise of ambitious new industrialists.",
    type: "SERIES",
  },
  {
    id: "s3",
    title: "Orbital",
    year: 2024,
    rating: 9.1,
    genre: "Sci-Fi",
    poster: posterPlaceholder("Orbital", 250),
    description: "Life aboard humanity's first deep-space station tests the limits of science, politics, and human connection.",
    type: "SERIES",
  },
  {
    id: "s4",
    title: "Bloodline Oath",
    year: 2023,
    rating: 7.7,
    genre: "Crime",
    poster: posterPlaceholder("Blood", 350),
    description: "A prosecutor discovers her own family's ties to the criminal underworld she's sworn to dismantle.",
    type: "SERIES",
  },
  {
    id: "s5",
    title: "Meridian",
    year: 2024,
    rating: 8.5,
    genre: "Fantasy",
    poster: posterPlaceholder("Meridian", 160),
    description: "Parallel worlds begin to merge, and a group of unlikely heroes must restore the boundary before reality collapses.",
    type: "SERIES",
  },
  {
    id: "s6",
    title: "Code Zero",
    year: 2024,
    rating: 8.0,
    genre: "Tech Thriller",
    poster: posterPlaceholder("Code0", 190),
    description: "A whistleblower at a tech giant uncovers an AI that has been secretly manipulating global markets.",
    type: "SERIES",
  },
];

// ---------------------------------------------------------------------------
// ANIMES
// ---------------------------------------------------------------------------
export const animes: ContentItem[] = [
  {
    id: "a1",
    title: "Celestial Blade",
    year: 2024,
    rating: 9.2,
    genre: "Action / Fantasy",
    poster: posterPlaceholder("Celestial", 270),
    description: "A young swordsman inherits a divine weapon and must master its power to stop a demon king's return.",
    type: "ANIME",
  },
  {
    id: "a2",
    title: "Phantom Academy",
    year: 2023,
    rating: 8.0,
    genre: "Supernatural",
    poster: posterPlaceholder("Phantom", 310),
    description: "Students at an elite school discover their campus sits on a rift between the living world and the spirit realm.",
    type: "ANIME",
  },
  {
    id: "a3",
    title: "Drift Protocol",
    year: 2024,
    rating: 8.6,
    genre: "Mecha / Sci-Fi",
    poster: posterPlaceholder("Drift", 200),
    description: "Giant mechs piloted by neural-linked duos defend Earth's last cities against colossal alien creatures.",
    type: "ANIME",
  },
  {
    id: "a4",
    title: "Sakura Chronicles",
    year: 2023,
    rating: 8.9,
    genre: "Slice of Life",
    poster: posterPlaceholder("Sakura", 330),
    description: "A heartwarming tale of four friends navigating love, loss, and growing up in a small Japanese town.",
    type: "ANIME",
  },
  {
    id: "a5",
    title: "Void Runners",
    year: 2024,
    rating: 8.3,
    genre: "Cyberpunk",
    poster: posterPlaceholder("Void", 175),
    description: "Hackers in a neon-lit dystopia race to uncover the truth behind a mysterious signal from beyond the digital void.",
    type: "ANIME",
  },
  {
    id: "a6",
    title: "Kingdom of Ash",
    year: 2024,
    rating: 9.0,
    genre: "Dark Fantasy",
    poster: posterPlaceholder("KoAsh", 15),
    description: "In a war-torn empire, a disgraced knight seeks redemption by protecting the last heir to the fallen throne.",
    type: "ANIME",
  },
];

// ---------------------------------------------------------------------------
// BOOKS
// ---------------------------------------------------------------------------
export const books: ContentItem[] = [
  {
    id: "b1",
    title: "The Memory Architect",
    year: 2024,
    rating: 8.7,
    genre: "Literary Fiction",
    poster: posterPlaceholder("Memory", 230),
    description: "A neuroscientist who can reconstruct memories faces an ethical dilemma when asked to erase a traumatic past.",
    type: "BOOK",
  },
  {
    id: "b2",
    title: "Iron Horizon",
    year: 2023,
    rating: 8.1,
    genre: "Sci-Fi",
    poster: posterPlaceholder("Iron", 100),
    description: "Colonists on Mars discover ruins that predate human civilization, rewriting the history of the solar system.",
    type: "BOOK",
  },
  {
    id: "b3",
    title: "Whispers in the Dark",
    year: 2024,
    rating: 8.4,
    genre: "Horror",
    poster: posterPlaceholder("Whisper", 340),
    description: "A journalist investigating disappearances in a remote village uncovers a centuries-old supernatural pact.",
    type: "BOOK",
  },
  {
    id: "b4",
    title: "The Cartographer's Dream",
    year: 2023,
    rating: 9.0,
    genre: "Fantasy",
    poster: posterPlaceholder("Carto", 60),
    description: "A mapmaker discovers that the lands she draws come into existence, but each creation demands a sacrifice.",
    type: "BOOK",
  },
  {
    id: "b5",
    title: "Binary Stars",
    year: 2024,
    rating: 7.9,
    genre: "Romance / Sci-Fi",
    poster: posterPlaceholder("Binary", 290),
    description: "Two astronauts on a decades-long mission must reconcile their growing feelings with the mission's demands.",
    type: "BOOK",
  },
  {
    id: "b6",
    title: "The Glass Throne",
    year: 2024,
    rating: 8.6,
    genre: "Epic Fantasy",
    poster: posterPlaceholder("Glass", 120),
    description: "Five kingdoms vie for a legendary throne said to grant its ruler the power to reshape the world itself.",
    type: "BOOK",
  },
];

// ---------------------------------------------------------------------------
// COMBINED & HELPERS
// ---------------------------------------------------------------------------
export const allContent: ContentItem[] = [...movies, ...series, ...animes, ...books];

export const trendingContent: ContentItem[] = [
  movies[3], // Starborn
  animes[0], // Celestial Blade
  series[2], // Orbital
  books[3],  // The Cartographer's Dream
  movies[5], // Neon Nights
  animes[5], // Kingdom of Ash
  series[0], // Shadow Protocol
  books[0],  // The Memory Architect
];

export const categoryMeta = {
  MOVIE: {
    label: "Movies",
    slug: "movies",
    gradient: "from-blue-500 to-cyan-400",
    color: "#3b82f6",
    icon: "Film",
  },
  SERIES: {
    label: "Series",
    slug: "series",
    gradient: "from-purple-500 to-pink-400",
    color: "#a855f7",
    icon: "Tv",
  },
  ANIME: {
    label: "Animes",
    slug: "animes",
    gradient: "from-rose-500 to-orange-400",
    color: "#f43f5e",
    icon: "Sparkles",
  },
  BOOK: {
    label: "Books",
    slug: "books",
    gradient: "from-emerald-500 to-teal-400",
    color: "#10b981",
    icon: "BookOpen",
  },
} as const;
