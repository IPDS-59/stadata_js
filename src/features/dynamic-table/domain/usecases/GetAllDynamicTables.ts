import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { DynamicTableParams } from '../../../../types';
import { DynamicTable } from '../entities';
import { DynamicTableRepository } from '../repositories';

/**
 * Use case for getting dynamic table data
 */
export class GetAllDynamicTables implements UseCase<DynamicTableParams, DynamicTable> {
  constructor(private repository: DynamicTableRepository) {}

  /**
   * Executes the use case
   * @param params - Dynamic table parameters
   * @returns Result containing dynamic table or failure
   */
  async execute(params: DynamicTableParams): Promise<Result<DynamicTable, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
