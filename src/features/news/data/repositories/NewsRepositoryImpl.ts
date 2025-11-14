import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { News } from '../../domain/entities';
import { NewsRepository } from '../../domain/repositories/NewsRepository';
import { NewsRemoteDataSource } from '../datasources/NewsRemoteDataSource';
import { ListResult } from '../../../../shared/domain/entities';
import { NewsListParams, ViewParams } from '../../../../types';

/**
 * Implementation of news repository
 */
export class NewsRepositoryImpl implements NewsRepository {
  constructor(private readonly remoteDataSource: NewsRemoteDataSource) {}

  async getAll(params: NewsListParams): Promise<Result<ListResult<News>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0];
        const newsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !newsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const newsList = newsData.map((item) => News.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || newsData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: newsList,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
          },
          (json: Record<string, unknown>) => News.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse news: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<News, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('News not found');
        }
        const newsData = response.data[0];
        if (!newsData) {
          throw new ParseFailure('News data is empty');
        }
        return News.fromJson(newsData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse news data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
