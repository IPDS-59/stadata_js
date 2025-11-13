import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';
import { ListResult } from '../shared/domain/entities';
import {
  DomainListParams,
  PublicationListParams,
  // TODO: Uncomment when implemented
  // InfographicListParams,
  // StaticTableListParams,
  // NewsListParams,
  // NewsCategoryListParams,
  // PressReleaseListParams,
  // SubjectListParams,
  // SubjectCategoryListParams,
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

  // TODO: Add methods for other features
  // infographics(params?: InfographicListParams): Promise<Result<ListResult<Infographic>, ApiFailure>>;
  // staticTables(params?: StaticTableListParams): Promise<Result<ListResult<StaticTable>, ApiFailure>>;
  // news(params?: NewsListParams): Promise<Result<ListResult<News>, ApiFailure>>;
  // newsCategories(params?: NewsCategoryListParams): Promise<Result<ListResult<NewsCategory>, ApiFailure>>;
  // pressReleases(params?: PressReleaseListParams): Promise<Result<ListResult<PressRelease>, ApiFailure>>;
  // subjects(params?: SubjectListParams): Promise<Result<ListResult<Subject>, ApiFailure>>;
  // subjectCategories(params?: SubjectCategoryListParams): Promise<Result<ListResult<SubjectCategory>, ApiFailure>>;
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
