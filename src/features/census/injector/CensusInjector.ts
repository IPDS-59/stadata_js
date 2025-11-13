import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { CensusRemoteDataSource } from '../data/datasources';
import { CensusRepositoryImpl } from '../data/repositories';
import { GetAllCensuses, GetCensusById } from '../domain/usecases';

/**
 * Dependency injector for Census feature
 */
export class CensusInjector {
  private static readonly REMOTE_DATA_SOURCE = 'CensusRemoteDataSource';
  private static readonly REPOSITORY = 'CensusRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllCensuses';
  private static readonly GET_BY_ID_USE_CASE = 'GetCensusById';

  /**
   * Registers all Census dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(this.REMOTE_DATA_SOURCE, () => {
      return new CensusRemoteDataSource(networkClient);
    });

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<CensusRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new CensusRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<CensusRepositoryImpl>(this.REPOSITORY);
      return new GetAllCensuses(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<CensusRepositoryImpl>(this.REPOSITORY);
      return new GetCensusById(repository);
    });
  }

  /**
   * Gets the GetAllCensuses use case
   */
  static getAllCensusesUseCase(injector: Injector): GetAllCensuses {
    return injector.resolve<GetAllCensuses>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetCensusById use case
   */
  static getCensusByIdUseCase(injector: Injector): GetCensusById {
    return injector.resolve<GetCensusById>(this.GET_BY_ID_USE_CASE);
  }
}
