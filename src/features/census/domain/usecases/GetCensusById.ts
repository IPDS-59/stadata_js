import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { CensusEvent } from '../entities';
import { CensusRepository } from '../repositories';

/**
 * Use case for getting a census event by ID
 */
export class GetCensusById implements UseCase<ViewParams, CensusEvent> {
  constructor(private repository: CensusRepository) {}

  /**
   * Executes the use case
   * @param params - View parameters
   * @returns Result containing census event or failure
   */
  async execute(params: ViewParams): Promise<Result<CensusEvent, ApiFailure>> {
    return this.repository.getById(params);
  }
}
