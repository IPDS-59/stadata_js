import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared';
import { DynamicTableParams } from '../../../../types';
import { DynamicTable } from '../../domain/entities';
import { DynamicTableRepository } from '../../domain/repositories';
import { DynamicTableRemoteDataSource } from '../datasources';

/**
 * Implementation of DynamicTableRepository
 */
export class DynamicTableRepositoryImpl implements DynamicTableRepository {
  constructor(private remoteDataSource: DynamicTableRemoteDataSource) {}

  /**
   * Gets all dynamic tables
   * @param params - Dynamic table parameters
   * @returns Result containing list of dynamic tables or failure
   */
  async getAll(params: DynamicTableParams): Promise<Result<ListResult<DynamicTable>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        const dynamicTables = response.data.map((item) => DynamicTable.fromJson(item));
        return ListResult.fromJson(
          {
            data: dynamicTables,
            pagination: response.pagination,
          },
          (json: Record<string, unknown>) => DynamicTable.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse dynamic table: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
