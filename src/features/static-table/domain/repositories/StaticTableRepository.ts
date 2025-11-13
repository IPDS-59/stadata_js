import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core';
import { ListResult } from '../../../../shared';
import { StaticTableListParams, ViewParams } from '../../../../types';
import { StaticTable } from '../entities';

/**
 * Repository interface for StaticTable operations
 */
export interface StaticTableRepository {
  /**
   * Get all static tables with optional filtering
   */
  getAll(params: StaticTableListParams): Promise<Result<ListResult<StaticTable>, ApiFailure>>;

  /**
   * Get a specific static table by ID
   */
  getById(params: ViewParams): Promise<Result<StaticTable, ApiFailure>>;
}
