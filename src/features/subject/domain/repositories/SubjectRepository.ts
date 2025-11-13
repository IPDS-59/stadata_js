import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { SubjectListParams, ViewParams } from '../../../../types';
import { Subject } from '../entities';

/**
 * Repository interface for subject operations
 */
export interface SubjectRepository {
  /**
   * Gets all subjects
   */
  getAll(params?: SubjectListParams): Promise<Result<ListResult<Subject>, ApiFailure>>;

  /**
   * Gets a subject by ID
   */
  getById(params: ViewParams): Promise<Result<Subject, ApiFailure>>;
}
