import type { Cache } from 'cache-manager';
import { TmdbService } from './services/tmdb.service';
import { AnilistService } from './services/anilist.service';
import { GoogleBooksService } from './services/google-books.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class ContentService {
    private cacheManager;
    private readonly tmdbService;
    private readonly anilistService;
    private readonly googleBooksService;
    private readonly prisma;
    constructor(cacheManager: Cache, tmdbService: TmdbService, anilistService: AnilistService, googleBooksService: GoogleBooksService, prisma: PrismaService);
    interact(userId: string, itemId: string, type: string, action: 'watch' | 'like' | 'rate', payload?: any): Promise<{
        status: string;
        isLiked: boolean;
        rating: number | null;
    }>;
    getItemStats(itemId: string, type: string): Promise<{
        watched: number;
        likes: number;
        averageRating: number;
    }>;
    getMovies(): Promise<any>;
    getSeries(): Promise<any>;
    getAnimes(): Promise<any>;
    getBooks(): Promise<any>;
    getTrending(): Promise<{}>;
    getMovieById(id: string): Promise<{} | null>;
    getPersonById(id: string): Promise<{} | null>;
    search(query: string, page?: number): Promise<any>;
}
