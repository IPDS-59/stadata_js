import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { SubjectRemoteDataSource } from '../features/subject/data/datasources';
import { SubjectRepositoryImpl } from '../features/subject/data/repositories';
import { Subject } from '../features/subject/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { SubjectListParams, ViewParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseSubjects {
  fetchSubjectList: (params: SubjectListParams) => Promise<Result<ListResult<Subject>, ApiFailure>>;
  fetchSubjectDetail: (params: ViewParams) => Promise<Result<Subject, ApiFailure>>;
}

export function useSubjects(client?: StadataClient): UseSubjects {
  const _client = client ?? getGlobalClient();
  const dataSource = new SubjectRemoteDataSource(_client.networkClient);
  const repository = new SubjectRepositoryImpl(dataSource);

  return {
    fetchSubjectList: (
      params: SubjectListParams
    ): Promise<Result<ListResult<Subject>, ApiFailure>> => repository.getAll(params),
    fetchSubjectDetail: (params: ViewParams): Promise<Result<Subject, ApiFailure>> =>
      repository.getById(params),
  };
}
