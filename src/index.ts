/**
 * Stadata JS SDK v2
 * Official TypeScript/JavaScript SDK for BPS Stadata API
 *
 * @packageDocumentation
 *
 * @example
 * ```typescript
 * import { createStadataClient, usePublications, useDomains, DataLanguage, DomainType } from 'stadata-js'
 *
 * const client = createStadataClient({ apiKey: 'your-api-key' })
 *
 * const { fetchDomainList } = useDomains(client)
 * const { fetchPublicationList, fetchPublicationDetail } = usePublications(client)
 *
 * const result = await fetchPublicationList({ domain: '7200', lang: DataLanguage.ID, page: 1, perPage: 10 })
 * result.match(
 *   ({ data, pagination }) => console.log(data),
 *   (err) => console.error(err.message)
 * )
 * ```
 */

// ============================================================
// v2 API — createStadataClient + composables (recommended)
// ============================================================
export { createStadataClient } from './client';
export type { StadataClient, StadataClientConfig } from './client';

export * from './composables';

// ============================================================
// Legacy v1 API — @deprecated, will be removed in v3
// ============================================================
/** @deprecated Use createStadataClient() instead */
export { StadataJS } from './StadataJS';
export type { StadataJSConfig } from './StadataJS';

// ============================================================
// Core exports
// ============================================================
export {
  NetworkClient,
  NetworkInterceptor,
  NetworkClientConfig,
  RequestOptions,

  ApiFailure,
  CancelledFailure,
  NetworkFailure,
  TimeoutFailure,
  NotFoundFailure,
  UnauthorizedFailure,
  ForbiddenFailure,
  ServerFailure,
  ParseFailure,
  ValidationFailure,

  LogLevel,
  CancelToken,
  ApiConstant,
  ApiEndpoint,
} from './core';

// ============================================================
// Shared exports
// ============================================================
export {
  ListResult,
  Pagination,
  DataLanguage,
  DataAvailability,
  ClassificationType,
  KBLILevel,
  KBKILevel,
  DomainType,
} from './shared';

// ============================================================
// Type exports
// ============================================================
export * from './types';

// ============================================================
// Entity exports
// ============================================================
export { Domain } from './features/domain';
export { Publication, RelatedPublication } from './features/publication';
export { Infographic } from './features/infographic';
export { News } from './features/news';
export { NewsCategory } from './features/news-category';
export { PressRelease } from './features/press-release';
export { StaticTable } from './features/static-table';
export { Subject } from './features/subject';
export { SubjectCategory } from './features/subject-category';
export { StrategicIndicator } from './features/strategic-indicator';
export { Variable } from './features/variable';
export { VerticalVariable } from './features/vertical-variable';
export { Unit } from './features/unit';
export { Period } from './features/period';
export { DerivedPeriod } from './features/derived-period';
export { DerivedVariable } from './features/derived-variable';
export { StatisticClassification } from './features/statistic-classification';
export { CensusEvent, CensusTopic, CensusArea, CensusDataset, CensusData, CensusCategory } from './features/census';
export { DynamicTable } from './features/dynamic-table';
export { Trade } from './features/trade';
