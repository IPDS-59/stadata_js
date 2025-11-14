/**
 * Request interceptor result
 */
export interface InterceptedRequest {
  url: string;
  init: RequestInit;
}

/**
 * Base interface for network interceptors
 */
export interface NetworkInterceptor {
  /**
   * Intercepts outgoing requests
   * @param url - Request URL
   * @param init - Request init options
   * @returns Modified request (url and init) or null to proceed unchanged
   */
  onRequest?(url: string, init: RequestInit): InterceptedRequest | Promise<InterceptedRequest>;

  /**
   * Intercepts incoming responses
   * @param response - Response object
   * @returns Modified response or null to proceed unchanged
   */
  onResponse?(response: Response): Response | Promise<Response>;

  /**
   * Intercepts errors
   * @param error - Error object
   * @returns Modified error or null to proceed with original error
   */
  onError?(error: Error): Error | Promise<Error> | null;
}

/**
 * Abstract base class for network interceptors
 */
export abstract class BaseNetworkInterceptor implements NetworkInterceptor {
  onRequest?(url: string, init: RequestInit): InterceptedRequest | Promise<InterceptedRequest>;
  onResponse?(response: Response): Response | Promise<Response>;
  onError?(error: Error): Error | Promise<Error> | null;
}
