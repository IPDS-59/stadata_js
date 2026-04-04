import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { PeriodRemoteDataSource } from '../features/period/data/datasources';
import { PeriodRepositoryImpl } from '../features/period/data/repositories';
import { Period } from '../features/period/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { PeriodListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UsePeriods {
  fetchPeriodList: (params: PeriodListParams) => Promise<Result<ListResult<Period>, ApiFailure>>;
}

export function usePeriods(client?: StadataClient): UsePeriods {
  const _client = client ?? getGlobalClient();
  const dataSource = new PeriodRemoteDataSource(_client.networkClient);
  const repository = new PeriodRepositoryImpl(dataSource);

  return {
    fetchPeriodList: (params: PeriodListParams): Promise<Result<ListResult<Period>, ApiFailure>> =>
      repository.getAll(params),
  };
}
