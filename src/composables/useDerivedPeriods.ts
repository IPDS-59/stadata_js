import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { DerivedPeriodRemoteDataSource } from '../features/derived-period/data/datasources';
import { DerivedPeriodRepositoryImpl } from '../features/derived-period/data/repositories';
import { DerivedPeriod } from '../features/derived-period/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { DerivedPeriodListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseDerivedPeriods {
  fetchDerivedPeriodList: (
    params: DerivedPeriodListParams
  ) => Promise<Result<ListResult<DerivedPeriod>, ApiFailure>>;
}

export function useDerivedPeriods(client?: StadataClient): UseDerivedPeriods {
  const _client = client ?? getGlobalClient();
  const dataSource = new DerivedPeriodRemoteDataSource(_client.networkClient);
  const repository = new DerivedPeriodRepositoryImpl(dataSource);

  return {
    fetchDerivedPeriodList: (
      params: DerivedPeriodListParams
    ): Promise<Result<ListResult<DerivedPeriod>, ApiFailure>> => repository.getAll(params),
  };
}
