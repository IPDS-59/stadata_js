import { Result } from 'neverthrow';
import { DomainRepository } from '../../domain/repositories';
import { Domain } from '../../domain/entities';
import { DomainRemoteDataSource } from '../datasources';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult, Pagination } from '../../../../shared/domain/entities';
import { DomainListParams, ViewParams } from '../../../../types';

/**
 * Implementation of DomainRepository
 * Handles data mapping between API and domain layer
 */
export class DomainRepositoryImpl implements DomainRepository {
  constructor(private remoteDataSource: DomainRemoteDataSource) {}

  async getAll(params?: DomainListParams): Promise<Result<ListResult<Domain>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        // BPS API returns data in format: data[0] = pagination info, data[1] = array of items
        const paginationInfo = response.data[0] as Record<string, unknown>;
        const domainsData = response.data[1] as unknown as Record<string, unknown>[];

        if (!paginationInfo || !domainsData) {
          throw new ParseFailure('Invalid response structure');
        }

        const domains = domainsData.map((item) => Domain.fromJson(item));
        const pagination = new Pagination(
          Number(paginationInfo.page || 1),
          Number(paginationInfo.per_page || 10),
          Number(paginationInfo.total || 0),
          Number(paginationInfo.pages || 1),
          Number(paginationInfo.count || 0)
        );

        return new ListResult(domains, pagination);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse domain data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<Domain, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Domain not found');
        }
        const domainData = response.data[0];
        if (!domainData) {
          throw new ParseFailure('Domain data is empty');
        }
        return Domain.fromJson(domainData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse domain data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
