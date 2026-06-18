import type { ContentItem } from "./mockData";

const API_BASE = "http://localhost:4000/content";

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
