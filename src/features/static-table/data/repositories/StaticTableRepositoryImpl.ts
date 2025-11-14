import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { StaticTable } from '../../domain/entities';
import { StaticTableRepository } from '../../domain/repositories/StaticTableRepository';
import { StaticTableRemoteDataSource } from '../datasources/StaticTableRemoteDataSource';
import { ListResult } from '../../../../shared/domain/entities';
import { StaticTableListParams, ViewParams } from '../../../../types';

/**
 * Implementation of static table repository
 */
export class StaticTableRepositoryImpl implements StaticTableRepository {
  constructor(private readonly remoteDataSource: StaticTableRemoteDataSource) {}

  async getAll(
    params: StaticTableListParams
  ): Promise<Result<ListResult<StaticTable>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        const paginationInfo = response.data[0] as Record<string, unknown>;
        const staticTablesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !staticTablesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const staticTables = staticTablesData.map((item) => StaticTable.fromJson(item));
        return ListResult.fromJson(
          {
            data: staticTables,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: Number(paginationInfo.per_page || 10),
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: Number(paginationInfo.count || 0),
            },
          },
          (json: Record<string, unknown>) => StaticTable.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse static tables: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<StaticTable, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Static table not found');
        }
        const staticTableData = response.data[0];
        if (!staticTableData) {
          throw new ParseFailure('Static table data is empty');
        }
        return StaticTable.fromJson(staticTableData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse static table data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
