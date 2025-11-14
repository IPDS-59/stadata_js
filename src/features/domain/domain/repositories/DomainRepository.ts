import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { Domain } from '../entities';
import { ListResult } from '../../../../shared/domain/entities';
import { DomainListParams } from '../../../../types';

/**
 * Domain repository interface
 * Defines the contract for domain data operations
 */
export interface DomainRepository {
  /**
   * Gets all domains with optional filtering and pagination
   */
  getAll(params?: DomainListParams): Promise<Result<ListResult<Domain>, ApiFailure>>;
}
