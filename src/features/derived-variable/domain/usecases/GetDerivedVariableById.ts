import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { DerivedVariable } from '../entities';
import { DerivedVariableRepository } from '../repositories';

/**
 * Use case for getting a derived variable by ID
 */
export class GetDerivedVariableById {
  constructor(private readonly repository: DerivedVariableRepository) {}

  execute(params: ViewParams): Promise<Result<DerivedVariable, ApiFailure>> {
    return this.repository.getById(params);
  }
}
