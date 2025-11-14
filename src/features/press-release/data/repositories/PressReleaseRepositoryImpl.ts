import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { PressRelease } from '../../domain/entities';
import { PressReleaseRepository } from '../../domain/repositories/PressReleaseRepository';
import { PressReleaseRemoteDataSource } from '../datasources/PressReleaseRemoteDataSource';
import { ListResult } from '../../../../shared/domain/entities';
import { PressReleaseListParams, ViewParams } from '../../../../types';

/**
 * Implementation of press release repository
 */
export class PressReleaseRepositoryImpl implements PressReleaseRepository {
  constructor(private readonly remoteDataSource: PressReleaseRemoteDataSource) {}

  async getAll(
    params: PressReleaseListParams
  ): Promise<Result<ListResult<PressRelease>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        const pressReleases = response.data.map((item) => PressRelease.fromJson(item));
        return ListResult.fromJson(
          {
            data: pressReleases,
            pagination: response.pagination,
          },
          (json: Record<string, unknown>) => PressRelease.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse press releases: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<PressRelease, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Press release not found');
        }
        const pressReleaseData = response.data[0];
        if (!pressReleaseData) {
          throw new ParseFailure('Press release data is empty');
        }
        return PressRelease.fromJson(pressReleaseData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse press release data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
