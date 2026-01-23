import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { SubjectCategoryListParams } from '../../../../types';
import { SubjectCategory } from '../entities';
import { SubjectCategoryRepository } from '../repositories';

/**
 * Use case for getting all subject categories
 */
export class GetAllSubjectCategories implements UseCase<
  SubjectCategoryListParams | undefined,
  ListResult<SubjectCategory>
> {
  constructor(private readonly repository: SubjectCategoryRepository) {}

  async execute(
    params?: SubjectCategoryListParams
  ): Promise<Result<ListResult<SubjectCategory>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
