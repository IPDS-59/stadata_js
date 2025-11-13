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
  StrategicIndicatorListParams,
  VariableListParams,
  VerticalVariableListParams,
  UnitListParams,
  // TODO: Uncomment when implemented
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
import { StrategicIndicator } from '../features/strategic-indicator';
import { Variable } from '../features/variable';
import { VerticalVariable } from '../features/vertical-variable';
import { Unit } from '../features/unit';

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

  /**
   * Gets all strategic indicators
   */
  strategicIndicators(
    params?: StrategicIndicatorListParams
  ): Promise<Result<ListResult<StrategicIndicator>, ApiFailure>>;

  /**
   * Gets all variables
   */
  variables(params?: VariableListParams): Promise<Result<ListResult<Variable>, ApiFailure>>;

  /**
   * Gets all vertical variables
   */
  verticalVariables(
    params: VerticalVariableListParams
  ): Promise<Result<ListResult<VerticalVariable>, ApiFailure>>;

  /**
   * Gets all units
   */
  units(params?: UnitListParams): Promise<Result<ListResult<Unit>, ApiFailure>>;

  // TODO: Add methods for other features
  // periods(params?: PeriodListParams): Promise<Result<ListResult<Period>, ApiFailure>>;
  // derivedPeriods(params?: DerivedPeriodListParams): Promise<Result<ListResult<DerivedPeriod>, ApiFailure>>;
  // derivedVariables(params?: DerivedVariableListParams): Promise<Result<ListResult<DerivedVariable>, ApiFailure>>;
  // dynamicTable(params: DynamicTableParams): Promise<Result<unknown, ApiFailure>>;
  // statisticClassifications(params?: StatisticClassificationListParams): Promise<Result<ListResult<StatisticClassification>, ApiFailure>>;
  // censuses(params?: CensusListParams): Promise<Result<ListResult<Census>, ApiFailure>>;
}
