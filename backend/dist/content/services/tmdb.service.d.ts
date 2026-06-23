import { HttpService } from '@nestjs/axios';
export declare class TmdbService {
    private readonly httpService;
    private readonly logger;
    private readonly baseUrl;
    private readonly headers;
    constructor(httpService: HttpService);
    getTrending(type?: 'movie' | 'tv', timeWindow?: 'day' | 'week'): Promise<any>;
    getPopular(type?: 'movie' | 'tv', page?: number): Promise<any>;
    getMovieDetails(id: number): Promise<any>;
    getPersonDetails(id: number): Promise<any>;
    getPersonMovieCredits(id: number): Promise<any>;
    searchMovies(query: string, page?: number): Promise<any>;
}
