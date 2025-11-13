import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { DerivedPeriodRemoteDataSource } from '../data/datasources';
import { DerivedPeriodRepositoryImpl } from '../data/repositories';
import { GetAllDerivedPeriods, GetDerivedPeriodById } from '../domain/usecases';

/**
 * Dependency injector for DerivedPeriod feature
 */
export class DerivedPeriodInjector {
  private static readonly REMOTE_DATA_SOURCE = 'DerivedPeriodRemoteDataSource';
  private static readonly REPOSITORY = 'DerivedPeriodRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllDerivedPeriods';
  private static readonly GET_BY_ID_USE_CASE = 'GetDerivedPeriodById';

  /**
   * Registers all DerivedPeriod dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new DerivedPeriodRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<DerivedPeriodRemoteDataSource>(
        this.REMOTE_DATA_SOURCE
      );
      return new DerivedPeriodRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<DerivedPeriodRepositoryImpl>(this.REPOSITORY);
      return new GetAllDerivedPeriods(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<DerivedPeriodRepositoryImpl>(this.REPOSITORY);
      return new GetDerivedPeriodById(repository);
    });
  }

  /**
   * Gets the GetAllDerivedPeriods use case
   */
  static getAllDerivedPeriodsUseCase(injector: Injector): GetAllDerivedPeriods {
    return injector.resolve<GetAllDerivedPeriods>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetDerivedPeriodById use case
   */
  static getDerivedPeriodByIdUseCase(injector: Injector): GetDerivedPeriodById {
    return injector.resolve<GetDerivedPeriodById>(this.GET_BY_ID_USE_CASE);
  }
}
