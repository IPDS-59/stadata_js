import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { StrategicIndicator } from '../entities';
import { StrategicIndicatorRepository } from '../repositories';

/**
 * Use case for getting a strategic indicator by ID
 */
export class GetStrategicIndicatorById implements UseCase<ViewParams, StrategicIndicator> {
  constructor(private readonly repository: StrategicIndicatorRepository) {}

  async execute(params: ViewParams): Promise<Result<StrategicIndicator, ApiFailure>> {
    return this.repository.getById(params);
  }
}
