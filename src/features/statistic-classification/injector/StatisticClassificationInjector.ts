import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { StatisticClassificationRemoteDataSource } from '../data/datasources';
import { StatisticClassificationRepositoryImpl } from '../data/repositories';
import { GetAllStatisticClassifications, GetStatisticClassificationById } from '../domain/usecases';

/**
 * Dependency injector for StatisticClassification feature
 */
export class StatisticClassificationInjector {
  private static readonly REMOTE_DATA_SOURCE = 'StatisticClassificationRemoteDataSource';
  private static readonly REPOSITORY = 'StatisticClassificationRepository';
  private static readonly GET_ALL_USE_CASE = 'GetAllStatisticClassifications';
  private static readonly GET_BY_ID_USE_CASE = 'GetStatisticClassificationById';

  /**
   * Registers all StatisticClassification dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(
      this.REMOTE_DATA_SOURCE,
      () => new StatisticClassificationRemoteDataSource(networkClient)
    );

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<StatisticClassificationRemoteDataSource>(
        this.REMOTE_DATA_SOURCE
      );
      return new StatisticClassificationRepositoryImpl(remoteDataSource);
    });

    // Register use cases
    injector.registerFactory(this.GET_ALL_USE_CASE, () => {
      const repository = injector.resolve<StatisticClassificationRepositoryImpl>(this.REPOSITORY);
      return new GetAllStatisticClassifications(repository);
    });

    injector.registerFactory(this.GET_BY_ID_USE_CASE, () => {
      const repository = injector.resolve<StatisticClassificationRepositoryImpl>(this.REPOSITORY);
      return new GetStatisticClassificationById(repository);
    });
  }

  /**
   * Gets the GetAllStatisticClassifications use case
   */
  static getAllStatisticClassificationsUseCase(injector: Injector): GetAllStatisticClassifications {
    return injector.resolve<GetAllStatisticClassifications>(this.GET_ALL_USE_CASE);
  }

  /**
   * Gets the GetStatisticClassificationById use case
   */
  static getStatisticClassificationByIdUseCase(injector: Injector): GetStatisticClassificationById {
    return injector.resolve<GetStatisticClassificationById>(this.GET_BY_ID_USE_CASE);
  }
}
