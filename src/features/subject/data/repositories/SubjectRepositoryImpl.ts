import { Result } from 'neverthrow';
import { ApiFailure, ParseFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { SubjectListParams, ViewParams } from '../../../../types';
import { Subject } from '../../domain/entities';
import { SubjectRepository } from '../../domain/repositories';
import { SubjectRemoteDataSource } from '../datasources';

/**
 * Implementation of SubjectRepository
 */
export class SubjectRepositoryImpl implements SubjectRepository {
  constructor(private readonly remoteDataSource: SubjectRemoteDataSource) {}

  async getAll(params?: SubjectListParams): Promise<Result<ListResult<Subject>, ApiFailure>> {
    const result = await this.remoteDataSource.getAll(params);

    return result.map((response) => {
      try {
        const subjects = response.data.map((item) => Subject.fromJson(item));
        return ListResult.fromJson(
          {
            data: subjects,
            pagination: response.pagination,
          },
          (json: Record<string, unknown>) => Subject.fromJson(json)
        );
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse subject: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }

  async getById(params: ViewParams): Promise<Result<Subject, ApiFailure>> {
    const result = await this.remoteDataSource.getById(params);

    return result.map((response) => {
      try {
        if (response.data.length === 0) {
          throw new ParseFailure('Subject not found');
        }
        const subjectData = response.data[0];
        if (!subjectData) {
          throw new ParseFailure('Subject data is empty');
        }
        return Subject.fromJson(subjectData);
      } catch (error) {
        throw new ParseFailure(
          `Failed to parse subject data: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
      }
    });
  }
}
