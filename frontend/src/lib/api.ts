import type { ContentItem } from "./mockData";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/content";

export interface MovieDetail extends ContentItem {
  backdrop: string;
  runtime: number;
  status: string;
  genres: string[];
  cast: { id: number; name: string; character: string; profile_path: string | null }[];
  crew: { id: number; name: string; job: string; profile_path: string | null }[];
  director: string;
  directorId: number | null;
  studios: string[];
  countries: string[];
  languages: string[];
  videos: { key: string; name: string; site: string; type: string }[];
  watchProviders: { provider_id: number; provider_name: string; logo_path: string }[];
  stats: { views: number; likes: number; rank: number };
}

export interface PersonDetail {
  id: string;
  name: string;
  biography: string;
  profile_path: string;
  known_for_department: string;
  movies: ContentItem[];
}

export async function fetchTrending(): Promise<ContentItem[]> {
  try {
    const res = await fetch(`${API_BASE}/trending`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch trending");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchMovies(): Promise<ContentItem[]> {
  try {
    const res = await fetch(`${API_BASE}/movies`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch movies");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchMovieById(id: string): Promise<MovieDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/movies/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch movie details");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchPersonById(id: string): Promise<PersonDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/person/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error("Failed to fetch person details");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchSeries(): Promise<ContentItem[]> {
  try {
    const res = await fetch(`${API_BASE}/series`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch series");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchAnimes(): Promise<ContentItem[]> {
  try {
    const res = await fetch(`${API_BASE}/animes`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch animes");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchBooks(): Promise<ContentItem[]> {
  try {
    const res = await fetch(`${API_BASE}/books`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch books");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function searchContent(query: string, page = 1): Promise<ContentItem[]> {
  if (!query) return [];
  try {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(query)}&page=${page}`);
    if (!res.ok) throw new Error("Failed to search");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
