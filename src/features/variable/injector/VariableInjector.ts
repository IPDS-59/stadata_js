import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { VariableRemoteDataSource } from '../data/datasources';
import { VariableRepositoryImpl } from '../data/repositories';
import { GetAllVariables, GetVariableById } from '../domain/usecases';

/**
 * Dependency injector for Variable feature
 */
export class VariableInjector {
  private static readonly REMOTE_DATA_SOURCE = 'VariableRemoteDataSource';
  private static readonly REPOSITORY = 'VariableRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllVariables';
  private static readonly GET_BY_ID_USE_CASE = 'GetVariableById';

  /**
   * Registers all Variable dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new VariableRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<VariableRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new VariableRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<VariableRepositoryImpl>(this.REPOSITORY);
      return new GetAllVariables(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<VariableRepositoryImpl>(this.REPOSITORY);
      return new GetVariableById(repository);
    });
  }

  /**
   * Gets the GetAllVariables use case
   */
  static getAllVariablesUseCase(injector: Injector): GetAllVariables {
    return injector.resolve<GetAllVariables>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetVariableById use case
   */
  static getVariableByIdUseCase(injector: Injector): GetVariableById {
    return injector.resolve<GetVariableById>(this.GET_BY_ID_USE_CASE);
  }
}
