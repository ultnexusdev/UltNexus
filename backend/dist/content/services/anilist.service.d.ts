export declare class AnilistService {
    private readonly logger;
    private readonly client;
    constructor();
    getTrending(page?: number, perPage?: number): Promise<any>;
    getPopular(page?: number, perPage?: number): Promise<any>;
}
