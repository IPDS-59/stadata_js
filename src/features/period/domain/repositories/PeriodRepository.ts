import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { PeriodListParams, ViewParams } from '../../../../types';
import { Period } from '../entities';

/**
 * Repository interface for period operations
 */
export interface PeriodRepository {
  /**
   * Gets all periods
   */
  getAll(params: PeriodListParams): Promise<Result<ListResult<Period>, ApiFailure>>;

  /**
   * Gets a period by ID
   */
  getById(params: ViewParams): Promise<Result<Period, ApiFailure>>;
}
