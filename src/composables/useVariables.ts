import { StadataClient } from '../client';
import { VariableRemoteDataSource } from '../features/variable/data/datasources';
import { VariableRepositoryImpl } from '../features/variable/data/repositories';
import { Variable } from '../features/variable/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { VariableListParams, ViewParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseVariables {
  fetchVariableList: (
    params: VariableListParams
  ) => Promise<Result<ListResult<Variable>, ApiFailure>>;
  fetchVariableDetail: (params: ViewParams) => Promise<Result<Variable, ApiFailure>>;
}

export function useVariables(client: StadataClient): UseVariables {
  const dataSource = new VariableRemoteDataSource(client.networkClient);
  const repository = new VariableRepositoryImpl(dataSource);

  return {
    fetchVariableList: (
      params: VariableListParams
    ): Promise<Result<ListResult<Variable>, ApiFailure>> => repository.getAll(params),
    fetchVariableDetail: (params: ViewParams): Promise<Result<Variable, ApiFailure>> =>
      repository.getById(params),
  };
}
