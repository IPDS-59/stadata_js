import { Injector } from '../../../core/di';
import { NetworkClient } from '../../../core/network';
import { TradeRemoteDataSource } from '../data/datasources';
import { TradeRepositoryImpl } from '../data/repositories';
import { GetTrade } from '../domain/usecases';

/**
 * Dependency injector for Trade feature
 */
export class TradeInjector {
  private static readonly REMOTE_DATA_SOURCE = 'TradeRemoteDataSource';
  private static readonly REPOSITORY = 'TradeRepository';
  private static readonly GET_TRADE_USE_CASE = 'GetTrade';

  /**
   * Registers all Trade dependencies
   */
  static register(injector: Injector, networkClient: NetworkClient): void {
    // Register remote data source
    injector.registerFactory(this.REMOTE_DATA_SOURCE, () => {
      return new TradeRemoteDataSource(networkClient);
    });

    // Register repository
    injector.registerFactory(this.REPOSITORY, () => {
      const remoteDataSource = injector.resolve<TradeRemoteDataSource>(this.REMOTE_DATA_SOURCE);
      return new TradeRepositoryImpl(remoteDataSource);
    });

    // Register use case
    injector.registerFactory(this.GET_TRADE_USE_CASE, () => {
      const repository = injector.resolve<TradeRepositoryImpl>(this.REPOSITORY);
      return new GetTrade(repository);
    });
  }

  /**
   * Gets the GetTrade use case
   */
  static getTradeUseCase(injector: Injector): GetTrade {
    return injector.resolve<GetTrade>(this.GET_TRADE_USE_CASE);
  }
}
