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
var TmdbService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TmdbService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let TmdbService = TmdbService_1 = class TmdbService {
    httpService;
    logger = new common_1.Logger(TmdbService_1.name);
    baseUrl = 'https://api.themoviedb.org/3';
    headers;
    constructor(httpService) {
        this.httpService = httpService;
        const token = process.env.TMDB_READ_ACCESS_TOKEN;
        if (!token) {
            this.logger.warn('TMDB_READ_ACCESS_TOKEN is not defined in environment variables.');
        }
        this.headers = {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
        };
    }
    async getTrending(type = 'movie', timeWindow = 'week') {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/trending/${type}/${timeWindow}?language=en-US`, {
                headers: this.headers,
            }).pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(`Error fetching trending ${type}: ${error.message}`);
                throw 'An error happened!';
            })));
            return data.results || [];
        }
        catch (e) {
            return [];
        }
    }
    async getPopular(type = 'movie', page = 1) {
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.baseUrl}/${type}/popular?language=en-US&page=${page}`, {
                headers: this.headers,
            }).pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(`Error fetching popular ${type}: ${error.message}`);
                throw 'An error happened!';
            })));
            return data.results || [];
        }
        catch (e) {
            return [];
        }
    }
};
exports.TmdbService = TmdbService;
exports.TmdbService = TmdbService = TmdbService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], TmdbService);
//# sourceMappingURL=tmdb.service.js.map