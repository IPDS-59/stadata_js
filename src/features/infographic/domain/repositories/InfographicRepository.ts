import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { Infographic } from '../entities';
import { ListResult } from '../../../../shared/domain/entities';
import { InfographicListParams, ViewParams } from '../../../../types';

/**
 * Repository interface for infographics
 */
export interface InfographicRepository {
  /**
   * Get all infographics
   */
  getAll(params: InfographicListParams): Promise<Result<ListResult<Infographic>, ApiFailure>>;

  /**
   * Get infographic by ID
   */
  getById(params: ViewParams): Promise<Result<Infographic, ApiFailure>>;
}
