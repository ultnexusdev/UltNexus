import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { TmdbService } from './services/tmdb.service';
import { AnilistService } from './services/anilist.service';
import { GoogleBooksService } from './services/google-books.service';

@Injectable()
export class ContentService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly tmdbService: TmdbService,
    private readonly anilistService: AnilistService,
    private readonly googleBooksService: GoogleBooksService,
  ) {}

  async getMovies() {
    const cacheKey = 'movies_popular';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const data = await this.tmdbService.getPopular('movie');
    const mapped = data.map((item) => ({
      id: `m_${item.id}`,
      title: item.title,
      year: item.release_date ? parseInt(item.release_date.split('-')[0]) : null,
      rating: item.vote_average,
      genre: 'Movie',
      poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
      description: item.overview,
      type: 'MOVIE',
    }));

    await this.cacheManager.set(cacheKey, mapped, 3600000); // 1 hour
    return mapped;
  }

  async getSeries() {
    const cacheKey = 'series_popular';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const data = await this.tmdbService.getPopular('tv');
    const mapped = data.map((item) => ({
      id: `s_${item.id}`,
      title: item.name,
      year: item.first_air_date ? parseInt(item.first_air_date.split('-')[0]) : null,
      rating: item.vote_average,
      genre: 'Series',
      poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
      description: item.overview,
      type: 'SERIES',
    }));

    await this.cacheManager.set(cacheKey, mapped, 3600000);
    return mapped;
  }

  async getAnimes() {
    const cacheKey = 'animes_popular';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const data = await this.anilistService.getPopular(1, 20);
    const mapped = data.map((item) => ({
      id: `a_${item.id}`,
      title: item.title.english || item.title.romaji,
      year: item.seasonYear,
      rating: item.averageScore ? item.averageScore / 10 : 0, // Convert 0-100 to 0-10
      genre: item.genres?.[0] || 'Anime',
      poster: item.coverImage?.large || '',
      description: item.description,
      type: 'ANIME',
    }));

    await this.cacheManager.set(cacheKey, mapped, 3600000);
    return mapped;
  }

  async getBooks() {
    const cacheKey = 'books_popular';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const data = await this.googleBooksService.getPopular('subject:fiction', 20);
    const mapped = data.map((item) => {
      const vol = item.volumeInfo;
      return {
        id: `b_${item.id}`,
        title: vol.title,
        year: vol.publishedDate ? parseInt(vol.publishedDate.split('-')[0]) : null,
        rating: vol.averageRating || 0,
        genre: vol.categories?.[0] || 'Book',
        poster: vol.imageLinks?.thumbnail?.replace('http:', 'https:') || '',
        description: vol.description || '',
        type: 'BOOK',
      };
    });

    if (mapped.length > 0) {
      await this.cacheManager.set(cacheKey, mapped, 3600000);
    }
    return mapped;
  }

  async getTrending() {
    const cacheKey = 'trending_all';
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    // Fetch popular from all and mix them
    const [movies, series, animes, books] = await Promise.all([
      this.getMovies(),
      this.getSeries(),
      this.getAnimes(),
      this.getBooks(),
    ]);

    // Simple mix of top 2 from each category
    const mapped = [
      ...movies.slice(0, 2),
      ...series.slice(0, 2),
      ...animes.slice(0, 2),
      ...books.slice(0, 2),
    ];

    await this.cacheManager.set(cacheKey, mapped, 3600000);
    return mapped;
  }

  async getMovieById(id: string) {
    const cacheKey = `movie_detail_${id}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const numericId = id.startsWith('m_') ? parseInt(id.replace('m_', '')) : parseInt(id);
    if (isNaN(numericId)) return null;

    const item = await this.tmdbService.getMovieDetails(numericId);
    if (!item) return null;

    const mapped = {
      id: `m_${item.id}`,
      title: item.title,
      year: item.release_date ? parseInt(item.release_date.split('-')[0]) : null,
      rating: item.vote_average,
      genre: item.genres?.map((g: any) => g.name).join(', ') || 'Movie',
      genres: item.genres?.map((g: any) => g.name) || [],
      poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
      backdrop: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : '',
      description: item.overview,
      type: 'MOVIE',
      runtime: item.runtime,
      status: item.status,
      cast: item.credits?.cast?.slice(0, 15).map((c: any) => ({
        id: c.id,
        name: c.name,
        character: c.character,
        profile_path: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : null,
      })) || [],
      crew: item.credits?.crew?.filter((c: any) => ['Director', 'Writer', 'Screenplay', 'Producer'].includes(c.job)).map((c: any) => ({
        id: c.id,
        name: c.name,
        job: c.job,
        profile_path: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : null,
      })) || [],
      director: item.credits?.crew?.find((c: any) => c.job === 'Director')?.name || 'Unknown',
      directorId: item.credits?.crew?.find((c: any) => c.job === 'Director')?.id || null,
      studios: item.production_companies?.map((c: any) => c.name) || [],
      countries: item.production_countries?.map((c: any) => c.name) || [],
      languages: item.spoken_languages?.map((l: any) => l.english_name) || [],
      videos: item.videos?.results?.filter((v: any) => v.site === 'YouTube' && v.type === 'Trailer') || [],
      watchProviders: item['watch/providers']?.results?.US?.flatrate?.map((p: any) => ({
        provider_id: p.provider_id,
        provider_name: p.provider_name,
        logo_path: `https://image.tmdb.org/t/p/w200${p.logo_path}`,
      })) || [],
      stats: {
        views: Math.floor(item.popularity * 1000),
        likes: item.vote_count,
        rank: Math.floor(10000 / (item.vote_average + 0.1)),
      }
    };

    await this.cacheManager.set(cacheKey, mapped, 3600000);
    return mapped;
  }

  async getPersonById(id: string) {
    const cacheKey = `person_detail_${id}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const numericId = parseInt(id);
    if (isNaN(numericId)) return null;

    const [details, credits] = await Promise.all([
      this.tmdbService.getPersonDetails(numericId),
      this.tmdbService.getPersonMovieCredits(numericId)
    ]);

    if (!details) return null;

    const mapped = {
      id: details.id.toString(),
      name: details.name,
      biography: details.biography,
      profile_path: details.profile_path ? `https://image.tmdb.org/t/p/w500${details.profile_path}` : '',
      known_for_department: details.known_for_department,
      movies: credits?.cast?.map((m: any) => ({
        id: `m_${m.id}`,
        title: m.title,
        year: m.release_date ? parseInt(m.release_date.split('-')[0]) : null,
        rating: m.vote_average,
        genre: 'Movie',
        poster: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '',
        description: m.overview,
        type: 'MOVIE',
      })) || []
    };

    await this.cacheManager.set(cacheKey, mapped, 3600000);
    return mapped;
  }

  async search(query: string, page = 1) {
    const data = await this.tmdbService.searchMovies(query, page);
    const mapped = data.map((item) => ({
      id: `m_${item.id}`,
      title: item.title,
      year: item.release_date ? parseInt(item.release_date.split('-')[0]) : null,
      rating: item.vote_average,
      genre: 'Movie',
      poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
      description: item.overview,
      type: 'MOVIE',
    }));

    return mapped;
  }
}
