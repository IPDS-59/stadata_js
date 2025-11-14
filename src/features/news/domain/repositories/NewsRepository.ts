import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core';
import { ListResult } from '../../../../shared';
import { NewsListParams, ViewParams } from '../../../../types';
import { News } from '../entities';

/**
 * Repository interface for News operations
 */
export interface NewsRepository {
  /**
   * Get all news with optional filtering
   */
  getAll(params: NewsListParams): Promise<Result<ListResult<News>, ApiFailure>>;

  /**
   * Get a specific news item by ID
   */
  getById(params: ViewParams): Promise<Result<News, ApiFailure>>;
}
