import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared';
import { DynamicTableParams } from '../../../../types';
import { DynamicTable } from '../entities';
import { DynamicTableRepository } from '../repositories';

/**
 * Use case for getting all dynamic tables
 */
export class GetAllDynamicTables implements UseCase<DynamicTableParams, ListResult<DynamicTable>> {
  constructor(private repository: DynamicTableRepository) {}

  /**
   * Executes the use case
   * @param params - Dynamic table parameters
   * @returns Result containing list of dynamic tables or failure
   */
  async execute(params: DynamicTableParams): Promise<Result<ListResult<DynamicTable>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
