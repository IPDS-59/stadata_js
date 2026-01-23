import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { VerticalVariableListParams } from '../../../../types';
import { VerticalVariable } from '../entities';
import { VerticalVariableRepository } from '../repositories';

/**
 * Use case for getting all vertical variables
 */
export class GetAllVerticalVariables implements UseCase<
  VerticalVariableListParams,
  ListResult<VerticalVariable>
> {
  constructor(private readonly repository: VerticalVariableRepository) {}

  async execute(
    params: VerticalVariableListParams
  ): Promise<Result<ListResult<VerticalVariable>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
