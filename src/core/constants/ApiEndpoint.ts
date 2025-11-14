/**
 * API endpoint constants
 */
export const ApiEndpoint = {
  // Domain endpoints
  DOMAIN_LIST: '/list/model/domain',
  DOMAIN_VIEW: '/view/model/domain',

  // Publication endpoints
  PUBLICATION_LIST: '/list/model/publication',
  PUBLICATION_VIEW: '/view/model/publication',

  // Infographic endpoints
  INFOGRAPHIC_LIST: '/list/model/infographic',
  INFOGRAPHIC_VIEW: '/view/model/infographic',

  // Static table endpoints
  STATIC_TABLE_LIST: '/list/model/statictable',
  STATIC_TABLE_VIEW: '/view/model/statictable',

  // News endpoints
  NEWS_LIST: '/list/model/news',
  NEWS_VIEW: '/view/model/news',

  // News category endpoints
  NEWS_CATEGORY_LIST: '/list/model/newscategory',
  NEWS_CATEGORY_VIEW: '/view/model/newscategory',

  // Press release endpoints
  PRESS_RELEASE_LIST: '/list/model/pressrelease',
  PRESS_RELEASE_VIEW: '/view/model/pressrelease',

  // Subject endpoints
  SUBJECT_LIST: '/list/model/subject',
  SUBJECT_VIEW: '/view/model/subject',

  // Subject category endpoints
  SUBJECT_CATEGORY_LIST: '/list/model/subjectcat',
  SUBJECT_CATEGORY_VIEW: '/view/model/subjectcat',

  // Strategic indicator endpoints
  STRATEGIC_INDICATOR_LIST: '/list/model/indicators',
  STRATEGIC_INDICATOR_VIEW: '/view/model/indicators',

  // Variable endpoints
  VARIABLE_LIST: '/list/model/var',
  VARIABLE_VIEW: '/view/model/var',

  // Vertical variable endpoints
  VERTICAL_VARIABLE_LIST: '/list/model/vervar',
  VERTICAL_VARIABLE_VIEW: '/view/model/vervar',

  // Unit endpoints
  UNIT_LIST: '/list/model/unit',
  UNIT_VIEW: '/view/model/unit',

  // Period endpoints
  PERIOD_LIST: '/list/model/period',
  PERIOD_VIEW: '/view/model/period',

  // Derived period endpoints
  DERIVED_PERIOD_LIST: '/list/model/turth',
  DERIVED_PERIOD_VIEW: '/view/model/turth',

  // Derived variable endpoints
  DERIVED_VARIABLE_LIST: '/list/model/turvar',
  DERIVED_VARIABLE_VIEW: '/view/model/turvar',

  // Dynamic table endpoints
  DYNAMIC_TABLE_LIST: '/list/model/dynamictable',

  // Statistic classification endpoints
  STATISTIC_CLASSIFICATION_LIST: '/list/model/kbli',
  STATISTIC_CLASSIFICATION_VIEW: '/view/model/kbli',

  // Census endpoints
  CENSUS_LIST: '/list/model/sensus',
  CENSUS_VIEW: '/view/model/sensus',

  // Trade endpoints
  TRADE: '/dataexim',
} as const;

/**
 * Type helper for API endpoints
 */
export type Endpoint = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];
