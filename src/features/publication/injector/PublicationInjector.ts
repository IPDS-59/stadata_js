import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { PublicationRemoteDataSource } from '../data/datasources';
import { PublicationRepositoryImpl } from '../data/repositories';
import { PublicationRepository } from '../domain/repositories';
import { GetAllPublications, GetPublicationById } from '../domain/usecases';

/**
 * Dependency injection setup for Publication feature
 */
export class PublicationInjector {
  private static readonly REMOTE_DATA_SOURCE = 'PublicationRemoteDataSource';
  private static readonly REPOSITORY = 'PublicationRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllPublications';
  private static readonly GET_BY_ID_USE_CASE = 'GetPublicationById';

  /**
   * Registers all publication dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new PublicationRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const dataSource = injector.resolve<PublicationRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new PublicationRepositoryImpl(dataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<PublicationRepository>(this.REPOSITORY);
      return new GetAllPublications(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<PublicationRepository>(this.REPOSITORY);
      return new GetPublicationById(repository);
    });
  }

  /**
   * Resolves GetAllPublications use case
   */
  static getAllPublicationsUseCase(injector: Injector): GetAllPublications {
    return injector.resolve<GetAllPublications>(this.GET_ALL_USE_CASE);
  }

  /**
   * Resolves GetPublicationById use case
   */
  static getPublicationByIdUseCase(injector: Injector): GetPublicationById {
    return injector.resolve<GetPublicationById>(this.GET_BY_ID_USE_CASE);
  }
}
