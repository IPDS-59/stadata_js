import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core';
import { ListResult } from '../../../../shared';
import { PressReleaseListParams, ViewParams } from '../../../../types';
import { PressRelease } from '../entities';

/**
 * Repository interface for PressRelease operations
 */
export interface PressReleaseRepository {
  /**
   * Get all press releases with optional filtering
   */
  getAll(params: PressReleaseListParams): Promise<Result<ListResult<PressRelease>, ApiFailure>>;

  /**
   * Get a specific press release by ID
   */
  getById(params: ViewParams): Promise<Result<PressRelease, ApiFailure>>;
}
