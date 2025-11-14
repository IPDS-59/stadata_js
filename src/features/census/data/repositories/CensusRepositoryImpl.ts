import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared';
import { CensusListParams, ViewParams } from '../../../../types';
import {
  CensusEvent,
  CensusTopic,
  CensusArea,
  CensusDataset,
  CensusData,
} from '../../domain/entities';
import { CensusRepository } from '../../domain/repositories';
import { CensusRemoteDataSource } from '../datasources';

/**
 * Implementation of CensusRepository
 */
export class CensusRepositoryImpl implements CensusRepository {
  constructor(private remoteDataSource: CensusRemoteDataSource) {}

  /**
   * Gets all census data based on type
   * @param params - List parameters
   * @returns Result containing list of census data or failure
   */
  async getAll(
    params?: CensusListParams
  ): Promise<Result<ListResult<CensusEvent | CensusTopic | CensusArea | CensusDataset | CensusData>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // Handle null or missing data gracefully - return empty list
        if (!response.data || response.data === null) {
          return this.createEmptyListResult(params);
        }

        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data is an array with at least 2 elements
        if (!Array.isArray(response.data) || response.data.length < 2) {
          return this.createEmptyListResult(params);
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
          return this.createEmptyListResult(params, paginationInfo);
        }

        // Parse data based on type
        const censuses = censusesData.map((item) => this.parseEntity(item, params?.type));

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
          (json: Record<string, unknown>) => this.parseEntity(json, params?.type)
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
  async getById(params: ViewParams): Promise<Result<CensusEvent, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        return CensusEvent.fromJson(response);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse census event: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  /**
   * Parses entity based on census type
   */
  private parseEntity(
    json: Record<string, unknown>,
    type?: 'events' | 'topics' | 'areas' | 'datasets' | 'data'
  ): CensusEvent | CensusTopic | CensusArea | CensusDataset | CensusData {
    switch (type) {
      case 'topics':
        return CensusTopic.fromJson(json);
      case 'areas':
        return CensusArea.fromJson(json);
      case 'datasets':
        return CensusDataset.fromJson(json);
      case 'data':
        return CensusData.fromJson(json);
      case 'events':
      default:
        return CensusEvent.fromJson(json);
    }
  }

  /**
   * Creates an empty list result with proper pagination
   */
  private createEmptyListResult(
    params?: CensusListParams,
    paginationInfo?: Record<string, unknown>
  ): ListResult<CensusEvent | CensusTopic | CensusArea | CensusDataset | CensusData> {
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
      (json: Record<string, unknown>) => this.parseEntity(json, params?.type)
    );
  }
}
