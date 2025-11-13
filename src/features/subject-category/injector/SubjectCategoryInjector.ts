import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { SubjectCategoryRemoteDataSource } from '../data/datasources';
import { SubjectCategoryRepositoryImpl } from '../data/repositories';
import { GetAllSubjectCategories, GetSubjectCategoryById } from '../domain/usecases';

/**
 * Dependency injector for SubjectCategory feature
 */
export class SubjectCategoryInjector {
  private static readonly REMOTE_DATA_SOURCE = 'SubjectCategoryRemoteDataSource';
  private static readonly REPOSITORY = 'SubjectCategoryRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllSubjectCategories';
  private static readonly GET_BY_ID_USE_CASE = 'GetSubjectCategoryById';

  /**
   * Registers all SubjectCategory dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new SubjectCategoryRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<SubjectCategoryRemoteDataSource>(
        this.REMOTE_DATA_SOURCE
      );
      return new SubjectCategoryRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<SubjectCategoryRepositoryImpl>(this.REPOSITORY);
      return new GetAllSubjectCategories(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<SubjectCategoryRepositoryImpl>(this.REPOSITORY);
      return new GetSubjectCategoryById(repository);
    });
  }

  /**
   * Gets the GetAllSubjectCategories use case
   */
  static getAllSubjectCategoriesUseCase(injector: Injector): GetAllSubjectCategories {
    return injector.resolve<GetAllSubjectCategories>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetSubjectCategoryById use case
   */
  static getSubjectCategoryByIdUseCase(injector: Injector): GetSubjectCategoryById {
    return injector.resolve<GetSubjectCategoryById>(this.GET_BY_ID_USE_CASE);
  }
}
