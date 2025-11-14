import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { VerticalVariableRemoteDataSource } from '../data/datasources';
import { VerticalVariableRepositoryImpl } from '../data/repositories';
import { GetAllVerticalVariables, GetVerticalVariableById } from '../domain/usecases';

/**
 * Dependency injector for VerticalVariable feature
 */
export class VerticalVariableInjector {
  private static readonly REMOTE_DATA_SOURCE = 'VerticalVariableRemoteDataSource';
  private static readonly REPOSITORY = 'VerticalVariableRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllVerticalVariables';
  private static readonly GET_BY_ID_USE_CASE = 'GetVerticalVariableById';

  /**
   * Registers all VerticalVariable dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new VerticalVariableRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<VerticalVariableRemoteDataSource>(
        this.REMOTE_DATA_SOURCE
      );
      return new VerticalVariableRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<VerticalVariableRepositoryImpl>(this.REPOSITORY);
      return new GetAllVerticalVariables(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<VerticalVariableRepositoryImpl>(this.REPOSITORY);
      return new GetVerticalVariableById(repository);
    });
  }

  /**
   * Gets the GetAllVerticalVariables use case
   */
  static getAllVerticalVariablesUseCase(injector: Injector): GetAllVerticalVariables {
    return injector.resolve<GetAllVerticalVariables>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetVerticalVariableById use case
   */
  static getVerticalVariableByIdUseCase(injector: Injector): GetVerticalVariableById {
    return injector.resolve<GetVerticalVariableById>(this.GET_BY_ID_USE_CASE);
  }
}
