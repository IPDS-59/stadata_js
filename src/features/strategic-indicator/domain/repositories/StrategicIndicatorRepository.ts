import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { StrategicIndicatorListParams, ViewParams } from '../../../../types';
import { StrategicIndicator } from '../entities';

/**
 * Repository interface for strategic indicator operations
 */
export interface StrategicIndicatorRepository {
  /**
   * Gets all strategic indicators
   */
  getAll(
    params?: StrategicIndicatorListParams
  ): Promise<Result<ListResult<StrategicIndicator>, ApiFailure>>;

  /**
   * Gets a strategic indicator by ID
   */
  getById(params: ViewParams): Promise<Result<StrategicIndicator, ApiFailure>>;
}
