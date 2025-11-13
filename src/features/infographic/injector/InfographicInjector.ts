import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { InfographicRemoteDataSource } from '../data/datasources';
import { InfographicRepositoryImpl } from '../data/repositories';
import { InfographicRepository } from '../domain/repositories';
import { GetAllInfographics, GetInfographicById } from '../domain/usecases';

/**
 * Dependency injection setup for Infographic feature
 */
export class InfographicInjector {
  private static readonly REMOTE_DATA_SOURCE = 'InfographicRemoteDataSource';
  private static readonly REPOSITORY = 'InfographicRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllInfographics';
  private static readonly GET_BY_ID_USE_CASE = 'GetInfographicById';

  /**
   * Registers all infographic dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new InfographicRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const dataSource = injector.resolve<InfographicRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new InfographicRepositoryImpl(dataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<InfographicRepository>(this.REPOSITORY);
      return new GetAllInfographics(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<InfographicRepository>(this.REPOSITORY);
      return new GetInfographicById(repository);
    });
  }

  /**
   * Resolves GetAllInfographics use case
   */
  static getAllInfographicsUseCase(injector: Injector): GetAllInfographics {
    return injector.resolve<GetAllInfographics>(this.GET_ALL_USE_CASE);
  }

  /**
   * Resolves GetInfographicById use case
   */
  static getInfographicByIdUseCase(injector: Injector): GetInfographicById {
    return injector.resolve<GetInfographicById>(this.GET_BY_ID_USE_CASE);
  }
}
