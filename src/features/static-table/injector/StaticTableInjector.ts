import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { StaticTableRemoteDataSource } from '../data/datasources';
import { StaticTableRepositoryImpl } from '../data/repositories';
import { StaticTableRepository } from '../domain/repositories';
import { GetAllStaticTables, GetStaticTableById } from '../domain/usecases';

/**
 * Dependency injection setup for StaticTable feature
 */
export class StaticTableInjector {
  private static readonly REMOTE_DATA_SOURCE = 'StaticTableRemoteDataSource';
  private static readonly REPOSITORY = 'StaticTableRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllStaticTables';
  private static readonly GET_BY_ID_USE_CASE = 'GetStaticTableById';

  /**
   * Registers all static table dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new StaticTableRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const dataSource = injector.resolve<StaticTableRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new StaticTableRepositoryImpl(dataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<StaticTableRepository>(this.REPOSITORY);
      return new GetAllStaticTables(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<StaticTableRepository>(this.REPOSITORY);
      return new GetStaticTableById(repository);
    });
  }

  /**
   * Resolves GetAllStaticTables use case
   */
  static getAllStaticTablesUseCase(injector: Injector): GetAllStaticTables {
    return injector.resolve<GetAllStaticTables>(this.GET_ALL_USE_CASE);
  }

  /**
   * Resolves GetStaticTableById use case
   */
  static getStaticTableByIdUseCase(injector: Injector): GetStaticTableById {
    return injector.resolve<GetStaticTableById>(this.GET_BY_ID_USE_CASE);
  }
}
