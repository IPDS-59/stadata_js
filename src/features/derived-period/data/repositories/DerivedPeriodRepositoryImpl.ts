import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { DerivedPeriodListParams, ViewParams } from '../../../../types';
import { DerivedPeriod } from '../../domain/entities';
import { DerivedPeriodRepository } from '../../domain/repositories';
import { DerivedPeriodRemoteDataSource } from '../datasources';

/**
 * Implementation of DerivedPeriodRepository
 */
export class DerivedPeriodRepositoryImpl implements DerivedPeriodRepository {
  constructor(private readonly remoteDataSource: DerivedPeriodRemoteDataSource) {}

  async getAll(
    params: DerivedPeriodListParams
  ): Promise<Result<ListResult<DerivedPeriod>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        const derivedPeriods = response.data.map((item) => DerivedPeriod.fromJson(item));
        return ListResult.fromJson(
          {
            data: derivedPeriods,
            pagination: response.pagination,
          },
          (json: Record<string, unknown>) => DerivedPeriod.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse derived period: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<DerivedPeriod, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Derived period not found');
        }
        const derivedPeriodData = response.data[0];
        if (!derivedPeriodData) {
          throw new ParseFailure('Derived period data is empty');
        }
        return DerivedPeriod.fromJson(derivedPeriodData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse derived period data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
