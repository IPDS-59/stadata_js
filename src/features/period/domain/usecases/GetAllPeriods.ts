import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { PeriodListParams } from '../../../../types';
import { Period } from '../entities';
import { PeriodRepository } from '../repositories';

/**
 * Use case for getting all periods
 */
export class GetAllPeriods implements UseCase<PeriodListParams, ListResult<Period>> {
  constructor(private readonly repository: PeriodRepository) {}

  async execute(params: PeriodListParams): Promise<Result<ListResult<Period>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
