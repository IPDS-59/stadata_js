import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { NewsCategoryListParams, ViewParams } from '../../../../types';
import { NewsCategory } from '../../domain/entities';
import { NewsCategoryRepository } from '../../domain/repositories';
import { NewsCategoryRemoteDataSource } from '../datasources';

/**
 * Implementation of NewsCategoryRepository
 */
export class NewsCategoryRepositoryImpl implements NewsCategoryRepository {
  constructor(private readonly remoteDataSource: NewsCategoryRemoteDataSource) {}

  async getAll(
    params?: NewsCategoryListParams
  ): Promise<Result<ListResult<NewsCategory>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        const categories = response.data.map((item) => NewsCategory.fromJson(item));
        return ListResult.fromJson(
          {
            data: categories,
            pagination: response.pagination,
          },
          (json: Record<string, unknown>) => NewsCategory.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse news category: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<NewsCategory, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('News category not found');
        }
        const categoryData = response.data[0];
        if (!categoryData) {
          throw new ParseFailure('News category data is empty');
        }
        return NewsCategory.fromJson(categoryData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse news category data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
