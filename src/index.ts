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

// Feature exports
export { Domain, DomainRepository, GetAllDomains, GetDomainById } from './features/domain';
export {
  Publication,
  RelatedPublication,
  PublicationRepository,
  GetAllPublications,
  GetPublicationById,
} from './features/publication';
export {
  Infographic,
  InfographicRepository,
  GetAllInfographics,
  GetInfographicById,
} from './features/infographic';
export { News, NewsRepository, GetAllNews, GetNewsById } from './features/news';
export {
  NewsCategory,
  NewsCategoryRepository,
  GetAllNewsCategories,
  GetNewsCategoryById,
} from './features/news-category';
export {
  PressRelease,
  PressReleaseRepository,
  GetAllPressReleases,
  GetPressReleaseById,
} from './features/press-release';
export {
  StaticTable,
  StaticTableRepository,
  GetAllStaticTables,
  GetStaticTableById,
} from './features/static-table';
export { Subject, SubjectRepository, GetAllSubjects, GetSubjectById } from './features/subject';
export {
  SubjectCategory,
  SubjectCategoryRepository,
  GetAllSubjectCategories,
  GetSubjectCategoryById,
} from './features/subject-category';
export {
  StrategicIndicator,
  StrategicIndicatorRepository,
  GetAllStrategicIndicators,
  GetStrategicIndicatorById,
} from './features/strategic-indicator';
export {
  Variable,
  VariableRepository,
  GetAllVariables,
  GetVariableById,
} from './features/variable';
export {
  VerticalVariable,
  VerticalVariableRepository,
  GetAllVerticalVariables,
  GetVerticalVariableById,
} from './features/vertical-variable';
export { Unit, UnitRepository, GetAllUnits, GetUnitById } from './features/unit';
export { Period, PeriodRepository, GetAllPeriods, GetPeriodById } from './features/period';
export {
  DerivedPeriod,
  DerivedPeriodRepository,
  GetAllDerivedPeriods,
  GetDerivedPeriodById,
} from './features/derived-period';
export {
  DerivedVariable,
  DerivedVariableRepository,
  GetAllDerivedVariables,
  GetDerivedVariableById,
} from './features/derived-variable';
export {
  StatisticClassification,
  StatisticClassificationRepository,
  GetAllStatisticClassifications,
  GetStatisticClassificationById,
} from './features/statistic-classification';
export { Census, CensusRepository, GetAllCensuses, GetCensusById } from './features/census';

// TODO: Export other features when implemented
// ... etc
