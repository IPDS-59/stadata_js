import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { SubjectCategoryListParams, ViewParams } from '../../../../types';
import { SubjectCategory } from '../../domain/entities';
import { SubjectCategoryRepository } from '../../domain/repositories';
import { SubjectCategoryRemoteDataSource } from '../datasources';

/**
 * Implementation of SubjectCategoryRepository
 */
export class SubjectCategoryRepositoryImpl implements SubjectCategoryRepository {
  constructor(private readonly remoteDataSource: SubjectCategoryRemoteDataSource) {}

  async getAll(
    params?: SubjectCategoryListParams
  ): Promise<Result<ListResult<SubjectCategory>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        const categories = response.data.map((item) => SubjectCategory.fromJson(item));
        return ListResult.fromJson(
          {
            data: categories,
            pagination: response.pagination,
          },
          (json: Record<string, unknown>) => SubjectCategory.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse subject category: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<SubjectCategory, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Subject category not found');
        }
        const categoryData = response.data[0];
        if (!categoryData) {
          throw new ParseFailure('Subject category data is empty');
        }
        return SubjectCategory.fromJson(categoryData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse subject category data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
