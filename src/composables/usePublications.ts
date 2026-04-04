import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { PublicationRemoteDataSource } from '../features/publication/data/datasources';
import { PublicationRepositoryImpl } from '../features/publication/data/repositories';
import { Publication } from '../features/publication/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { PublicationListParams, ViewParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UsePublications {
  fetchPublicationList: (
    params: PublicationListParams
  ) => Promise<Result<ListResult<Publication>, ApiFailure>>;
  fetchPublicationDetail: (params: ViewParams) => Promise<Result<Publication, ApiFailure>>;
}

export function usePublications(client?: StadataClient): UsePublications {
  const _client = client ?? getGlobalClient();
  const dataSource = new PublicationRemoteDataSource(_client.networkClient);
  const repository = new PublicationRepositoryImpl(dataSource);

  return {
    fetchPublicationList: (
      params: PublicationListParams
    ): Promise<Result<ListResult<Publication>, ApiFailure>> => repository.getAll(params),
    fetchPublicationDetail: (params: ViewParams): Promise<Result<Publication, ApiFailure>> =>
      repository.getById(params),
  };
}
