import { StadataClient } from '../client';
import { SubjectCategoryRemoteDataSource } from '../features/subject-category/data/datasources';
import { SubjectCategoryRepositoryImpl } from '../features/subject-category/data/repositories';
import { SubjectCategory } from '../features/subject-category/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { SubjectCategoryListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export function useSubjectCategories(client: StadataClient) {
  const dataSource = new SubjectCategoryRemoteDataSource(client.networkClient);
  const repository = new SubjectCategoryRepositoryImpl(dataSource);

  return {
    fetchSubjectCategorieList: (params: SubjectCategoryListParams): Promise<Result<ListResult<SubjectCategory>, ApiFailure>> =>
      repository.getAll(params),
  };
}
