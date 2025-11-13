import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { PeriodRemoteDataSource } from '../data/datasources';
import { PeriodRepositoryImpl } from '../data/repositories';
import { GetAllPeriods, GetPeriodById } from '../domain/usecases';

/**
 * Dependency injector for Period feature
 */
export class PeriodInjector {
  private static readonly REMOTE_DATA_SOURCE = 'PeriodRemoteDataSource';
  private static readonly REPOSITORY = 'PeriodRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllPeriods';
  private static readonly GET_BY_ID_USE_CASE = 'GetPeriodById';

  /**
   * Registers all Period dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new PeriodRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<PeriodRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new PeriodRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<PeriodRepositoryImpl>(this.REPOSITORY);
      return new GetAllPeriods(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<PeriodRepositoryImpl>(this.REPOSITORY);
      return new GetPeriodById(repository);
    });
  }

  /**
   * Gets the GetAllPeriods use case
   */
  static getAllPeriodsUseCase(injector: Injector): GetAllPeriods {
    return injector.resolve<GetAllPeriods>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetPeriodById use case
   */
  static getPeriodByIdUseCase(injector: Injector): GetPeriodById {
    return injector.resolve<GetPeriodById>(this.GET_BY_ID_USE_CASE);
  }
}
