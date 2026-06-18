import { Injectable, Logger } from '@nestjs/common';
import { GraphQLClient } from 'graphql-request';

@Injectable()
export class AnilistService {
  private readonly logger = new Logger(AnilistService.name);
  private readonly client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient('https://graphql.anilist.co');
  }

  async getTrending(page = 1, perPage = 10) {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
          media (sort: TRENDING_DESC, type: ANIME, isAdult: false) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description(asHtml: false)
            averageScore
            seasonYear
            genres
          }
        }
      }
    `;

    try {
      const data: any = await this.client.request(query, { page, perPage });
      return data?.Page?.media || [];
    } catch (error) {
      this.logger.error(`Error fetching trending anime: ${error.message}`);
      return [];
    }
  }

  async getPopular(page = 1, perPage = 10) {
    const query = `
      query ($page: Int, $perPage: Int) {
        Page (page: $page, perPage: $perPage) {
          media (sort: POPULARITY_DESC, type: ANIME, isAdult: false) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description(asHtml: false)
            averageScore
            seasonYear
            genres
          }
        }
      }
    `;

    try {
      const data: any = await this.client.request(query, { page, perPage });
      return data?.Page?.media || [];
    } catch (error) {
      this.logger.error(`Error fetching popular anime: ${error.message}`);
      return [];
    }
  }
}
