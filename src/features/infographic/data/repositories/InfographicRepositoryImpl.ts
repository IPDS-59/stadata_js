import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { Infographic } from '../../domain/entities';
import { InfographicRepository } from '../../domain/repositories';
import { InfographicRemoteDataSource } from '../datasources';
import { ListResult } from '../../../../shared/domain/entities';
import { InfographicListParams, ViewParams } from '../../../../types';

/**
 * Implementation of infographic repository
 */
export class InfographicRepositoryImpl implements InfographicRepository {
  constructor(private readonly remoteDataSource: InfographicRemoteDataSource) {}

  async getAll(
    params: InfographicListParams
  ): Promise<Result<ListResult<Infographic>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0];
        const infographicsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !infographicsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const infographics = infographicsData.map((item) => Infographic.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || infographicsData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: infographics,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
          },
          (json: Record<string, unknown>) => Infographic.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse infographics: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<Infographic, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Infographic not found');
        }
        const infographicData = response.data[0];
        if (!infographicData) {
          throw new ParseFailure('Infographic data is empty');
        }
        return Infographic.fromJson(infographicData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse infographic data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
