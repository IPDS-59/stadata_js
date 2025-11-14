import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared';
import { CensusListParams } from '../../../../types';
import {
  CensusEvent,
  CensusTopic,
  CensusArea,
  CensusDataset,
  CensusData,
} from '../entities';
import { CensusRepository } from '../repositories';

type CensusEntity = CensusEvent | CensusTopic | CensusArea | CensusDataset | CensusData;

/**
 * Use case for getting all census data
 */
export class GetAllCensuses implements UseCase<CensusListParams | undefined, ListResult<CensusEntity>> {
  constructor(private repository: CensusRepository) {}

  /**
   * Executes the use case
   * @param params - List parameters
   * @returns Result containing list of census data or failure
   */
  async execute(params?: CensusListParams): Promise<Result<ListResult<CensusEntity>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
