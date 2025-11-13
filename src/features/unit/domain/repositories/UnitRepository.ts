import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { UnitListParams, ViewParams } from '../../../../types';
import { Unit } from '../entities';

/**
 * Repository interface for unit operations
 */
export interface UnitRepository {
  /**
   * Gets all units
   */
  getAll(params?: UnitListParams): Promise<Result<ListResult<Unit>, ApiFailure>>;

  /**
   * Gets a unit by ID
   */
  getById(params: ViewParams): Promise<Result<Unit, ApiFailure>>;
}
