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
        // Handle null or missing data gracefully - return empty list
        if (!response.data || response.data === null) {
          return ListResult.fromJson(
            {
              data: [],
              pagination: {
                page: 1,
                per_page: 10,
                total: 0,
                pages: 0,
                count: 0,
              },
            },
            (json: Record<string, unknown>) => Census.fromJson(json)
          );
        }

        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data is an array with at least 2 elements
        if (!Array.isArray(response.data) || response.data.length < 2) {
          // Return empty list for invalid structure
          return ListResult.fromJson(
            {
              data: [],
              pagination: {
                page: 1,
                per_page: 10,
                total: 0,
                pages: 0,
                count: 0,
              },
            },
            (json: Record<string, unknown>) => Census.fromJson(json)
          );
        }

        const paginationInfo = response.data[0] as Record<string, unknown>;
        let censusesData = response.data[1] as unknown as Record<string, unknown>[] | Record<string, unknown>;

        // Handle census data (id=41) which wraps the array in an object with 'data' property
        if (censusesData && !Array.isArray(censusesData) && typeof censusesData === 'object') {
          // Census data endpoint returns: { timestamp, status, data_count, data: [...] }
          const wrapper = censusesData as Record<string, unknown>;
          if (wrapper.data && Array.isArray(wrapper.data)) {
            censusesData = wrapper.data as Record<string, unknown>[];
          }
        }

        // Handle null or non-array census data
        if (!censusesData || !Array.isArray(censusesData)) {
          return ListResult.fromJson(
            {
              data: [],
              pagination: {
                page: Number(paginationInfo?.page || 1),
                per_page: Number(paginationInfo?.per_page || 10),
                total: Number(paginationInfo?.total || 0),
                pages: Number(paginationInfo?.pages || 0),
                count: 0,
              },
            },
            (json: Record<string, unknown>) => Census.fromJson(json)
          );
        }

        const censuses = censusesData.map((item) => Census.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || censusesData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: censuses,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
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
