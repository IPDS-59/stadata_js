import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { Period } from '../entities';
import { PeriodRepository } from '../repositories';

/**
 * Use case for getting a period by ID
 */
export class GetPeriodById implements UseCase<ViewParams, Period> {
  constructor(private readonly repository: PeriodRepository) {}

  async execute(params: ViewParams): Promise<Result<Period, ApiFailure>> {
    return this.repository.getById(params);
  }
}
