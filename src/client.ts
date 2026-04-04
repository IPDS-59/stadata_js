import { NetworkClient, NetworkInterceptor } from './core/network';
import { AuthInterceptor } from './core/network/interceptors/AuthInterceptor';
import { ApiConstant } from './core/constants';
import { LogLevel } from './core/log';

// Import all composable factories
import { useDomains } from './composables/useDomains';
import { usePublications } from './composables/usePublications';
import { usePressReleases } from './composables/usePressReleases';
import { useStaticTables } from './composables/useStaticTables';
import { useDynamicTables } from './composables/useDynamicTables';
import { useInfographics } from './composables/useInfographics';
import { useNews } from './composables/useNews';
import { useNewsCategories } from './composables/useNewsCategories';
import { useVariables } from './composables/useVariables';
import { useVerticalVariables } from './composables/useVerticalVariables';
import { useDerivedVariables } from './composables/useDerivedVariables';
import { useSubjects } from './composables/useSubjects';
import { useSubjectCategories } from './composables/useSubjectCategories';
import { useUnits } from './composables/useUnits';
import { usePeriods } from './composables/usePeriods';
import { useDerivedPeriods } from './composables/useDerivedPeriods';
import { useStrategicIndicators } from './composables/useStrategicIndicators';
import { useStatisticClassifications } from './composables/useStatisticClassifications';
import { useCensus } from './composables/useCensus';
import { useTrade } from './composables/useTrade';

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

/** Internal client reference passed to composables */
export interface StadataClient {
  readonly networkClient: NetworkClient;
  readonly config: StadataClientConfig;
}

/**
 * Stadata client returned by createStadataClient.
 * All composables are pre-bound — no need to pass client manually.
 *
 * @example
 * ```typescript
 * const stadata = createStadataClient({ apiKey: 'your-api-key' })
 *
 * const { fetchPublicationList, fetchPublicationDetail } = stadata.usePublications()
 * const { fetchDomainList } = stadata.useDomains()
 * const { fetchNewsList } = stadata.useNews()
 * ```
 */
export interface StadataClientInstance extends StadataClient {
  useDomains: () => ReturnType<typeof useDomains>;
  usePublications: () => ReturnType<typeof usePublications>;
  usePressReleases: () => ReturnType<typeof usePressReleases>;
  useStaticTables: () => ReturnType<typeof useStaticTables>;
  useDynamicTables: () => ReturnType<typeof useDynamicTables>;
  useInfographics: () => ReturnType<typeof useInfographics>;
  useNews: () => ReturnType<typeof useNews>;
  useNewsCategories: () => ReturnType<typeof useNewsCategories>;
  useVariables: () => ReturnType<typeof useVariables>;
  useVerticalVariables: () => ReturnType<typeof useVerticalVariables>;
  useDerivedVariables: () => ReturnType<typeof useDerivedVariables>;
  useSubjects: () => ReturnType<typeof useSubjects>;
  useSubjectCategories: () => ReturnType<typeof useSubjectCategories>;
  useUnits: () => ReturnType<typeof useUnits>;
  usePeriods: () => ReturnType<typeof usePeriods>;
  useDerivedPeriods: () => ReturnType<typeof useDerivedPeriods>;
  useStrategicIndicators: () => ReturnType<typeof useStrategicIndicators>;
  useStatisticClassifications: () => ReturnType<typeof useStatisticClassifications>;
  useCensus: () => ReturnType<typeof useCensus>;
  useTrade: () => ReturnType<typeof useTrade>;
}

/**
 * Creates a configured Stadata client with all composables pre-bound.
 *
 * @example
 * ```typescript
 * import { createStadataClient, DataLanguage, DomainType } from 'stadata-js'
 *
 * // Create once
 * const stadata = createStadataClient({ apiKey: 'your-api-key' })
 *
 * // Use composables — no need to pass client
 * const { fetchPublicationList, fetchPublicationDetail } = stadata.usePublications()
 * const { fetchDomainList } = stadata.useDomains()
 * const { fetchNewsList, fetchNewsDetail } = stadata.useNews()
 *
 * const result = await fetchPublicationList({ domain: '7200', lang: DataLanguage.ID, page: 1, perPage: 10 })
 * result.match(
 *   ({ data, pagination }) => console.log(data),
 *   (err) => console.error(err.message)
 * )
 * ```
 */
export function createStadataClient(config: StadataClientConfig): StadataClientInstance {
  const authInterceptor = new AuthInterceptor(config.apiKey);

  const networkClient = new NetworkClient({
    baseURL: config.baseURL ?? ApiConstant.BASE_URL,
    timeout: config.timeout ?? ApiConstant.DEFAULT_TIMEOUT,
    interceptors: [authInterceptor, ...(config.interceptors ?? [])],
  });

  const client: StadataClient = { networkClient, config };

  return {
    ...client,
    useDomains: () => useDomains(client),
    usePublications: () => usePublications(client),
    usePressReleases: () => usePressReleases(client),
    useStaticTables: () => useStaticTables(client),
    useDynamicTables: () => useDynamicTables(client),
    useInfographics: () => useInfographics(client),
    useNews: () => useNews(client),
    useNewsCategories: () => useNewsCategories(client),
    useVariables: () => useVariables(client),
    useVerticalVariables: () => useVerticalVariables(client),
    useDerivedVariables: () => useDerivedVariables(client),
    useSubjects: () => useSubjects(client),
    useSubjectCategories: () => useSubjectCategories(client),
    useUnits: () => useUnits(client),
    usePeriods: () => usePeriods(client),
    useDerivedPeriods: () => useDerivedPeriods(client),
    useStrategicIndicators: () => useStrategicIndicators(client),
    useStatisticClassifications: () => useStatisticClassifications(client),
    useCensus: () => useCensus(client),
    useTrade: () => useTrade(client),
  };
}
