import { StadataClient } from '../client';
import { VerticalVariableRemoteDataSource } from '../features/vertical-variable/data/datasources';
import { VerticalVariableRepositoryImpl } from '../features/vertical-variable/data/repositories';
import { VerticalVariable } from '../features/vertical-variable/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { VerticalVariableListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export function useVerticalVariables(client: StadataClient) {
  const dataSource = new VerticalVariableRemoteDataSource(client.networkClient);
  const repository = new VerticalVariableRepositoryImpl(dataSource);

  return {
    fetchVerticalVariableList: (params: VerticalVariableListParams): Promise<Result<ListResult<VerticalVariable>, ApiFailure>> =>
      repository.getAll(params),
  };
}
