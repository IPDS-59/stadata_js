import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared';
import { CensusListParams } from '../../../../types';
import { Census } from '../entities';
import { CensusRepository } from '../repositories';

/**
 * Use case for getting all census events
 */
export class GetAllCensuses implements UseCase<CensusListParams | undefined, ListResult<Census>> {
  constructor(private repository: CensusRepository) {}

  /**
   * Executes the use case
   * @param params - List parameters
   * @returns Result containing list of census events or failure
   */
  async execute(params?: CensusListParams): Promise<Result<ListResult<Census>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
