import type { Cache } from 'cache-manager';
import { TmdbService } from './services/tmdb.service';
import { AnilistService } from './services/anilist.service';
import { GoogleBooksService } from './services/google-books.service';
export declare class ContentService {
    private cacheManager;
    private readonly tmdbService;
    private readonly anilistService;
    private readonly googleBooksService;
    constructor(cacheManager: Cache, tmdbService: TmdbService, anilistService: AnilistService, googleBooksService: GoogleBooksService);
    getMovies(): Promise<any>;
    getSeries(): Promise<any>;
    getAnimes(): Promise<any>;
    getBooks(): Promise<any>;
    getTrending(): Promise<{}>;
    getMovieById(id: string): Promise<{} | null>;
    getPersonById(id: string): Promise<{} | null>;
    search(query: string, page?: number): Promise<any>;
}
