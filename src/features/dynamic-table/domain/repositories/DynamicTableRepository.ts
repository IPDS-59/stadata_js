import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared';
import { DynamicTableParams } from '../../../../types';
import { DynamicTable } from '../entities';

/**
 * Repository interface for DynamicTable operations
 */
export interface DynamicTableRepository {
  /**
   * Gets all dynamic tables (uses variable endpoint under the hood)
   * @param params - Dynamic table parameters
   * @returns Result containing list of dynamic tables or failure
   */
  getAll(params: DynamicTableParams): Promise<Result<ListResult<DynamicTable>, ApiFailure>>;
}
