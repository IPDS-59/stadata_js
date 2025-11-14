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
  PeriodListParams,
  DerivedPeriodListParams,
  DerivedVariableListParams,
  StatisticClassificationListParams,
  DynamicTableParams,
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
import { Period } from '../features/period';
import { DerivedPeriod } from '../features/derived-period';
import { DerivedVariable } from '../features/derived-variable';
import { StatisticClassification } from '../features/statistic-classification';
import {
  CensusEvent,
  CensusTopic,
  CensusArea,
  CensusDataset,
  CensusData,
} from '../features/census';
import { DynamicTable } from '../features/dynamic-table';

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

  /**
   * Gets all periods
   */
  periods(params: PeriodListParams): Promise<Result<ListResult<Period>, ApiFailure>>;

  /**
   * Gets all derived periods
   */
  derivedPeriods(
    params: DerivedPeriodListParams
  ): Promise<Result<ListResult<DerivedPeriod>, ApiFailure>>;

  /**
   * Gets all derived variables
   */
  derivedVariables(
    params: DerivedVariableListParams
  ): Promise<Result<ListResult<DerivedVariable>, ApiFailure>>;

  /**
   * Gets all statistic classifications
   */
  statisticClassifications(
    params?: StatisticClassificationListParams
  ): Promise<Result<ListResult<StatisticClassification>, ApiFailure>>;

  /**
   * Gets all census events
   */
  censusEvents(): Promise<Result<ListResult<CensusEvent>, ApiFailure>>;

  /**
   * Gets census topics for a specific census
   */
  censusTopics(params: { censusId: string }): Promise<Result<ListResult<CensusTopic>, ApiFailure>>;

  /**
   * Gets census areas for a specific census
   */
  censusEventAreas(params: { censusId: string }): Promise<Result<ListResult<CensusArea>, ApiFailure>>;

  /**
   * Gets census datasets for a specific census and topic
   */
  censusEventDatasets(params: {
    censusId: string;
    topicId: number;
  }): Promise<Result<ListResult<CensusDataset>, ApiFailure>>;

  /**
   * Gets census data for a specific census, area, and dataset
   */
  censusData(params: {
    censusId: string;
    censusAreaId: string;
    datasetId: string;
  }): Promise<Result<ListResult<CensusData>, ApiFailure>>;

  /**
   * Gets all dynamic tables
   */
  dynamicTables(params: DynamicTableParams): Promise<Result<ListResult<DynamicTable>, ApiFailure>>;
}
