import { StadataClient } from '../client';
import { getGlobalClient } from '../global';
import { SubjectCategoryRemoteDataSource } from '../features/subject-category/data/datasources';
import { SubjectCategoryRepositoryImpl } from '../features/subject-category/data/repositories';
import { SubjectCategory } from '../features/subject-category/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { SubjectCategoryListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseSubjectCategories {
  fetchSubjectCategoryList: (
    params: SubjectCategoryListParams
  ) => Promise<Result<ListResult<SubjectCategory>, ApiFailure>>;
}

export function useSubjectCategories(client?: StadataClient): UseSubjectCategories {
  const _client = client ?? getGlobalClient();
  const dataSource = new SubjectCategoryRemoteDataSource(_client.networkClient);
  const repository = new SubjectCategoryRepositoryImpl(dataSource);

  return {
    fetchSubjectCategoryList: (
      params: SubjectCategoryListParams
    ): Promise<Result<ListResult<SubjectCategory>, ApiFailure>> => repository.getAll(params),
  };
}
