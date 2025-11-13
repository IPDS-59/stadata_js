import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { SubjectCategory } from '../entities';
import { SubjectCategoryRepository } from '../repositories';

/**
 * Use case for getting a subject category by ID
 */
export class GetSubjectCategoryById implements UseCase<ViewParams, SubjectCategory> {
  constructor(private readonly repository: SubjectCategoryRepository) {}

  async execute(params: ViewParams): Promise<Result<SubjectCategory, ApiFailure>> {
    return this.repository.getById(params);
  }
}
