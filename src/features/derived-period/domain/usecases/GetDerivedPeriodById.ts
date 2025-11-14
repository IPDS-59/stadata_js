import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { DerivedPeriod } from '../entities';
import { DerivedPeriodRepository } from '../repositories';

/**
 * Use case for getting a derived period by ID
 */
export class GetDerivedPeriodById {
  constructor(private readonly repository: DerivedPeriodRepository) {}

  execute(params: ViewParams): Promise<Result<DerivedPeriod, ApiFailure>> {
    return this.repository.getById(params);
  }
}
