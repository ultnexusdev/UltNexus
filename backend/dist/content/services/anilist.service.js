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
var AnilistService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnilistService = void 0;
const common_1 = require("@nestjs/common");
const graphql_request_1 = require("graphql-request");
let AnilistService = AnilistService_1 = class AnilistService {
    logger = new common_1.Logger(AnilistService_1.name);
    client;
    constructor() {
        this.client = new graphql_request_1.GraphQLClient('https://graphql.anilist.co');
    }
    async getTrending(page = 1, perPage = 10) {
        const query = `
      query ($page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
          media (sort: TRENDING_DESC, type: ANIME, isAdult: false) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description(asHtml: false)
            averageScore
            seasonYear
            genres
          }
        }
      }
    `;
        try {
            const data = await this.client.request(query, { page, perPage });
            return data?.Page?.media || [];
        }
        catch (error) {
            this.logger.error(`Error fetching trending anime: ${error.message}`);
            return [];
        }
    }
    async getPopular(page = 1, perPage = 10) {
        const query = `
      query ($page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
          media (sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description(asHtml: false)
            averageScore
            seasonYear
            genres
          }
        }
      }
    `;
        try {
            const data = await this.client.request(query, { page, perPage });
            return data?.Page?.media || [];
        }
        catch (error) {
            this.logger.error(`Error fetching popular anime: ${error.message}`);
            return [];
        }
    }
};
exports.AnilistService = AnilistService;
exports.AnilistService = AnilistService = AnilistService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AnilistService);
//# sourceMappingURL=anilist.service.js.map