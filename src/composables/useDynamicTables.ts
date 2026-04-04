import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { DynamicTableRemoteDataSource } from '../features/dynamic-table/data/datasources';
import { DynamicTableRepositoryImpl } from '../features/dynamic-table/data/repositories';
import { DynamicTable } from '../features/dynamic-table/domain/entities';
import { DynamicTableParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseDynamicTables {
  fetchDynamicTableList: (params: DynamicTableParams) => Promise<Result<DynamicTable, ApiFailure>>;
}

/**
 * Composable for BPS Dynamic Table API
 */
export function useDynamicTables(client?: StadataClient): UseDynamicTables {
  const _client = client ?? getGlobalClient();
  const dataSource = new DynamicTableRemoteDataSource(_client.networkClient);
  const repository = new DynamicTableRepositoryImpl(dataSource);

  return {
    fetchDynamicTableList: (params) => repository.getAll(params),
  };
}
