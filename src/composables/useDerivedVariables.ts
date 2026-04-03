import { StadataClient } from '../client';
import { DerivedVariableRemoteDataSource } from '../features/derived-variable/data/datasources';
import { DerivedVariableRepositoryImpl } from '../features/derived-variable/data/repositories';
import { DerivedVariable } from '../features/derived-variable/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { DerivedVariableListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export function useDerivedVariables(client: StadataClient) {
  const dataSource = new DerivedVariableRemoteDataSource(client.networkClient);
  const repository = new DerivedVariableRepositoryImpl(dataSource);

  return {
    fetchDerivedVariableList: (params: DerivedVariableListParams): Promise<Result<ListResult<DerivedVariable>, ApiFailure>> =>
      repository.getAll(params),
  };
}
