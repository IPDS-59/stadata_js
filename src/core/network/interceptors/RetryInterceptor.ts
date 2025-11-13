import { BaseNetworkInterceptor } from './BaseNetworkInterceptor';
import { Logger } from '../../log';

/**
 * Configuration for retry interceptor
 */
export interface RetryConfig {
  /**
   * Maximum number of retry attempts
   */
  maxRetries: number;

  /**
   * Delay between retries in milliseconds
   */
  retryDelay: number;

  /**
   * HTTP status codes that should trigger a retry
   */
  retryableStatusCodes?: number[];

  /**
   * Whether to use exponential backoff
   */
  exponentialBackoff?: boolean;
}

/**
 * Interceptor that retries failed requests
 */
export class RetryInterceptor extends BaseNetworkInterceptor {
  private logger: Logger;
  private config: Required<RetryConfig>;
  private retryCount = new Map<string, number>();

  constructor(config: Partial<RetryConfig> = {}, logger?: Logger) {
    super();
    this.logger = logger || Logger.getInstance();
    this.config = {
      maxRetries: config.maxRetries ?? 3,
      retryDelay: config.retryDelay ?? 1000,
      retryableStatusCodes: config.retryableStatusCodes ?? [408, 429, 500, 502, 503, 504],
      exponentialBackoff: config.exponentialBackoff ?? true,
    };
  }

  async onResponse(response: Response): Promise<Response> {
    const requestKey = response.url;
    const retries = this.retryCount.get(requestKey) || 0;

    if (
      !response.ok &&
      this.config.retryableStatusCodes.includes(response.status) &&
      retries < this.config.maxRetries
    ) {
      this.retryCount.set(requestKey, retries + 1);

      const delay = this.config.exponentialBackoff
        ? this.config.retryDelay * Math.pow(2, retries)
        : this.config.retryDelay;

      this.logger.warn(
        `Retrying request (${retries + 1}/${this.config.maxRetries}) after ${delay}ms: ${response.url}`
      );

      await this.sleep(delay);

      // Note: Actual retry logic would need to be implemented in NetworkClient
      // This interceptor signals the need for retry
      throw new Error(`RETRY_NEEDED:${requestKey}`);
    }

    if (response.ok || retries >= this.config.maxRetries) {
      this.retryCount.delete(requestKey);
    }

    return response;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Resets retry count for a specific request
   */
  resetRetryCount(url: string): void {
    this.retryCount.delete(url);
  }

  /**
   * Clears all retry counts
   */
  clearAllRetryCounts(): void {
    this.retryCount.clear();
  }
}
