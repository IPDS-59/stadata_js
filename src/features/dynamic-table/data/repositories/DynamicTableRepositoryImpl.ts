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
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        const paginationInfo = response.data[0] as Record<string, unknown>;
        const dynamicTablesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !dynamicTablesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const dynamicTables = dynamicTablesData.map((item) => DynamicTable.fromJson(item));
        return ListResult.fromJson(
          {
            data: dynamicTables,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: Number(paginationInfo.per_page || 10),
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: Number(paginationInfo.count || 0),
            },
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
