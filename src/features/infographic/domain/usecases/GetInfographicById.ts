import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { Infographic } from '../entities';
import { InfographicRepository } from '../repositories';
import { ViewParams } from '../../../../types';

/**
 * Use case for getting an infographic by ID
 */
export class GetInfographicById {
  constructor(private readonly repository: InfographicRepository) {}

  async execute(params: ViewParams): Promise<Result<Infographic, ApiFailure>> {
    return this.repository.getById(params);
  }
}
