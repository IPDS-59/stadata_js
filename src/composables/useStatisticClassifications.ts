import { StadataClient } from '../client';
import { StatisticClassificationRemoteDataSource } from '../features/statistic-classification/data/datasources';
import { StatisticClassificationRepositoryImpl } from '../features/statistic-classification/data/repositories';
import { StatisticClassification } from '../features/statistic-classification/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { StatisticClassificationListParams, ViewParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseStatisticClassifications {
  fetchStatisticClassificationList: (params: StatisticClassificationListParams) => Promise<Result<ListResult<StatisticClassification>, ApiFailure>>;
  fetchStatisticClassificationDetail: (params: ViewParams) => Promise<Result<StatisticClassification, ApiFailure>>;
}

/**
 * Composable for BPS Statistic Classification API
 */
export function useStatisticClassifications(client: StadataClient): UseStatisticClassifications {
  const dataSource = new StatisticClassificationRemoteDataSource(client.networkClient);
  const repository = new StatisticClassificationRepositoryImpl(dataSource);

  return {
    fetchStatisticClassificationList: (params) => repository.getAll(params),
    fetchStatisticClassificationDetail: (params) => repository.getById(params),
  };
}
