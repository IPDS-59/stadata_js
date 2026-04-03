import { StadataClient } from '../client';
import { StrategicIndicatorRemoteDataSource } from '../features/strategic-indicator/data/datasources';
import { StrategicIndicatorRepositoryImpl } from '../features/strategic-indicator/data/repositories';
import { StrategicIndicator } from '../features/strategic-indicator/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { StrategicIndicatorListParams, ViewParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export function useStrategicIndicators(client: StadataClient) {
  const dataSource = new StrategicIndicatorRemoteDataSource(client.networkClient);
  const repository = new StrategicIndicatorRepositoryImpl(dataSource);

  return {
    fetchStrategicIndicatorList: (params: StrategicIndicatorListParams): Promise<Result<ListResult<StrategicIndicator>, ApiFailure>> =>
      repository.getAll(params),
    fetchStrategicIndicatorDetail: (params: ViewParams): Promise<Result<StrategicIndicator, ApiFailure>> =>
      repository.getById(params),
  };
}
