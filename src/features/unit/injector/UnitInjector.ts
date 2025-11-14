import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { UnitRemoteDataSource } from '../data/datasources';
import { UnitRepositoryImpl } from '../data/repositories';
import { GetAllUnits, GetUnitById } from '../domain/usecases';

/**
 * Dependency injector for Unit feature
 */
export class UnitInjector {
  private static readonly REMOTE_DATA_SOURCE = 'UnitRemoteDataSource';
  private static readonly REPOSITORY = 'UnitRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllUnits';
  private static readonly GET_BY_ID_USE_CASE = 'GetUnitById';

  /**
   * Registers all Unit dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new UnitRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<UnitRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new UnitRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<UnitRepositoryImpl>(this.REPOSITORY);
      return new GetAllUnits(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<UnitRepositoryImpl>(this.REPOSITORY);
      return new GetUnitById(repository);
    });
  }

  /**
   * Gets the GetAllUnits use case
   */
  static getAllUnitsUseCase(injector: Injector): GetAllUnits {
    return injector.resolve<GetAllUnits>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetUnitById use case
   */
  static getUnitByIdUseCase(injector: Injector): GetUnitById {
    return injector.resolve<GetUnitById>(this.GET_BY_ID_USE_CASE);
  }
}
