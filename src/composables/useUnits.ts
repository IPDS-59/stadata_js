import { StadataClient } from '../client';
import { UnitRemoteDataSource } from '../features/unit/data/datasources';
import { UnitRepositoryImpl } from '../features/unit/data/repositories';
import { Unit } from '../features/unit/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { UnitListParams, ViewParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export function useUnits(client: StadataClient) {
  const dataSource = new UnitRemoteDataSource(client.networkClient);
  const repository = new UnitRepositoryImpl(dataSource);

  return {
    fetchUnitList: (params: UnitListParams): Promise<Result<ListResult<Unit>, ApiFailure>> =>
      repository.getAll(params),
    fetchUnitDetail: (params: ViewParams): Promise<Result<Unit, ApiFailure>> =>
      repository.getById(params),
  };
}
