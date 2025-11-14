import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { DerivedVariableListParams, ViewParams } from '../../../../types';
import { DerivedVariable } from '../entities';

/**
 * Repository interface for derived variable operations
 */
export interface DerivedVariableRepository {
  /**
   * Gets all derived variables
   */
  getAll(
    params: DerivedVariableListParams
  ): Promise<Result<ListResult<DerivedVariable>, ApiFailure>>;

  /**
   * Gets a derived variable by ID
   */
  getById(params: ViewParams): Promise<Result<DerivedVariable, ApiFailure>>;
}
