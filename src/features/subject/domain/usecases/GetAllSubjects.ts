import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { SubjectListParams } from '../../../../types';
import { Subject } from '../entities';
import { SubjectRepository } from '../repositories';

/**
 * Use case for getting all subjects
 */
export class GetAllSubjects implements UseCase<SubjectListParams | undefined, ListResult<Subject>> {
  constructor(private readonly repository: SubjectRepository) {}

  async execute(params?: SubjectListParams): Promise<Result<ListResult<Subject>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
