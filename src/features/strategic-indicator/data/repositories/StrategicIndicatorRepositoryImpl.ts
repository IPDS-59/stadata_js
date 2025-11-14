import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { StrategicIndicatorListParams, ViewParams } from '../../../../types';
import { StrategicIndicator } from '../../domain/entities';
import { StrategicIndicatorRepository } from '../../domain/repositories';
import { StrategicIndicatorRemoteDataSource } from '../datasources';

/**
 * Implementation of StrategicIndicatorRepository
 */
export class StrategicIndicatorRepositoryImpl implements StrategicIndicatorRepository {
  constructor(private readonly remoteDataSource: StrategicIndicatorRemoteDataSource) {}

  async getAll(
    params?: StrategicIndicatorListParams
  ): Promise<Result<ListResult<StrategicIndicator>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0];
        const indicatorsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !indicatorsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const indicators = indicatorsData.map((item) => StrategicIndicator.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || indicatorsData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: indicators,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
          },
          (json: Record<string, unknown>) => StrategicIndicator.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse strategic indicator: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<StrategicIndicator, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Strategic indicator not found');
        }
        const indicatorData = response.data[0];
        if (!indicatorData) {
          throw new ParseFailure('Strategic indicator data is empty');
        }
        return StrategicIndicator.fromJson(indicatorData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse strategic indicator data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
