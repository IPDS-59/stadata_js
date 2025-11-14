import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { SubjectCategoryListParams, ViewParams } from '../../../../types';
import { SubjectCategory } from '../entities';

/**
 * Repository interface for subject category operations
 */
export interface SubjectCategoryRepository {
  /**
   * Gets all subject categories
   */
  getAll(
    params?: SubjectCategoryListParams
  ): Promise<Result<ListResult<SubjectCategory>, ApiFailure>>;

  /**
   * Gets a subject category by ID
   */
  getById(params: ViewParams): Promise<Result<SubjectCategory, ApiFailure>>;
}
