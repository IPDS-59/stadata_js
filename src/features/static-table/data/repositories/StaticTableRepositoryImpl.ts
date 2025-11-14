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
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0] as Record<string, unknown>;
        const staticTablesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !staticTablesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const staticTables = staticTablesData.map((item) => StaticTable.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || staticTablesData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: staticTables,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
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
