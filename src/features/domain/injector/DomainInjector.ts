import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { DomainRemoteDataSource } from '../data/datasources';
import { DomainRepositoryImpl } from '../data/repositories';
import { DomainRepository } from '../domain/repositories';
import { GetAllDomains, GetDomainById } from '../domain/usecases';

/**
 * Dependency injection setup for Domain feature
 */
export class DomainInjector {
  private static readonly REMOTE_DATA_SOURCE = 'DomainRemoteDataSource';
  private static readonly REPOSITORY = 'DomainRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllDomains';
  private static readonly GET_BY_ID_USE_CASE = 'GetDomainById';

  /**
   * Registers all domain dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new DomainRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const dataSource = injector.resolve<DomainRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new DomainRepositoryImpl(dataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<DomainRepository>(this.REPOSITORY);
      return new GetAllDomains(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<DomainRepository>(this.REPOSITORY);
      return new GetDomainById(repository);
    });
  }

  /**
   * Resolves GetAllDomains use case
   */
  static getAllDomainsUseCase(injector: Injector): GetAllDomains {
    return injector.resolve<GetAllDomains>(this.GET_ALL_USE_CASE);
  }

  /**
   * Resolves GetDomainById use case
   */
  static getDomainByIdUseCase(injector: Injector): GetDomainById {
    return injector.resolve<GetDomainById>(this.GET_BY_ID_USE_CASE);
  }
}
