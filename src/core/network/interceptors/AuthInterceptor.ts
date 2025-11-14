import { BaseNetworkInterceptor, InterceptedRequest } from './BaseNetworkInterceptor';

/**
 * Interceptor that injects API key into requests
 */
export class AuthInterceptor extends BaseNetworkInterceptor {
  constructor(private apiKey: string) {
    super();
  }

  onRequest(url: string, init: RequestInit): InterceptedRequest {
    // Add API key to URL query parameters
    const urlObj = new URL(url);
    urlObj.searchParams.set('key', this.apiKey);

    return {
      url: urlObj.toString(),
      init,
    };
  }

  /**
   * Updates the API key
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  /**
   * Gets the current API key
   */
  getApiKey(): string {
    return this.apiKey;
  }
}
