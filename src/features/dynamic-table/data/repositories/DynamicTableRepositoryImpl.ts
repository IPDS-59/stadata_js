import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
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
   * Gets dynamic table data
   * @param params - Dynamic table parameters
   * @returns Result containing dynamic table or failure
   */
  async getAll(params: DynamicTableParams): Promise<Result<DynamicTable, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // Parse the response into DynamicTable entity
        return DynamicTable.fromJson(response as unknown as Record<string, unknown>);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse dynamic table: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
