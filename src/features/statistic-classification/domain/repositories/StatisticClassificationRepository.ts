import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { StatisticClassificationListParams, ViewParams } from '../../../../types';
import { StatisticClassification } from '../entities';

/**
 * Repository interface for statistic classification operations
 */
export interface StatisticClassificationRepository {
  /**
   * Gets all statistic classifications
   */
  getAll(
    params?: StatisticClassificationListParams
  ): Promise<Result<ListResult<StatisticClassification>, ApiFailure>>;

  /**
   * Gets a statistic classification by ID
   */
  getById(params: ViewParams): Promise<Result<StatisticClassification, ApiFailure>>;
}
