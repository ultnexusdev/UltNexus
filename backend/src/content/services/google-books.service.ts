import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class GoogleBooksService {
  private readonly logger = new Logger(GoogleBooksService.name);
  private readonly baseUrl = 'https://www.googleapis.com/books/v1';

  constructor(private readonly httpService: HttpService) {}

  async getPopular(query = 'subject:fiction', maxResults = 20) {
    try {
      const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
      const keyParam = apiKey ? `&key=${apiKey}` : '';
      const url = `${this.baseUrl}/volumes?q=${encodeURIComponent(query)}&maxResults=${maxResults}&orderBy=relevance${keyParam}`;
      
      const { data } = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(`Error fetching popular books: ${error.message}`);
            throw error;
          }),
        ),
      );
      
      return data.items || [];
    } catch (e) {
      this.logger.error('Books API Failed', e);
      return [];
    }
  }
}
