import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { DerivedVariableRemoteDataSource } from '../features/derived-variable/data/datasources';
import { DerivedVariableRepositoryImpl } from '../features/derived-variable/data/repositories';
import { DerivedVariable } from '../features/derived-variable/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { DerivedVariableListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseDerivedVariables {
  fetchDerivedVariableList: (
    params: DerivedVariableListParams
  ) => Promise<Result<ListResult<DerivedVariable>, ApiFailure>>;
}

export function useDerivedVariables(client?: StadataClient): UseDerivedVariables {
  const _client = client ?? getGlobalClient();
  const dataSource = new DerivedVariableRemoteDataSource(_client.networkClient);
  const repository = new DerivedVariableRepositoryImpl(dataSource);

  return {
    fetchDerivedVariableList: (
      params: DerivedVariableListParams
    ): Promise<Result<ListResult<DerivedVariable>, ApiFailure>> => repository.getAll(params),
  };
}
