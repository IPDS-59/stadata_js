/**
 * API endpoint constants
 */
export const ApiEndpoint = {
  // Domain endpoints
  DOMAIN_LIST: '/list/domain',
  DOMAIN_VIEW: '/view/domain',

  // Publication endpoints
  PUBLICATION_LIST: '/list/publication',
  PUBLICATION_VIEW: '/view/publication',

  // Infographic endpoints
  INFOGRAPHIC_LIST: '/list/infographic',
  INFOGRAPHIC_VIEW: '/view/infographic',

  // Static table endpoints
  STATIC_TABLE_LIST: '/list/statictable',
  STATIC_TABLE_VIEW: '/view/statictable',

  // News endpoints
  NEWS_LIST: '/list/news',
  NEWS_VIEW: '/view/news',

  // News category endpoints
  NEWS_CATEGORY_LIST: '/list/newscategory',
  NEWS_CATEGORY_VIEW: '/view/newscategory',

  // Press release endpoints
  PRESS_RELEASE_LIST: '/list/pressrelease',
  PRESS_RELEASE_VIEW: '/view/pressrelease',

  // Subject endpoints
  SUBJECT_LIST: '/list/subject',
  SUBJECT_VIEW: '/view/subject',

  // Subject category endpoints
  SUBJECT_CATEGORY_LIST: '/list/subjectcat',
  SUBJECT_CATEGORY_VIEW: '/view/subjectcat',

  // Strategic indicator endpoints
  STRATEGIC_INDICATOR_LIST: '/list/stratind',
  STRATEGIC_INDICATOR_VIEW: '/view/stratind',

  // Variable endpoints
  VARIABLE_LIST: '/list/var',
  VARIABLE_VIEW: '/view/var',

  // Vertical variable endpoints
  VERTICAL_VARIABLE_LIST: '/list/vervar',
  VERTICAL_VARIABLE_VIEW: '/view/vervar',

  // Unit endpoints
  UNIT_LIST: '/list/unit',
  UNIT_VIEW: '/view/unit',

  // Period endpoints
  PERIOD_LIST: '/list/period',
  PERIOD_VIEW: '/view/period',

  // Derived period endpoints
  DERIVED_PERIOD_LIST: '/list/turth',
  DERIVED_PERIOD_VIEW: '/view/turth',

  // Derived variable endpoints
  DERIVED_VARIABLE_LIST: '/list/turvar',
  DERIVED_VARIABLE_VIEW: '/view/turvar',

  // Dynamic table endpoints
  DYNAMIC_TABLE_LIST: '/list/dynamictable',

  // Statistic classification endpoints
  STATISTIC_CLASSIFICATION_LIST: '/list/kbli',
  STATISTIC_CLASSIFICATION_VIEW: '/view/kbli',

  // Census endpoints
  CENSUS_LIST: '/list/sensus',
  CENSUS_VIEW: '/view/sensus',
} as const;

/**
 * Type helper for API endpoints
 */
export type Endpoint = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];
