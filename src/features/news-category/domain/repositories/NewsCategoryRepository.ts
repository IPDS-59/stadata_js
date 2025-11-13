import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { NewsCategoryListParams, ViewParams } from '../../../../types';
import { NewsCategory } from '../entities';

/**
 * Repository interface for news category operations
 */
export interface NewsCategoryRepository {
  /**
   * Gets all news categories
   */
  getAll(params?: NewsCategoryListParams): Promise<Result<ListResult<NewsCategory>, ApiFailure>>;

  /**
   * Gets a news category by ID
   */
  getById(params: ViewParams): Promise<Result<NewsCategory, ApiFailure>>;
}
