import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { DerivedPeriodListParams, ViewParams } from '../../../../types';
import { DerivedPeriod } from '../entities';

/**
 * Repository interface for derived period operations
 */
export interface DerivedPeriodRepository {
  /**
   * Gets all derived periods
   */
  getAll(params: DerivedPeriodListParams): Promise<Result<ListResult<DerivedPeriod>, ApiFailure>>;

  /**
   * Gets a derived period by ID
   */
  getById(params: ViewParams): Promise<Result<DerivedPeriod, ApiFailure>>;
}
