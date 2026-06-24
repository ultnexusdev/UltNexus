import { Controller, Get, Param, Query, Post, Body, Req, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  @Get('movies/:id')
  async getMovie(@Param('id') id: string) {
    return this.contentService.getMovieById(id);
  }

  @Get('person/:id')
  async getPerson(@Param('id') id: string) {
    return this.contentService.getPersonById(id);
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

  @Get(':type/:id/stats')
  async getStats(@Param('type') type: string, @Param('id') id: string) {
    return this.contentService.getItemStats(id, type.toUpperCase());
  }

  @UseGuards(JwtAuthGuard)
  @Post('interact')
  async interact(@Req() req: any, @Body() body: { itemId: string, type: string, action: 'watch' | 'like' | 'rate', payload?: any }) {
    const userId = req.user.id;
    return this.contentService.interact(userId, body.itemId, body.type, body.action, body.payload);
  }
}
