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
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        const paginationInfo = response.data[0] as Record<string, unknown>;
        const pressReleasesData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !pressReleasesData) {
          throw new ParseFailure('Invalid response structure');
        }

        const pressReleases = pressReleasesData.map((item) => PressRelease.fromJson(item));
        return ListResult.fromJson(
          {
            data: pressReleases,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: Number(paginationInfo.per_page || 10),
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: Number(paginationInfo.count || 0),
            },
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
