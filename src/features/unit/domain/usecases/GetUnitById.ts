import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { Unit } from '../entities';
import { UnitRepository } from '../repositories';

/**
 * Use case for getting a unit by ID
 */
export class GetUnitById implements UseCase<ViewParams, Unit> {
  constructor(private readonly repository: UnitRepository) {}

  async execute(params: ViewParams): Promise<Result<Unit, ApiFailure>> {
    return this.repository.getById(params);
  }
}
