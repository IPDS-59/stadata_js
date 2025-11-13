import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { VariableListParams } from '../../../../types';
import { Variable } from '../entities';
import { VariableRepository } from '../repositories';

/**
 * Use case for getting all variables
 */
export class GetAllVariables
  implements UseCase<VariableListParams | undefined, ListResult<Variable>>
{
  constructor(private readonly repository: VariableRepository) {}

  async execute(params?: VariableListParams): Promise<Result<ListResult<Variable>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
