import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { SubjectRemoteDataSource } from '../data/datasources';
import { SubjectRepositoryImpl } from '../data/repositories';
import { GetAllSubjects, GetSubjectById } from '../domain/usecases';

/**
 * Dependency injector for Subject feature
 */
export class SubjectInjector {
  private static readonly REMOTE_DATA_SOURCE = 'SubjectRemoteDataSource';
  private static readonly REPOSITORY = 'SubjectRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllSubjects';
  private static readonly GET_BY_ID_USE_CASE = 'GetSubjectById';

  /**
   * Registers all Subject dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new SubjectRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<SubjectRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new SubjectRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<SubjectRepositoryImpl>(this.REPOSITORY);
      return new GetAllSubjects(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<SubjectRepositoryImpl>(this.REPOSITORY);
      return new GetSubjectById(repository);
    });
  }

  /**
   * Gets the GetAllSubjects use case
   */
  static getAllSubjectsUseCase(injector: Injector): GetAllSubjects {
    return injector.resolve<GetAllSubjects>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetSubjectById use case
   */
  static getSubjectByIdUseCase(injector: Injector): GetSubjectById {
    return injector.resolve<GetSubjectById>(this.GET_BY_ID_USE_CASE);
  }
}
