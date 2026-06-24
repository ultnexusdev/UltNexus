import { ContentService } from './content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    getTrending(): Promise<{}>;
    getMovies(): Promise<any>;
    getMovie(id: string): Promise<{} | null>;
    getPerson(id: string): Promise<{} | null>;
    getSeries(): Promise<any>;
    getAnimes(): Promise<any>;
    getBooks(): Promise<any>;
    search(query: string, page?: string): Promise<any>;
    getStats(type: string, id: string): Promise<{
        watched: number;
        likes: number;
        averageRating: number;
    }>;
    interact(req: any, body: {
        itemId: string;
        type: string;
        action: 'watch' | 'like' | 'rate';
        payload?: any;
    }): Promise<{
        status: string;
        isLiked: boolean;
        rating: number | null;
    }>;
}
