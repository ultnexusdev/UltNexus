import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class TmdbService {
  private readonly logger = new Logger(TmdbService.name);
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly headers: Record<string, string>;

  constructor(private readonly httpService: HttpService) {
    const token = process.env.TMDB_READ_ACCESS_TOKEN;
    if (!token) {
      this.logger.warn('TMDB_READ_ACCESS_TOKEN is not defined in environment variables.');
    }
    this.headers = {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
    };
  }

  async getTrending(type: 'movie' | 'tv' = 'movie', timeWindow: 'day' | 'week' = 'week') {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/trending/${type}/${timeWindow}?language=en-US`, {
          headers: this.headers,
        }).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(`Error fetching trending ${type}: ${error.message}`);
            throw 'An error happened!';
          }),
        ),
      );
      return data.results || [];
    } catch (e) {
      return [];
    }
  }

  async getPopular(type: 'movie' | 'tv' = 'movie', page = 1) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/${type}/popular?language=en-US&page=${page}`, {
          headers: this.headers,
        }).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(`Error fetching popular ${type}: ${error.message}`);
            throw 'An error happened!';
          }),
        ),
      );
      return data.results || [];
    } catch (e) {
      return [];
    }
  }
}
