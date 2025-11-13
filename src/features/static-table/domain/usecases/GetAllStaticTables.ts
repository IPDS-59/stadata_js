import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { StaticTable } from '../entities';
import { StaticTableRepository } from '../repositories/StaticTableRepository';
import { ListResult } from '../../../../shared/domain/entities';
import { StaticTableListParams } from '../../../../types';

/**
 * Use case for getting all static tables
 */
export class GetAllStaticTables {
  constructor(private readonly repository: StaticTableRepository) {}

  async execute(
    params: StaticTableListParams
  ): Promise<Result<ListResult<StaticTable>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
