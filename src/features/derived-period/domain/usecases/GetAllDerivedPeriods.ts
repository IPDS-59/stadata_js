import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { DerivedPeriodListParams } from '../../../../types';
import { DerivedPeriod } from '../entities';
import { DerivedPeriodRepository } from '../repositories';

/**
 * Use case for getting all derived periods
 */
export class GetAllDerivedPeriods {
  constructor(private readonly repository: DerivedPeriodRepository) {}

  execute(params: DerivedPeriodListParams): Promise<Result<ListResult<DerivedPeriod>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
