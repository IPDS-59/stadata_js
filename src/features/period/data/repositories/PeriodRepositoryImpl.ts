import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { PeriodListParams, ViewParams } from '../../../../types';
import { Period } from '../../domain/entities';
import { PeriodRepository } from '../../domain/repositories';
import { PeriodRemoteDataSource } from '../datasources';

/**
 * Implementation of PeriodRepository
 */
export class PeriodRepositoryImpl implements PeriodRepository {
  constructor(private readonly remoteDataSource: PeriodRemoteDataSource) {}

  async getAll(params: PeriodListParams): Promise<Result<ListResult<Period>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0] as Record<string, unknown>;
        const periodsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !periodsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const periods = periodsData.map((item) => Period.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || periodsData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: periods,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
          },
          (json: Record<string, unknown>) => Period.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse period: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<Period, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Period not found');
        }
        const periodData = response.data[0];
        if (!periodData) {
          throw new ParseFailure('Period data is empty');
        }
        return Period.fromJson(periodData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse period data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
