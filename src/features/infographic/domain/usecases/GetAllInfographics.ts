import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { Infographic } from '../entities';
import { InfographicRepository } from '../repositories';
import { ListResult } from '../../../../shared/domain/entities';
import { InfographicListParams } from '../../../../types';

/**
 * Use case for getting all infographics
 */
export class GetAllInfographics {
  constructor(private readonly repository: InfographicRepository) {}

  async execute(
    params: InfographicListParams
  ): Promise<Result<ListResult<Infographic>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
