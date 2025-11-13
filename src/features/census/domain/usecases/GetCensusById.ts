import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { Census } from '../entities';
import { CensusRepository } from '../repositories';

/**
 * Use case for getting a census event by ID
 */
export class GetCensusById implements UseCase<ViewParams, Census> {
  constructor(private repository: CensusRepository) {}

  /**
   * Executes the use case
   * @param params - View parameters
   * @returns Result containing census event or failure
   */
  async execute(params: ViewParams): Promise<Result<Census, ApiFailure>> {
    return this.repository.getById(params);
  }
}
