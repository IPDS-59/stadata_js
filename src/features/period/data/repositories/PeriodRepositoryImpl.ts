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
        const periods = response.data.map((item) => Period.fromJson(item));
        return ListResult.fromJson(
          {
            data: periods,
            pagination: response.pagination,
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
