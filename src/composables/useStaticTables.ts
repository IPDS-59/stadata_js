import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { StaticTableRemoteDataSource } from '../features/static-table/data/datasources';
import { StaticTableRepositoryImpl } from '../features/static-table/data/repositories';
import { StaticTable } from '../features/static-table/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { StaticTableListParams, ViewParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseStaticTables {
  fetchStaticTableList: (
    params: StaticTableListParams
  ) => Promise<Result<ListResult<StaticTable>, ApiFailure>>;
  fetchStaticTableDetail: (params: ViewParams) => Promise<Result<StaticTable, ApiFailure>>;
}

export function useStaticTables(client?: StadataClient): UseStaticTables {
  const _client = client ?? getGlobalClient();
  const dataSource = new StaticTableRemoteDataSource(_client.networkClient);
  const repository = new StaticTableRepositoryImpl(dataSource);

  return {
    fetchStaticTableList: (
      params: StaticTableListParams
    ): Promise<Result<ListResult<StaticTable>, ApiFailure>> => repository.getAll(params),
    fetchStaticTableDetail: (params: ViewParams): Promise<Result<StaticTable, ApiFailure>> =>
      repository.getById(params),
  };
}
