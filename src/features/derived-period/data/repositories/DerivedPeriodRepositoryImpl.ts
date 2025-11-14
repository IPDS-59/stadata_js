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
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0] as Record<string, unknown>;
        const derivedPeriodsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !derivedPeriodsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const derivedPeriods = derivedPeriodsData.map((item) => DerivedPeriod.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || derivedPeriodsData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: derivedPeriods,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
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
