import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { NewsCategoryRemoteDataSource } from '../data/datasources';
import { NewsCategoryRepositoryImpl } from '../data/repositories';
import { GetAllNewsCategories, GetNewsCategoryById } from '../domain/usecases';

/**
 * Dependency injector for NewsCategory feature
 */
export class NewsCategoryInjector {
  private static readonly REMOTE_DATA_SOURCE = 'NewsCategoryRemoteDataSource';
  private static readonly REPOSITORY = 'NewsCategoryRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllNewsCategories';
  private static readonly GET_BY_ID_USE_CASE = 'GetNewsCategoryById';

  /**
   * Registers all NewsCategory dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new NewsCategoryRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<NewsCategoryRemoteDataSource>(
        this.REMOTE_DATA_SOURCE
      );
      return new NewsCategoryRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<NewsCategoryRepositoryImpl>(this.REPOSITORY);
      return new GetAllNewsCategories(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<NewsCategoryRepositoryImpl>(this.REPOSITORY);
      return new GetNewsCategoryById(repository);
    });
  }

  /**
   * Gets the GetAllNewsCategories use case
   */
  static getAllNewsCategoriesUseCase(injector: Injector): GetAllNewsCategories {
    return injector.resolve<GetAllNewsCategories>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetNewsCategoryById use case
   */
  static getNewsCategoryByIdUseCase(injector: Injector): GetNewsCategoryById {
    return injector.resolve<GetNewsCategoryById>(this.GET_BY_ID_USE_CASE);
  }
}
