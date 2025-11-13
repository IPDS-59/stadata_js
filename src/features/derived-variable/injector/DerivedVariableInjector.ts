import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { DerivedVariableRemoteDataSource } from '../data/datasources';
import { DerivedVariableRepositoryImpl } from '../data/repositories';
import { GetAllDerivedVariables, GetDerivedVariableById } from '../domain/usecases';

/**
 * Dependency injector for DerivedVariable feature
 */
export class DerivedVariableInjector {
  private static readonly REMOTE_DATA_SOURCE = 'DerivedVariableRemoteDataSource';
  private static readonly REPOSITORY = 'DerivedVariableRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllDerivedVariables';
  private static readonly GET_BY_ID_USE_CASE = 'GetDerivedVariableById';

  /**
   * Registers all DerivedVariable dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new DerivedVariableRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<DerivedVariableRemoteDataSource>(
        this.REMOTE_DATA_SOURCE
      );
      return new DerivedVariableRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<DerivedVariableRepositoryImpl>(this.REPOSITORY);
      return new GetAllDerivedVariables(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<DerivedVariableRepositoryImpl>(this.REPOSITORY);
      return new GetDerivedVariableById(repository);
    });
  }

  /**
   * Gets the GetAllDerivedVariables use case
   */
  static getAllDerivedVariablesUseCase(injector: Injector): GetAllDerivedVariables {
    return injector.resolve<GetAllDerivedVariables>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetDerivedVariableById use case
   */
  static getDerivedVariableByIdUseCase(injector: Injector): GetDerivedVariableById {
    return injector.resolve<GetDerivedVariableById>(this.GET_BY_ID_USE_CASE);
  }
}
