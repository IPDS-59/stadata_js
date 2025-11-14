import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { StrategicIndicatorListParams } from '../../../../types';
import { StrategicIndicator } from '../entities';
import { StrategicIndicatorRepository } from '../repositories';

/**
 * Use case for getting all strategic indicators
 */
export class GetAllStrategicIndicators
  implements UseCase<StrategicIndicatorListParams | undefined, ListResult<StrategicIndicator>>
{
  constructor(private readonly repository: StrategicIndicatorRepository) {}

  async execute(
    params?: StrategicIndicatorListParams
  ): Promise<Result<ListResult<StrategicIndicator>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
