import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { StrategicIndicatorRemoteDataSource } from '../data/datasources';
import { StrategicIndicatorRepositoryImpl } from '../data/repositories';
import { GetAllStrategicIndicators, GetStrategicIndicatorById } from '../domain/usecases';

/**
 * Dependency injector for StrategicIndicator feature
 */
export class StrategicIndicatorInjector {
  private static readonly REMOTE_DATA_SOURCE = 'StrategicIndicatorRemoteDataSource';
  private static readonly REPOSITORY = 'StrategicIndicatorRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllStrategicIndicators';
  private static readonly GET_BY_ID_USE_CASE = 'GetStrategicIndicatorById';

  /**
   * Registers all StrategicIndicator dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new StrategicIndicatorRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<StrategicIndicatorRemoteDataSource>(
        this.REMOTE_DATA_SOURCE
      );
      return new StrategicIndicatorRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<StrategicIndicatorRepositoryImpl>(this.REPOSITORY);
      return new GetAllStrategicIndicators(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<StrategicIndicatorRepositoryImpl>(this.REPOSITORY);
      return new GetStrategicIndicatorById(repository);
    });
  }

  /**
   * Gets the GetAllStrategicIndicators use case
   */
  static getAllStrategicIndicatorsUseCase(injector: Injector): GetAllStrategicIndicators {
    return injector.resolve<GetAllStrategicIndicators>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetStrategicIndicatorById use case
   */
  static getStrategicIndicatorByIdUseCase(injector: Injector): GetStrategicIndicatorById {
    return injector.resolve<GetStrategicIndicatorById>(this.GET_BY_ID_USE_CASE);
  }
}
