/**
 * Query parameter constants for API requests
 */
export const QueryParamConstant = {
  /**
   * API key parameter
   */
  KEY: 'key',

  /**
   * Domain code parameter
   */
  DOMAIN: 'domain',

  /**
   * Language parameter
   */
  LANG: 'lang',

  /**
   * Page number parameter
   */
  PAGE: 'page',

  /**
   * Page size/limit parameter
   */
  PER_PAGE: 'per_page',

  /**
   * Keyword search parameter
   */
  KEYWORD: 'keyword',

  /**
   * Month parameter
   */
  MONTH: 'month',

  /**
   * Year parameter
   */
  YEAR: 'year',

  /**
   * Subject ID parameter
   */
  SUBJECT: 'subj',

  /**
   * Variable ID parameter
   */
  VARIABLE: 'var',

  /**
   * Turvar ID parameter (derived variable)
   */
  TURVAR: 'turvar',

  /**
   * Turth ID parameter (derived period)
   */
  TURTH: 'turth',

  /**
   * Period ID parameter
   */
  PERIOD: 'th',

  /**
   * Type parameter
   */
  TYPE: 'type',

  /**
   * Table ID parameter
   */
  TABLE: 'table',

  /**
   * Model parameter
   */
  MODEL: 'model',

  /**
   * ID parameter
   */
  ID: 'id',

  /**
   * Show deleted parameter
   */
  SHOW_DELETED: 'show_deleted',
} as const;

/**
 * Type helper for query parameters
 */
export type QueryParam = (typeof QueryParamConstant)[keyof typeof QueryParamConstant];
