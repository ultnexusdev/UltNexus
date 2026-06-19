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
var GoogleBooksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleBooksService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let GoogleBooksService = GoogleBooksService_1 = class GoogleBooksService {
    httpService;
    logger = new common_1.Logger(GoogleBooksService_1.name);
    baseUrl = 'https://www.googleapis.com/books/v1';
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getPopular(query = 'subject:fiction', maxResults = 20) {
        try {
            const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
            const keyParam = apiKey ? `&key=${apiKey}` : '';
            const url = `${this.baseUrl}/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&orderBy=relevance${keyParam}`;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url).pipe((0, rxjs_1.catchError)((error) => {
                this.logger.error(`Error fetching popular books: ${error.message}`);
                throw error;
            })));
            return data.items || [];
        }
        catch (e) {
            this.logger.error('Books API Failed', e);
            return [];
        }
    }
};
exports.GoogleBooksService = GoogleBooksService;
exports.GoogleBooksService = GoogleBooksService = GoogleBooksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], GoogleBooksService);
//# sourceMappingURL=google-books.service.js.map