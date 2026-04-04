import { StadataClient } from '../client';
import { NewsRemoteDataSource } from '../features/news/data/datasources';
import { NewsRepositoryImpl } from '../features/news/data/repositories';
import { News } from '../features/news/domain/entities';
import { ListResult } from '../shared/domain/entities';
import { NewsListParams, ViewParams } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseNews {
  fetchNewList: (params: NewsListParams) => Promise<Result<ListResult<News>, ApiFailure>>;
  fetchNewDetail: (params: ViewParams) => Promise<Result<News, ApiFailure>>;
}

export function useNews(client: StadataClient): UseNews {
  const dataSource = new NewsRemoteDataSource(client.networkClient);
  const repository = new NewsRepositoryImpl(dataSource);

  return {
    fetchNewList: (params: NewsListParams): Promise<Result<ListResult<News>, ApiFailure>> =>
      repository.getAll(params),
    fetchNewDetail: (params: ViewParams): Promise<Result<News, ApiFailure>> =>
      repository.getById(params),
  };
}
