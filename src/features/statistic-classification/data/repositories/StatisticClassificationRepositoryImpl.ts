import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { StatisticClassificationListParams, ViewParams } from '../../../../types';
import { StatisticClassification } from '../../domain/entities';
import { StatisticClassificationRepository } from '../../domain/repositories';
import { StatisticClassificationRemoteDataSource } from '../datasources';

/**
 * Implementation of StatisticClassificationRepository
 */
export class StatisticClassificationRepositoryImpl implements StatisticClassificationRepository {
  constructor(private readonly remoteDataSource: StatisticClassificationRemoteDataSource) {}

  async getAll(
    params?: StatisticClassificationListParams
  ): Promise<Result<ListResult<StatisticClassification>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0] as Record<string, unknown>;
        const statisticClassificationsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !statisticClassificationsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const statisticClassifications = statisticClassificationsData.map((item) =>
          StatisticClassification.fromJson(item)
        );

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || statisticClassificationsData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: statisticClassifications,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
          },
          (json: Record<string, unknown>) => StatisticClassification.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse statistic classification: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<StatisticClassification, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Statistic classification not found');
        }
        const statisticClassificationData = response.data[0];
        if (!statisticClassificationData) {
          throw new ParseFailure('Statistic classification data is empty');
        }
        return StatisticClassification.fromJson(statisticClassificationData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse statistic classification data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
