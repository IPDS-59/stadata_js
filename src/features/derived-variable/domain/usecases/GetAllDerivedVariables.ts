import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { DerivedVariableListParams } from '../../../../types';
import { DerivedVariable } from '../entities';
import { DerivedVariableRepository } from '../repositories';

/**
 * Use case for getting all derived variables
 */
export class GetAllDerivedVariables {
  constructor(private readonly repository: DerivedVariableRepository) {}

  execute(
    params: DerivedVariableListParams
  ): Promise<Result<ListResult<DerivedVariable>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
