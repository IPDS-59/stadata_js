import { DataLanguage, ClassificationType, ClassificationLevel, DomainType } from '../shared/enums';
import { CancelToken } from '../core/utils';

/**
 * Generic JSON type
 */
export type JSON = Record<string, unknown>;

/**
 * Base parameters for list requests
 */
export interface BaseListParams {
  /**
   * Domain code
   */
  domain?: string;

  /**
   * Language
   */
  lang?: DataLanguage;

  /**
   * Page number (1-based)
   */
  page?: number;

  /**
   * Number of items per page
   */
  perPage?: number;

  /**
   * Cancel token for request cancellation
   */
  cancelToken?: CancelToken;
}

/**
 * Parameters for domain list
 */
export interface DomainListParams extends Omit<BaseListParams, 'domain'> {
  /**
   * Domain type (required)
   */
  type: DomainType;

  /**
   * Province code (required when type is REGENCY_BY_PROVINCE)
   */
  provinceCode?: string;

  /**
   * Keyword search
   */
  keyword?: string;
}

/**
 * Parameters for publication list
 */
export interface PublicationListParams extends BaseListParams {
  /**
   * Keyword search
   */
  keyword?: string;

  /**
   * Month filter
   */
  month?: number;

  /**
   * Year filter
   */
  year?: number;
}

/**
 * Parameters for infographic list
 */
export interface InfographicListParams extends BaseListParams {
  /**
   * Keyword search
   */
  keyword?: string;
}

/**
 * Parameters for static table list
 */
export interface StaticTableListParams extends BaseListParams {
  /**
   * Keyword search
   */
  keyword?: string;

  /**
   * Month filter
   */
  month?: number;

  /**
   * Year filter
   */
  year?: number;
}

/**
 * Parameters for news list
 */
export interface NewsListParams extends BaseListParams {
  /**
   * Keyword search
   */
  keyword?: string;

  /**
   * Month filter
   */
  month?: number;

  /**
   * Year filter
   */
  year?: number;

  /**
   * News category ID
   */
  newsCategoryId?: string;
}

/**
 * Parameters for news category list
 */
export interface NewsCategoryListParams extends BaseListParams {}

/**
 * Parameters for press release list
 */
export interface PressReleaseListParams extends BaseListParams {
  /**
   * Keyword search
   */
  keyword?: string;

  /**
   * Month filter
   */
  month?: number;

  /**
   * Year filter
   */
  year?: number;
}

/**
 * Parameters for subject list
 */
export interface SubjectListParams extends BaseListParams {}

/**
 * Parameters for subject category list
 */
export interface SubjectCategoryListParams extends BaseListParams {}

/**
 * Parameters for strategic indicator list
 */
export interface StrategicIndicatorListParams extends BaseListParams {}

/**
 * Parameters for variable list
 */
export interface VariableListParams extends BaseListParams {
  /**
   * Subject ID
   */
  subjectId?: number;

  /**
   * Show deleted items
   */
  showDeleted?: boolean;
}

/**
 * Parameters for vertical variable list
 */
export interface VerticalVariableListParams extends BaseListParams {
  /**
   * Variable ID (optional)
   */
  variableId?: number;
}

/**
 * Parameters for unit list
 */
export interface UnitListParams extends BaseListParams {}

/**
 * Parameters for period list
 */
export interface PeriodListParams extends BaseListParams {
  /**
   * Variable ID (optional)
   */
  variableId?: number;
}

/**
 * Parameters for derived period list
 */
export interface DerivedPeriodListParams extends BaseListParams {
  /**
   * Variable ID (optional)
   */
  variableId?: number;
}

/**
 * Parameters for derived variable list
 */
export interface DerivedVariableListParams extends BaseListParams {
  /**
   * Variable ID (optional)
   */
  variableId?: number;
}

/**
 * Parameters for dynamic table
 */
export interface DynamicTableParams extends BaseListParams {
  /**
   * Variable ID - required
   */
  variableId: number;

  /**
   * Period ID (th parameter) - required
   * Can be a single value, range (separated by :), or multiple values (separated by ;)
   * Examples: "117", "117:123", "117;123"
   */
  periodId: string;

  /**
   * Derived variable ID (turvar parameter)
   */
  derivedVariableId?: number;

  /**
   * Vertical variable ID (vervar parameter)
   */
  verticalVariableId?: number;

  /**
   * Derived period ID (turth parameter)
   * Can be a single value, range (separated by :), or multiple values (separated by ;)
   * Examples: "117", "117:123", "117;123"
   */
  derivedPeriodId?: string;
}

/**
 * Parameters for statistic classification list
 */
export interface StatisticClassificationListParams extends BaseListParams {
  /**
   * Classification type (defaults to KBLI_2020)
   */
  type?: ClassificationType;

  /**
   * Classification level (optional filter)
   */
  level?: ClassificationLevel;

  /**
   * Keyword search
   */
  keyword?: string;
}

/**
 * Parameters for census list
 */
export interface CensusListParams {
  /**
   * Type of census data to retrieve
   */
  type?: 'events' | 'topics' | 'areas' | 'datasets' | 'data';

  /**
   * Census ID (required for topics, areas, datasets, data)
   */
  censusId?: string;

  /**
   * Topic ID (required for datasets)
   */
  topicId?: number;

  /**
   * Census Area ID (required for data)
   */
  censusAreaId?: string;

  /**
   * Dataset ID (required for data)
   */
  datasetId?: string;

  /**
   * Cancel token for request cancellation
   */
  cancelToken?: CancelToken;
}

/**
 * Parameters for view requests
 */
export interface ViewParams {
  /**
   * Item ID
   */
  id: number | string;

  /**
   * Domain code
   */
  domain: string;

  /**
   * Language
   */
  lang?: DataLanguage;

  /**
   * Cancel token for request cancellation
   */
  cancelToken?: CancelToken;
}

/**
 * Trade source enum
 */
export enum TradeSource {
  Export = 1,
  Import = 2,
}

/**
 * Trade period enum
 */
export enum TradePeriod {
  Monthly = 1,
  Annually = 2,
}

/**
 * HS Code type enum
 */
export enum HSCodeType {
  TwoDigit = 1,
  Full = 2,
}

/**
 * Parameters for trade data
 */
export interface TradeParams {
  /**
   * Source of the data (1: Export, 2: Import)
   */
  source: TradeSource;

  /**
   * Period of the data (1: Monthly, 2: Annually)
   */
  period: TradePeriod;

  /**
   * HS Code of the data (use ; for multiple HS Code)
   */
  hsCode: string;

  /**
   * Type of HS Code (1: Two digit, 2: Full HS Code)
   */
  hsType: HSCodeType;

  /**
   * Year of data
   */
  year: string;

  /**
   * Cancel token for request cancellation
   */
  cancelToken?: CancelToken;
}

/**
 * Request data type
 */
export type RequestData = Record<string, string | number | boolean | undefined>;

/**
 * Response data type
 */
export type ResponseData<T> = {
  data: T[];
  'data-availability': string;
  pagination?: {
    page: number;
    per_page: number;
    total: number;
    pages: number;
    count: number;
  };
};
