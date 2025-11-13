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
        const infographics = response.data.map((item) => Infographic.fromJson(item));
        return ListResult.fromJson(
          {
            data: infographics,
            pagination: response.pagination,
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
