import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { StatisticClassificationListParams } from '../../../../types';
import { StatisticClassification } from '../entities';
import { StatisticClassificationRepository } from '../repositories';

/**
 * Use case for getting all statistic classifications
 */
export class GetAllStatisticClassifications {
  constructor(private readonly repository: StatisticClassificationRepository) {}

  execute(
    params?: StatisticClassificationListParams
  ): Promise<Result<ListResult<StatisticClassification>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
