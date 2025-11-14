import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { PressReleaseRemoteDataSource } from '../data/datasources';
import { PressReleaseRepositoryImpl } from '../data/repositories';
import { PressReleaseRepository } from '../domain/repositories';
import { GetAllPressReleases, GetPressReleaseById } from '../domain/usecases';

/**
 * Dependency injection setup for PressRelease feature
 */
export class PressReleaseInjector {
  private static readonly REMOTE_DATA_SOURCE = 'PressReleaseRemoteDataSource';
  private static readonly REPOSITORY = 'PressReleaseRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllPressReleases';
  private static readonly GET_BY_ID_USE_CASE = 'GetPressReleaseById';

  /**
   * Registers all press release dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new PressReleaseRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const dataSource = injector.resolve<PressReleaseRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new PressReleaseRepositoryImpl(dataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<PressReleaseRepository>(this.REPOSITORY);
      return new GetAllPressReleases(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<PressReleaseRepository>(this.REPOSITORY);
      return new GetPressReleaseById(repository);
    });
  }

  /**
   * Resolves GetAllPressReleases use case
   */
  static getAllPressReleasesUseCase(injector: Injector): GetAllPressReleases {
    return injector.resolve<GetAllPressReleases>(this.GET_ALL_USE_CASE);
  }

  /**
   * Resolves GetPressReleaseById use case
   */
  static getPressReleaseByIdUseCase(injector: Injector): GetPressReleaseById {
    return injector.resolve<GetPressReleaseById>(this.GET_BY_ID_USE_CASE);
  }
}
