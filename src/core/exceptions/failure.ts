/**
 * Base failure class
 */
export abstract class StadataFailure {
  constructor(
    public readonly message: string,
    public readonly code?: string
  ) {}

  toString(): string {
    return `${this.constructor.name}: ${this.message}${this.code ? ` (${this.code})` : ''}`;
  }
}

/**
 * Network failure
 */
export class NetworkFailure extends StadataFailure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * API failure
 */
export class ApiFailure extends StadataFailure {
  constructor(
    message: string,
    public readonly statusCode?: number,
    code?: string
  ) {
    super(message, code);
  }
}

/**
 * Data parse failure
 */
export class DataParseFailure extends StadataFailure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Not found failure
 */
export class NotFoundFailure extends StadataFailure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Unauthorized failure
 */
export class UnauthorizedFailure extends StadataFailure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Forbidden failure
 */
export class ForbiddenFailure extends StadataFailure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Server failure
 */
export class ServerFailure extends StadataFailure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Timeout failure
 */
export class TimeoutFailure extends StadataFailure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

/**
 * Cache failure
 */
export class CacheFailure extends StadataFailure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}
