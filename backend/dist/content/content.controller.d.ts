import { ContentService } from './content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    getTrending(): Promise<{}>;
    getMovies(): Promise<any>;
    getSeries(): Promise<any>;
    getAnimes(): Promise<any>;
    getBooks(): Promise<any>;
}
