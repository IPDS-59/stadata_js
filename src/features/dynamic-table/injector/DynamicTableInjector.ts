import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { DynamicTableRemoteDataSource } from '../data/datasources';
import { DynamicTableRepositoryImpl } from '../data/repositories';
import { GetAllDynamicTables } from '../domain/usecases';

/**
 * Dependency injector for DynamicTable feature
 */
export class DynamicTableInjector {
  private static readonly REMOTE_DATA_SOURCE = 'DynamicTableRemoteDataSource';
  private static readonly REPOSITORY = 'DynamicTableRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllDynamicTables';

  /**
   * Registers all DynamicTable dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(this.REMOTE_DATA_SOURCE, () => {
      return new DynamicTableRemoteDataSource(networkClient);
    });

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<DynamicTableRemoteDataSource>(
        this.REMOTE_DATA_SOURCE
      );
      return new DynamicTableRepositoryImpl(remoteDataSource);
    });

    // Register use case
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<DynamicTableRepositoryImpl>(this.REPOSITORY);
      return new GetAllDynamicTables(repository);
    });
  }

  /**
   * Gets the GetAllDynamicTables use case
   */
  static getAllDynamicTablesUseCase(injector: Injector): GetAllDynamicTables {
    return injector.resolve<GetAllDynamicTables>(this.GET_ALL_USE_CASE);
  }
}
