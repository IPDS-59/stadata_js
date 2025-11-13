import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { StaticTable } from '../entities';
import { StaticTableRepository } from '../repositories/StaticTableRepository';
import { ViewParams } from '../../../../types';

/**
 * Use case for getting a specific static table by ID
 */
export class GetStaticTableById {
  constructor(private readonly repository: StaticTableRepository) {}

  async execute(params: ViewParams): Promise<Result<StaticTable, ApiFailure>> {
    return this.repository.getById(params);
  }
}
