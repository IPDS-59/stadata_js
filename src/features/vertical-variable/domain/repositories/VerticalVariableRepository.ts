import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { VerticalVariableListParams, ViewParams } from '../../../../types';
import { VerticalVariable } from '../entities';

/**
 * Repository interface for vertical variable operations
 */
export interface VerticalVariableRepository {
  /**
   * Gets all vertical variables
   */
  getAll(
    params: VerticalVariableListParams
  ): Promise<Result<ListResult<VerticalVariable>, ApiFailure>>;

  /**
   * Gets a vertical variable by ID
   */
  getById(params: ViewParams): Promise<Result<VerticalVariable, ApiFailure>>;
}
