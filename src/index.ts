/**
 * Stadata JS SDK
 * Official TypeScript/JavaScript SDK for BPS Stadata API
 *
 * @packageDocumentation
 */

// Main SDK export
export { StadataJS, StadataJSConfig } from './StadataJS';

// API interfaces
export { StadataList, StadataView } from './api';

// Core exports
export {
  // Base classes
  BaseEntity,
  UseCase,
  NoParamsUseCase,

  // Dependency Injection
  Injector,

  // Network
  NetworkClient,
  NetworkInterceptor,
  AuthInterceptor,
  LoggingInterceptor,
  RetryInterceptor,
  NetworkClientConfig,
  RequestOptions,

  // Exceptions
  StadataException,
  ApiException,
  CancelledException,
  NetworkException,
  TimeoutException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  ServerException,

  // Failures
  Failure,
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

  // Logger
  Logger,
  LogLevel,
  LogEntry,
  LogPrinter,
  LogFilter,
  ConsoleLogPrinter,
  ProductionLogFilter,

  // Utils
  CancelToken,
  DateHelper,

  // Constants
  ApiConstant,
  ApiEndpoint,
  QueryParamConstant,
} from './core';

// Shared exports
export {
  // Entities
  ApiResponse,
  ListResult,
  Pagination,

  // Enums
  DataLanguage,
  DataAvailability,
} from './shared';

// Type exports
export * from './types';

// Feature exports (Domain as example)
export { Domain, DomainRepository, GetAllDomains, GetDomainById } from './features/domain';

// TODO: Export other features when implemented
// export { Publication, PublicationRepository, ... } from './features/publication';
// export { Infographic, InfographicRepository, ... } from './features/infographic';
// ... etc
