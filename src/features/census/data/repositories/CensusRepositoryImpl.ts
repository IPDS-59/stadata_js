import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared';
import { CensusListParams, ViewParams } from '../../../../types';
import { Census } from '../../domain/entities';
import { CensusRepository } from '../../domain/repositories';
import { CensusRemoteDataSource } from '../datasources';

/**
 * Implementation of CensusRepository
 */
export class CensusRepositoryImpl implements CensusRepository {
  constructor(private remoteDataSource: CensusRemoteDataSource) {}

  /**
   * Gets all census events
   * @param params - List parameters
   * @returns Result containing list of census events or failure
   */
  async getAll(params?: CensusListParams): Promise<Result<ListResult<Census>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        const censuses = response.data.map((item) => Census.fromJson(item));
        return ListResult.fromJson(
          {
            data: censuses,
            pagination: response.pagination,
          },
          (json: Record<string, unknown>) => Census.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse census: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  /**
   * Gets a census event by ID
   * @param params - View parameters
   * @returns Result containing census event or failure
   */
  async getById(params: ViewParams): Promise<Result<Census, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        return Census.fromJson(response);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse census: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
