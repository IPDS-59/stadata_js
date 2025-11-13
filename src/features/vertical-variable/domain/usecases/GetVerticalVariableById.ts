import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { VerticalVariable } from '../entities';
import { VerticalVariableRepository } from '../repositories';

/**
 * Use case for getting a vertical variable by ID
 */
export class GetVerticalVariableById implements UseCase<ViewParams, VerticalVariable> {
  constructor(private readonly repository: VerticalVariableRepository) {}

  async execute(params: ViewParams): Promise<Result<VerticalVariable, ApiFailure>> {
    return this.repository.getById(params);
  }
}
