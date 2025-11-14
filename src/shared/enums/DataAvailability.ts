/**
 * Data availability status
 */
export enum DataAvailability {
  /**
   * Data is available
   */
  AVAILABLE = 'available',

  /**
   * Data is not available
   */
  NOT_AVAILABLE = 'not-available',

  /**
   * List is not available
   */
  LIST_NOT_AVAILABLE = 'list-not-available',
}

/**
 * Type guard to check if a string is a valid DataAvailability
 */
export function isDataAvailability(value: string): value is DataAvailability {
  return Object.values(DataAvailability).includes(value as DataAvailability);
}

/**
 * Converts a string to DataAvailability with fallback
 */
export function toDataAvailability(value: string): DataAvailability {
  return isDataAvailability(value) ? value : DataAvailability.NOT_AVAILABLE;
}
