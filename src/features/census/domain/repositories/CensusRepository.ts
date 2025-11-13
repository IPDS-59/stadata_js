import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared';
import { CensusListParams, ViewParams } from '../../../../types';
import { Census } from '../entities';

/**
 * Repository interface for Census operations
 */
export interface CensusRepository {
  /**
   * Gets all census events
   * @param params - List parameters
   * @returns Result containing list of census events or failure
   */
  getAll(params?: CensusListParams): Promise<Result<ListResult<Census>, ApiFailure>>;

  /**
   * Gets a census event by ID
   * @param params - View parameters
   * @returns Result containing census event or failure
   */
  getById(params: ViewParams): Promise<Result<Census, ApiFailure>>;
}
