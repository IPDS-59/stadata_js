import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { Variable } from '../entities';
import { VariableRepository } from '../repositories';

/**
 * Use case for getting a variable by ID
 */
export class GetVariableById implements UseCase<ViewParams, Variable> {
  constructor(private readonly repository: VariableRepository) {}

  async execute(params: ViewParams): Promise<Result<Variable, ApiFailure>> {
    return this.repository.getById(params);
  }
}
