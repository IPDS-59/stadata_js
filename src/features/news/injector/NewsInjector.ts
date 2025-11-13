import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { NewsRemoteDataSource } from '../data/datasources';
import { NewsRepositoryImpl } from '../data/repositories';
import { NewsRepository } from '../domain/repositories';
import { GetAllNews, GetNewsById } from '../domain/usecases';

/**
 * Dependency injection setup for News feature
 */
export class NewsInjector {
  private static readonly REMOTE_DATA_SOURCE = 'NewsRemoteDataSource';
  private static readonly REPOSITORY = 'NewsRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllNews';
  private static readonly GET_BY_ID_USE_CASE = 'GetNewsById';

  /**
   * Registers all news dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new NewsRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const dataSource = injector.resolve<NewsRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new NewsRepositoryImpl(dataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<NewsRepository>(this.REPOSITORY);
      return new GetAllNews(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<NewsRepository>(this.REPOSITORY);
      return new GetNewsById(repository);
    });
  }

  /**
   * Resolves GetAllNews use case
   */
  static getAllNewsUseCase(injector: Injector): GetAllNews {
    return injector.resolve<GetAllNews>(this.GET_ALL_USE_CASE);
  }

  /**
   * Resolves GetNewsById use case
   */
  static getNewsByIdUseCase(injector: Injector): GetNewsById {
    return injector.resolve<GetNewsById>(this.GET_BY_ID_USE_CASE);
  }
}
