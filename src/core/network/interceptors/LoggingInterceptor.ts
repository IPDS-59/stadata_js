import { BaseNetworkInterceptor, InterceptedRequest } from './BaseNetworkInterceptor';
import { Logger } from '../../log';

/**
 * Interceptor that logs requests and responses
 */
export class LoggingInterceptor extends BaseNetworkInterceptor {
  private logger: Logger;

  constructor(logger?: Logger) {
    super();
    this.logger = logger || Logger.getInstance();
  }

  onRequest(url: string, init: RequestInit): InterceptedRequest {
    this.logger.debug(`HTTP Request: ${init.method || 'GET'} ${url}`, {
      headers: init.headers,
      body: init.body,
    });
    return { url, init };
  }

  onResponse(response: Response): Response {
    this.logger.debug(`HTTP Response: ${response.status} ${response.url}`, {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });
    return response;
  }

  onError(error: Error): Error {
    this.logger.error(`HTTP Error: ${error.message}`, error);
    return error;
  }
}
