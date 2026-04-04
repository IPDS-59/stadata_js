import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { InfographicRemoteDataSource } from '../features/infographic/data/datasources';
import { InfographicRepositoryImpl } from '../features/infographic/data/repositories';
import { Infographic } from '../features/infographic/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { InfographicListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseInfographics {
  fetchInfographicList: (
    params: InfographicListParams
  ) => Promise<Result<ListResult<Infographic>, ApiFailure>>;
}

export function useInfographics(client?: StadataClient): UseInfographics {
  const _client = client ?? getGlobalClient();
  const dataSource = new InfographicRemoteDataSource(_client.networkClient);
  const repository = new InfographicRepositoryImpl(dataSource);

  return {
    fetchInfographicList: (
      params: InfographicListParams
    ): Promise<Result<ListResult<Infographic>, ApiFailure>> => repository.getAll(params),
  };
}
