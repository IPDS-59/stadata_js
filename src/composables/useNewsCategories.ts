import { StadataClient } from '../client';
import { NewsCategoryRemoteDataSource } from '../features/news-category/data/datasources';
import { NewsCategoryRepositoryImpl } from '../features/news-category/data/repositories';
import { NewsCategory } from '../features/news-category/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { NewsCategoryListParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseNewsCategories {
  fetchNewsCategoryList: (
    params: NewsCategoryListParams
  ) => Promise<Result<ListResult<NewsCategory>, ApiFailure>>;
}

export function useNewsCategories(client: StadataClient): UseNewsCategories {
  const dataSource = new NewsCategoryRemoteDataSource(client.networkClient);
  const repository = new NewsCategoryRepositoryImpl(dataSource);

  return {
    fetchNewsCategoryList: (
      params: NewsCategoryListParams
    ): Promise<Result<ListResult<NewsCategory>, ApiFailure>> => repository.getAll(params),
  };
}
