import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { VariableListParams, ViewParams } from '../../../../types';
import { Variable } from '../entities';

/**
 * Repository interface for variable operations
 */
export interface VariableRepository {
  /**
   * Gets all variables
   */
  getAll(params?: VariableListParams): Promise<Result<ListResult<Variable>, ApiFailure>>;

  /**
   * Gets a variable by ID
   */
  getById(params: ViewParams): Promise<Result<Variable, ApiFailure>>;
}
