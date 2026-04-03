import { StadataClient } from '../client';
import { InfographicRemoteDataSource } from '../features/infographic/data/datasources';
import { InfographicRepositoryImpl } from '../features/infographic/data/repositories';
import { Infographic } from '../features/infographic/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { InfographicListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export function useInfographics(client: StadataClient) {
  const dataSource = new InfographicRemoteDataSource(client.networkClient);
  const repository = new InfographicRepositoryImpl(dataSource);

  return {
    fetchInfographicList: (params: InfographicListParams): Promise<Result<ListResult<Infographic>, ApiFailure>> =>
      repository.getAll(params),
  };
}
