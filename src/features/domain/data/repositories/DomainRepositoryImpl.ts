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
        const domains = response.data.map((item) => Domain.fromJson(item));
        const pagination = response.pagination
          ? Pagination.fromJson(response.pagination)
          : new Pagination(1, domains.length, domains.length, 1, domains.length);

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
