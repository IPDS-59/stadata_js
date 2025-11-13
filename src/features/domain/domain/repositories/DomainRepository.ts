import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { Domain } from '../entities';
import { ListResult } from '../../../../shared/domain/entities';
import { DomainListParams, ViewParams } from '../../../../types';

/**
 * Domain repository interface
 * Defines the contract for domain data operations
 */
export interface DomainRepository {
  /**
   * Gets all domains with optional filtering and pagination
   */
  getAll(params?: DomainListParams): Promise<Result<ListResult<Domain>, ApiFailure>>;

  /**
   * Gets a domain by ID
   */
  getById(params: ViewParams): Promise<Result<Domain, ApiFailure>>;
}
