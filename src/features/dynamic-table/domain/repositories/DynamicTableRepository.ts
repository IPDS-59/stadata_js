import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { DynamicTableParams } from '../../../../types';
import { DynamicTable } from '../entities';

/**
 * Repository interface for DynamicTable operations
 */
export interface DynamicTableRepository {
  /**
   * Gets dynamic table data with metadata for rendering
   * @param params - Dynamic table parameters
   * @returns Result containing dynamic table or failure
   */
  getAll(params: DynamicTableParams): Promise<Result<DynamicTable, ApiFailure>>;
}
