import { Injector } from './core/di';
import { NetworkClient, NetworkInterceptor, AuthInterceptor } from './core/network';
import { ApiConstant } from './core/constants';
import { ApiConfig } from './config';
import { StadataList, StadataView, StadataListImpl, StadataViewImpl } from './api';
import { DomainInjector } from './features/domain';
import { PublicationInjector } from './features/publication';
import { InfographicInjector } from './features/infographic';
import { NewsInjector } from './features/news';
import { PressReleaseInjector } from './features/press-release';
import { StaticTableInjector } from './features/static-table';
import { Logger, LogLevel, ProductionLogFilter } from './core/log';

/**
 * Configuration options for StadataJS
 */
export interface StadataJSConfig {
  /**
   * API key for authentication
   */
  apiKey: string;

  /**
   * Base URL for API (optional, defaults to BPS API)
   */
  baseURL?: string;

  /**
   * Request timeout in milliseconds (optional, defaults to 30000)
   */
  timeout?: number;

  /**
   * Additional network interceptors (optional)
   */
  interceptors?: NetworkInterceptor[];

  /**
   * Enable debug logging (optional, defaults to false)
   */
  debug?: boolean;

  /**
   * Minimum log level (optional, defaults to INFO)
   */
  logLevel?: LogLevel;
}

/**
 * Main SDK class for Stadata API
 * Provides a singleton instance with configured API clients
 *
 * @example
 * ```typescript
 * // Initialize the SDK
 * await StadataJS.init({ apiKey: 'your-api-key' });
 *
 * // Get the instance
 * const stadata = StadataJS.instance;
 *
 * // Use list API
 * const domainsResult = await stadata.list.domains();
 *
 * // Use view API
 * const domainResult = await stadata.view.domain({ id: '7200', domain: '7200' });
 * ```
 */
export class StadataJS {
  private static _instance: StadataJS | null = null;
  private _list: StadataList;
  private _view: StadataView;
  private injector: Injector;
  private networkClient: NetworkClient;
  private authInterceptor: AuthInterceptor;
  private logger: Logger;

  private constructor(config: StadataJSConfig) {
    // Configure logger
    this.logger = Logger.getInstance();
    this.logger.configure({
      enabled: config.debug ?? false,
      filter: new ProductionLogFilter(config.logLevel ?? LogLevel.INFO),
    });

    // Store API key
    ApiConfig.getInstance().setApiKey(config.apiKey);

    // Create auth interceptor
    this.authInterceptor = new AuthInterceptor(config.apiKey);

    // Create network client
    const interceptors = [this.authInterceptor, ...(config.interceptors || [])];
    this.networkClient = new NetworkClient({
      baseURL: config.baseURL || ApiConstant.BASE_URL,
      timeout: config.timeout || ApiConstant.DEFAULT_TIMEOUT,
      interceptors,
    });

    // Setup dependency injection
    this.injector = Injector.getInstance();
    this.setupDependencies();

    // Create API implementations
    this._list = new StadataListImpl(this.injector);
    this._view = new StadataViewImpl(this.injector);

    this.logger.info('StadataJS initialized successfully');
  }

  /**
   * Gets the singleton instance
   * @throws Error if SDK is not initialized
   */
  static get instance(): StadataJS {
    if (!StadataJS._instance) {
      throw new Error('StadataJS not initialized. Call StadataJS.init() first.');
    }
    return StadataJS._instance;
  }

  /**
   * Initializes the SDK
   * @param config - Configuration options
   * @returns The SDK instance
   */
  static init(config: StadataJSConfig): StadataJS {
    if (StadataJS._instance) {
      StadataJS._instance.logger.warn('StadataJS already initialized. Reinitializing...');
    }

    StadataJS._instance = new StadataJS(config);
    return StadataJS._instance;
  }

  /**
   * Checks if SDK is initialized
   */
  static isInitialized(): boolean {
    return StadataJS._instance !== null;
  }

  /**
   * Destroys the SDK instance
   */
  static destroy(): void {
    if (StadataJS._instance) {
      StadataJS._instance.cleanup();
      StadataJS._instance = null;
    }
  }

  /**
   * Gets the list API
   */
  get list(): StadataList {
    return this._list;
  }

  /**
   * Gets the view API
   */
  get view(): StadataView {
    return this._view;
  }

  /**
   * Updates the API key
   */
  setApiKey(apiKey: string): void {
    ApiConfig.getInstance().setApiKey(apiKey);
    this.authInterceptor.setApiKey(apiKey);
    this.logger.info('API key updated');
  }

  /**
   * Adds a network interceptor
   */
  addInterceptor(interceptor: NetworkInterceptor): void {
    this.networkClient.addInterceptor(interceptor);
    this.logger.debug('Interceptor added');
  }

  /**
   * Removes a network interceptor
   */
  removeInterceptor(interceptor: NetworkInterceptor): void {
    this.networkClient.removeInterceptor(interceptor);
    this.logger.debug('Interceptor removed');
  }

  /**
   * Enables debug logging
   */
  enableDebug(): void {
    this.logger.enable();
    this.logger.configure({
      filter: new ProductionLogFilter(LogLevel.DEBUG),
    });
  }

  /**
   * Disables debug logging
   */
  disableDebug(): void {
    this.logger.configure({
      filter: new ProductionLogFilter(LogLevel.INFO),
    });
  }

  /**
   * Sets up all feature dependencies
   */
  private setupDependencies(): void {
    // Register domain feature
    DomainInjector.register(this.injector, this.networkClient);

    // Register publication feature
    PublicationInjector.register(this.injector, this.networkClient);

    // Register infographic feature
    InfographicInjector.register(this.injector, this.networkClient);

    // Register news feature
    NewsInjector.register(this.injector, this.networkClient);

    // Register press release feature
    PressReleaseInjector.register(this.injector, this.networkClient);

    // Register static table feature
    StaticTableInjector.register(this.injector, this.networkClient);

    // TODO: Register other features
    // ... etc
  }

  /**
   * Cleanup resources
   */
  private cleanup(): void {
    this.injector.clear();
    ApiConfig.getInstance().clearApiKey();
    this.logger.info('StadataJS cleaned up');
  }
}
