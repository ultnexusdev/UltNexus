import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { TmdbService } from './services/tmdb.service';
import { AnilistService } from './services/anilist.service';
import { GoogleBooksService } from './services/google-books.service';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [ContentController],
  providers: [
    ContentService,
    TmdbService,
    AnilistService,
    GoogleBooksService,
  ],
  exports: [ContentService],
})
export class ContentModule {}
