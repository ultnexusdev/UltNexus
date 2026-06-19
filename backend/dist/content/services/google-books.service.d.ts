import { HttpService } from '@nestjs/axios';
export declare class GoogleBooksService {
    private readonly httpService;
    private readonly logger;
    private readonly baseUrl;
    constructor(httpService: HttpService);
    getPopular(query?: string, maxResults?: number): Promise<any>;
}
