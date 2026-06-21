import { Controller, Get, Query } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('trending')
  async getTrending() {
    return this.contentService.getTrending();
  }

  @Get('movies')
  async getMovies() {
    return this.contentService.getMovies();
  }

  @Get('series')
  async getSeries() {
    return this.contentService.getSeries();
  }

  @Get('animes')
  async getAnimes() {
    return this.contentService.getAnimes();
  }

  @Get('books')
  async getBooks() {
    return this.contentService.getBooks();
  }

  @Get('search')
  async search(@Query('q') query: string, @Query('page') page?: string) {
    if (!query) return [];
    return this.contentService.search(query, page ? parseInt(page) : 1);
  }
}
