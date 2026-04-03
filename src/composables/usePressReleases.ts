import { StadataClient } from '../client';
import { PressReleaseRemoteDataSource } from '../features/press-release/data/datasources';
import { PressReleaseRepositoryImpl } from '../features/press-release/data/repositories';
import { PressRelease } from '../features/press-release/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { PressReleaseListParams, ViewParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export function usePressReleases(client: StadataClient) {
  const dataSource = new PressReleaseRemoteDataSource(client.networkClient);
  const repository = new PressReleaseRepositoryImpl(dataSource);

  return {
    fetchPressReleaseList: (params: PressReleaseListParams): Promise<Result<ListResult<PressRelease>, ApiFailure>> =>
      repository.getAll(params),
    fetchPressReleaseDetail: (params: ViewParams): Promise<Result<PressRelease, ApiFailure>> =>
      repository.getById(params),
  };
}
