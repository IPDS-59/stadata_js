import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { Publication } from '../../domain/entities';
import { PublicationRepository } from '../../domain/repositories/PublicationRepository';
import { PublicationRemoteDataSource } from '../datasources/PublicationRemoteDataSource';
import { ListResult } from '../../../../shared/domain/entities';
import { PublicationListParams, ViewParams } from '../../../../types';

/**
 * Implementation of publication repository
 */
export class PublicationRepositoryImpl implements PublicationRepository {
  constructor(private readonly remoteDataSource: PublicationRemoteDataSource) {}

  async getAll(
    params: PublicationListParams
  ): Promise<Result<ListResult<Publication>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        // Validate that response.data exists and is an array with at least 2 elements
        if (!response.data || !Array.isArray(response.data) || response.data.length < 2) {
          throw new ParseFailure('Invalid response structure: missing or invalid data array');
        }

        const paginationInfo = response.data[0] as Record<string, unknown>;
        const publicationsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !publicationsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const publications = publicationsData.map((item) => Publication.fromJson(item));

        // Calculate fallback values for missing pagination fields
        const count = Number(paginationInfo.count) || publicationsData.length;
        const perPage = Number(paginationInfo.per_page) || count;

        return ListResult.fromJson(
          {
            data: publications,
            pagination: {
              page: Number(paginationInfo.page || 1),
              per_page: perPage,
              total: Number(paginationInfo.total || 0),
              pages: Number(paginationInfo.pages || 1),
              count: count,
            },
          },
          (json: Record<string, unknown>) => Publication.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse publications: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<Publication, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Publication not found');
        }
        const publicationData = response.data[0];
        if (!publicationData) {
          throw new ParseFailure('Publication data is empty');
        }
        return Publication.fromJson(publicationData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse publication data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
