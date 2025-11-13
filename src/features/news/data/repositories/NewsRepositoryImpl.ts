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
        const newsList = response.data.map((item) => News.fromJson(item));
        return ListResult.fromJson(
          {
            data: newsList,
            pagination: response.pagination,
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
