import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';
import { ListResult } from '../shared/domain/entities';
import {
  DomainListParams,
  PublicationListParams,
  InfographicListParams,
  NewsListParams,
  NewsCategoryListParams,
  PressReleaseListParams,
  StaticTableListParams,
  SubjectListParams,
  SubjectCategoryListParams,
  // TODO: Uncomment when implemented
  // StrategicIndicatorListParams,
  // VariableListParams,
  // VerticalVariableListParams,
  // UnitListParams,
  // PeriodListParams,
  // DerivedPeriodListParams,
  // DerivedVariableListParams,
  // DynamicTableParams,
  // StatisticClassificationListParams,
  // CensusListParams,
} from '../types';

// Import entities (these will be created for each feature)
import { Domain } from '../features/domain';
import { Publication } from '../features/publication';
import { Infographic } from '../features/infographic';
import { News } from '../features/news';
import { NewsCategory } from '../features/news-category';
import { PressRelease } from '../features/press-release';
import { StaticTable } from '../features/static-table';
import { Subject } from '../features/subject';
import { SubjectCategory } from '../features/subject-category';

/**
 * Interface for list API operations
 * Provides access to all list endpoints
 */
export interface StadataList {
  /**
   * Gets all domains
   */
  domains(params?: DomainListParams): Promise<Result<ListResult<Domain>, ApiFailure>>;

  /**
   * Gets all publications
   */
  publications(params: PublicationListParams): Promise<Result<ListResult<Publication>, ApiFailure>>;

  /**
   * Gets all infographics
   */
  infographics(params: InfographicListParams): Promise<Result<ListResult<Infographic>, ApiFailure>>;

  /**
   * Gets all news
   */
  news(params: NewsListParams): Promise<Result<ListResult<News>, ApiFailure>>;

  /**
   * Gets all news categories
   */
  newsCategories(
    params?: NewsCategoryListParams
  ): Promise<Result<ListResult<NewsCategory>, ApiFailure>>;

  /**
   * Gets all press releases
   */
  pressReleases(
    params: PressReleaseListParams
  ): Promise<Result<ListResult<PressRelease>, ApiFailure>>;

  /**
   * Gets all static tables
   */
  staticTables(params: StaticTableListParams): Promise<Result<ListResult<StaticTable>, ApiFailure>>;

  /**
   * Gets all subjects
   */
  subjects(params?: SubjectListParams): Promise<Result<ListResult<Subject>, ApiFailure>>;

  /**
   * Gets all subject categories
   */
  subjectCategories(
    params?: SubjectCategoryListParams
  ): Promise<Result<ListResult<SubjectCategory>, ApiFailure>>;

  // TODO: Add methods for other features
  // strategicIndicators(params?: StrategicIndicatorListParams): Promise<Result<ListResult<StrategicIndicator>, ApiFailure>>;
  // variables(params?: VariableListParams): Promise<Result<ListResult<Variable>, ApiFailure>>;
  // verticalVariables(params?: VerticalVariableListParams): Promise<Result<ListResult<VerticalVariable>, ApiFailure>>;
  // units(params?: UnitListParams): Promise<Result<ListResult<Unit>, ApiFailure>>;
  // periods(params?: PeriodListParams): Promise<Result<ListResult<Period>, ApiFailure>>;
  // derivedPeriods(params?: DerivedPeriodListParams): Promise<Result<ListResult<DerivedPeriod>, ApiFailure>>;
  // derivedVariables(params?: DerivedVariableListParams): Promise<Result<ListResult<DerivedVariable>, ApiFailure>>;
  // dynamicTable(params: DynamicTableParams): Promise<Result<unknown, ApiFailure>>;
  // statisticClassifications(params?: StatisticClassificationListParams): Promise<Result<ListResult<StatisticClassification>, ApiFailure>>;
  // censuses(params?: CensusListParams): Promise<Result<ListResult<Census>, ApiFailure>>;
}
