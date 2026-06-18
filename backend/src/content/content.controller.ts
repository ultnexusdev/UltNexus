import { Controller, Get } from '@nestjs/common';
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
}
