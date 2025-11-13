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
        const indicators = response.data.map((item) => StrategicIndicator.fromJson(item));
        return ListResult.fromJson(
          {
            data: indicators,
            pagination: response.pagination,
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
