/**
 * Base exception class for Stadata SDK
 */
export abstract class StadataException extends Error {
  constructor(
    message: string,
    public readonly code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Network-related exceptions
 */
export class NetworkException extends StadataException {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * API exceptions
 */
export class ApiException extends StadataException {
  constructor(
    message: string,
    public readonly statusCode?: number,
    code?: string
  ) {
    super(message, code);
  }
}

/**
 * Data parsing exceptions
 */
export class DataParseException extends StadataException {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Not found exceptions
 */
export class NotFoundException extends StadataException {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Unauthorized exceptions
 */
export class UnauthorizedException extends StadataException {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Forbidden exceptions
 */
export class ForbiddenException extends StadataException {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Server exceptions
 */
export class ServerException extends StadataException {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Timeout exceptions
 */
export class TimeoutException extends StadataException {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Cache exceptions
 */
export class CacheException extends StadataException {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}
