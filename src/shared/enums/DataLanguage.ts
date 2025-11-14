/**
 * Supported data languages
 */
export enum DataLanguage {
  /**
   * Indonesian language
   */
  ID = 'ind',

  /**
   * English language
   */
  EN = 'eng',
}

/**
 * Type guard to check if a string is a valid DataLanguage
 */
export function isDataLanguage(value: string): value is DataLanguage {
  return Object.values(DataLanguage).includes(value as DataLanguage);
}

/**
 * Converts a string to DataLanguage with fallback to Indonesian
 */
export function toDataLanguage(value: string): DataLanguage {
  return isDataLanguage(value) ? value : DataLanguage.ID;
}
