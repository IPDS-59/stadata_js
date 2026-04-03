import { NetworkClient, NetworkInterceptor } from './core/network';
import { AuthInterceptor } from './core/network/interceptors/AuthInterceptor';
import { ApiConstant } from './core/constants';
import { LogLevel } from './core/log';

/**
 * Configuration for createStadataClient
 */
export interface StadataClientConfig {
  /** API key from BPS WebAPI platform */
  apiKey: string;
  /** Custom base URL (optional, defaults to BPS API) */
  baseURL?: string;
  /** Request timeout in milliseconds (optional, defaults to 30000) */
  timeout?: number;
  /** Additional network interceptors (optional) */
  interceptors?: NetworkInterceptor[];
  /** Enable debug logging (optional, defaults to false) */
  debug?: boolean;
  /** Minimum log level (optional) */
  logLevel?: LogLevel;
}

/**
 * Stadata client instance returned by createStadataClient
 */
export interface StadataClient {
  readonly networkClient: NetworkClient;
  readonly config: StadataClientConfig;
}

/**
 * Creates a configured Stadata client for BPS WebAPI.
 *
 * @example
 * ```typescript
 * const client = createStadataClient({ apiKey: 'your-api-key' })
 * const { fetchPublicationList } = usePublications(client)
 * ```
 */
export function createStadataClient(config: StadataClientConfig): StadataClient {
  const authInterceptor = new AuthInterceptor(config.apiKey);

  const networkClient = new NetworkClient({
    baseURL: config.baseURL ?? ApiConstant.BASE_URL,
    timeout: config.timeout ?? 30000,
    interceptors: [authInterceptor, ...(config.interceptors ?? [])],
  });

  return { networkClient, config };
}
