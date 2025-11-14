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
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0] as Record<string, unknown>;
        const categoriesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !categoriesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const categories = categoriesData.map((item) => SubjectCategory.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || categoriesData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: categories,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
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
