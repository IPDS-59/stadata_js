import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { UnitListParams } from '../../../../types';
import { Unit } from '../entities';
import { UnitRepository } from '../repositories';

/**
 * Use case for getting all units
 */
export class GetAllUnits implements UseCase<UnitListParams | undefined, ListResult<Unit>> {
  constructor(private readonly repository: UnitRepository) {}

  async execute(params?: UnitListParams): Promise<Result<ListResult<Unit>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
