import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { Publication } from '../entities';
import { ListResult } from '../../../../shared/domain/entities';
import { PublicationListParams, ViewParams } from '../../../../types';

/**
 * Repository interface for publications
 */
export interface PublicationRepository {
  /**
   * Get all publications
   */
  getAll(params: PublicationListParams): Promise<Result<ListResult<Publication>, ApiFailure>>;

  /**
   * Get publication by ID
   */
  getById(params: ViewParams): Promise<Result<Publication, ApiFailure>>;
}
