import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { StatisticClassification } from '../entities';
import { StatisticClassificationRepository } from '../repositories';

/**
 * Use case for getting a statistic classification by ID
 */
export class GetStatisticClassificationById {
  constructor(private readonly repository: StatisticClassificationRepository) {}

  execute(params: ViewParams): Promise<Result<StatisticClassification, ApiFailure>> {
    return this.repository.getById(params);
  }
}
