/**
 * API configuration constants
 */
export const ApiConstant = {
  /**
   * Base URL for the BPS Stadata API
   */
  BASE_URL: 'https://webapi.bps.go.id/v1/api',

  /**
   * Default timeout for API requests (in milliseconds)
   */
  DEFAULT_TIMEOUT: 30000,

  /**
   * API version
   */
  API_VERSION: 'v1',

  /**
   * Default page size for paginated requests
   */
  DEFAULT_PAGE_SIZE: 10,

  /**
   * Maximum page size allowed
   */
  MAX_PAGE_SIZE: 100,
} as const;
