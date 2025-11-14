import { Result, ok, err } from 'neverthrow';
import {
  ApiFailure,
  NetworkFailure,
  TimeoutFailure,
  NotFoundFailure,
  UnauthorizedFailure,
  ForbiddenFailure,
  ServerFailure,
  CancelledFailure,
} from '../failures';
import { NetworkInterceptor } from './interceptors';
import { CancelToken } from '../utils';

/**
 * HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Network client configuration
 */
export interface NetworkClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  interceptors?: NetworkInterceptor[];
}

/**
 * Request options
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  cancelToken?: CancelToken;
  timeout?: number;
}

/**
 * Network client using fetch API
 */
export class NetworkClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;
  private interceptors: NetworkInterceptor[];

  constructor(config: NetworkClientConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.timeout = config.timeout || 30000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.interceptors = config.interceptors || [];
  }

  /**
   * Adds an interceptor
   */
  addInterceptor(interceptor: NetworkInterceptor): void {
    this.interceptors.push(interceptor);
  }

  /**
   * Removes an interceptor
   */
  removeInterceptor(interceptor: NetworkInterceptor): void {
    const index = this.interceptors.indexOf(interceptor);
    if (index !== -1) {
      this.interceptors.splice(index, 1);
    }
  }

  /**
   * Performs a GET request
   */
  async get<T>(url: string, options?: RequestOptions): Promise<Result<T, ApiFailure>> {
    return this.request<T>('GET', url, options);
  }

  /**
   * Performs a POST request
   */
  async post<T>(url: string, options?: RequestOptions): Promise<Result<T, ApiFailure>> {
    return this.request<T>('POST', url, options);
  }

  /**
   * Performs a PUT request
   */
  async put<T>(url: string, options?: RequestOptions): Promise<Result<T, ApiFailure>> {
    return this.request<T>('PUT', url, options);
  }

  /**
   * Performs a DELETE request
   */
  async delete<T>(url: string, options?: RequestOptions): Promise<Result<T, ApiFailure>> {
    return this.request<T>('DELETE', url, options);
  }

  /**
   * Performs a PATCH request
   */
  async patch<T>(url: string, options?: RequestOptions): Promise<Result<T, ApiFailure>> {
    return this.request<T>('PATCH', url, options);
  }

  /**
   * Internal request method
   */
  private async request<T>(
    method: HttpMethod,
    url: string,
    options: RequestOptions = {}
  ): Promise<Result<T, ApiFailure>> {
    try {
      // Build full URL
      const fullUrl = this.buildUrl(url);

      // Build request init
      let init: RequestInit = {
        method,
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
      };

      // Add body for non-GET requests
      if (method !== 'GET' && options.body) {
        init.body = JSON.stringify(options.body);
      }

      // Add cancel token signal
      if (options.cancelToken) {
        init.signal = options.cancelToken.signal;
      }

      // Apply request interceptors
      for (const interceptor of this.interceptors) {
        if (interceptor.onRequest) {
          init = await interceptor.onRequest(fullUrl, init);
        }
      }

      // Perform request with timeout
      const response = await this.fetchWithTimeout(fullUrl, init, options.timeout || this.timeout);

      // Apply response interceptors
      let processedResponse = response;
      for (const interceptor of this.interceptors) {
        if (interceptor.onResponse) {
          processedResponse = await interceptor.onResponse(processedResponse);
        }
      }

      // Check if response is ok
      if (!processedResponse.ok) {
        return err(await this.handleErrorResponse(processedResponse));
      }

      // Parse JSON response
      const data = (await processedResponse.json()) as T;
      return ok(data);
    } catch (error) {
      return err(await this.handleError(error, options.cancelToken));
    }
  }

  /**
   * Fetch with timeout
   */
  private async fetchWithTimeout(
    url: string,
    init: RequestInit,
    timeout: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      // Combine signals if one already exists
      const signal =
        init.signal && init.signal instanceof AbortSignal
          ? this.combineSignals(init.signal, controller.signal)
          : controller.signal;

      const response = await fetch(url, { ...init, signal });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Combines multiple AbortSignals
   */
  private combineSignals(signal1: AbortSignal, signal2: AbortSignal): AbortSignal {
    const controller = new AbortController();

    const abort = (): void => controller.abort();
    signal1.addEventListener('abort', abort);
    signal2.addEventListener('abort', abort);

    return controller.signal;
  }

  /**
   * Builds full URL
   */
  private buildUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${this.baseURL}${url}`;
  }

  /**
   * Handles error responses
   */
  private async handleErrorResponse(response: Response): Promise<ApiFailure> {
    const { status } = response;
    let message: string;

    try {
      const data = (await response.json()) as { message?: string; error?: string };
      message = data.message || data.error || response.statusText;
    } catch {
      message = response.statusText;
    }

    switch (status) {
      case 401:
        return new UnauthorizedFailure(message);
      case 403:
        return new ForbiddenFailure(message);
      case 404:
        return new NotFoundFailure(message);
      case 500:
      case 502:
      case 503:
      case 504:
        return new ServerFailure(message, status);
      default:
        return new ApiFailure(message, status);
    }
  }

  /**
   * Handles errors
   */
  private async handleError(error: unknown, cancelToken?: CancelToken): Promise<ApiFailure> {
    // Apply error interceptors
    let processedError = error instanceof Error ? error : new Error(String(error));
    for (const interceptor of this.interceptors) {
      if (interceptor.onError) {
        const result = await interceptor.onError(processedError);
        if (result) {
          processedError = result;
        }
      }
    }

    // Check if request was cancelled
    if (cancelToken?.isCancelled || (error as Error).name === 'AbortError') {
      return new CancelledFailure(cancelToken?.reason);
    }

    // Check for timeout
    if (
      processedError.name === 'AbortError' ||
      processedError.message.includes('timeout') ||
      processedError.message.includes('aborted')
    ) {
      return new TimeoutFailure();
    }

    // Network error
    if (
      processedError.message.includes('network') ||
      processedError.message.includes('fetch') ||
      processedError.message.includes('ECONNREFUSED')
    ) {
      return new NetworkFailure(processedError.message);
    }

    // Generic API failure
    return new ApiFailure(processedError.message);
  }
}
