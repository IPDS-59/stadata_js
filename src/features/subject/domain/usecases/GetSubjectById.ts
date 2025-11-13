import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { Subject } from '../entities';
import { SubjectRepository } from '../repositories';

/**
 * Use case for getting a subject by ID
 */
export class GetSubjectById implements UseCase<ViewParams, Subject> {
  constructor(private readonly repository: SubjectRepository) {}

  async execute(params: ViewParams): Promise<Result<Subject, ApiFailure>> {
    return this.repository.getById(params);
  }
}
