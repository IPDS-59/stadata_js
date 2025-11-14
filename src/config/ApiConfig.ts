/**
 * API configuration singleton
 * Holds the API key and other configuration
 */
export class ApiConfig {
  private static instance: ApiConfig;
  private _apiKey: string | null = null;

  private constructor() {}

  /**
   * Gets the singleton instance
   */
  static getInstance(): ApiConfig {
    if (!ApiConfig.instance) {
      ApiConfig.instance = new ApiConfig();
    }
    return ApiConfig.instance;
  }

  /**
   * Sets the API key
   */
  setApiKey(apiKey: string): void {
    this._apiKey = apiKey;
  }

  /**
   * Gets the API key
   */
  getApiKey(): string {
    if (!this._apiKey) {
      throw new Error('API key not set. Call setApiKey() first.');
    }
    return this._apiKey;
  }

  /**
   * Checks if API key is set
   */
  hasApiKey(): boolean {
    return this._apiKey !== null;
  }

  /**
   * Clears the API key
   */
  clearApiKey(): void {
    this._apiKey = null;
  }
}
