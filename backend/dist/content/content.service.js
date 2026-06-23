"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
const tmdb_service_1 = require("./services/tmdb.service");
const anilist_service_1 = require("./services/anilist.service");
const google_books_service_1 = require("./services/google-books.service");
let ContentService = class ContentService {
    cacheManager;
    tmdbService;
    anilistService;
    googleBooksService;
    constructor(cacheManager, tmdbService, anilistService, googleBooksService) {
        this.cacheManager = cacheManager;
        this.tmdbService = tmdbService;
        this.anilistService = anilistService;
        this.googleBooksService = googleBooksService;
    }
    async getMovies() {
        const cacheKey = 'movies_popular';
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
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
        await this.cacheManager.set(cacheKey, mapped, 3600000);
        return mapped;
    }
    async getSeries() {
        const cacheKey = 'series_popular';
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
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
        if (cached)
            return cached;
        const data = await this.anilistService.getPopular(1, 20);
        const mapped = data.map((item) => ({
            id: `a_${item.id}`,
            title: item.title.english || item.title.romaji,
            year: item.seasonYear,
            rating: item.averageScore ? item.averageScore / 10 : 0,
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
        if (cached)
            return cached;
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
        if (cached)
            return cached;
        const [movies, series, animes, books] = await Promise.all([
            this.getMovies(),
            this.getSeries(),
            this.getAnimes(),
            this.getBooks(),
        ]);
        const mapped = [
            ...movies.slice(0, 2),
            ...series.slice(0, 2),
            ...animes.slice(0, 2),
            ...books.slice(0, 2),
        ];
        await this.cacheManager.set(cacheKey, mapped, 3600000);
        return mapped;
    }
    async getMovieById(id) {
        const cacheKey = `movie_detail_${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const numericId = id.startsWith('m_') ? parseInt(id.replace('m_', '')) : parseInt(id);
        if (isNaN(numericId))
            return null;
        const item = await this.tmdbService.getMovieDetails(numericId);
        if (!item)
            return null;
        const mapped = {
            id: `m_${item.id}`,
            title: item.title,
            year: item.release_date ? parseInt(item.release_date.split('-')[0]) : null,
            rating: item.vote_average,
            genre: item.genres?.map((g) => g.name).join(', ') || 'Movie',
            genres: item.genres?.map((g) => g.name) || [],
            poster: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : '',
            backdrop: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : '',
            description: item.overview,
            type: 'MOVIE',
            runtime: item.runtime,
            status: item.status,
            cast: item.credits?.cast?.slice(0, 15).map((c) => ({
                id: c.id,
                name: c.name,
                character: c.character,
                profile_path: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : null,
            })) || [],
            crew: item.credits?.crew?.filter((c) => ['Director', 'Writer', 'Screenplay', 'Producer'].includes(c.job)).map((c) => ({
                id: c.id,
                name: c.name,
                job: c.job,
                profile_path: c.profile_path ? `https://image.tmdb.org/t/p/w200${c.profile_path}` : null,
            })) || [],
            director: item.credits?.crew?.find((c) => c.job === 'Director')?.name || 'Unknown',
            directorId: item.credits?.crew?.find((c) => c.job === 'Director')?.id || null,
            studios: item.production_companies?.map((c) => c.name) || [],
            countries: item.production_countries?.map((c) => c.name) || [],
            languages: item.spoken_languages?.map((l) => l.english_name) || [],
            videos: item.videos?.results?.filter((v) => v.site === 'YouTube' && v.type === 'Trailer') || [],
            watchProviders: item['watch/providers']?.results?.US?.flatrate?.map((p) => ({
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
    async getPersonById(id) {
        const cacheKey = `person_detail_${id}`;
        const cached = await this.cacheManager.get(cacheKey);
        if (cached)
            return cached;
        const numericId = parseInt(id);
        if (isNaN(numericId))
            return null;
        const [details, credits] = await Promise.all([
            this.tmdbService.getPersonDetails(numericId),
            this.tmdbService.getPersonMovieCredits(numericId)
        ]);
        if (!details)
            return null;
        const mapped = {
            id: details.id.toString(),
            name: details.name,
            biography: details.biography,
            profile_path: details.profile_path ? `https://image.tmdb.org/t/p/w500${details.profile_path}` : '',
            known_for_department: details.known_for_department,
            movies: credits?.cast?.map((m) => ({
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
    async search(query, page = 1) {
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
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, tmdb_service_1.TmdbService,
        anilist_service_1.AnilistService,
        google_books_service_1.GoogleBooksService])
], ContentService);
//# sourceMappingURL=content.service.js.map