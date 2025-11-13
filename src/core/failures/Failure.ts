/**
 * Base class for all failures in the application
 * Failures represent errors in the Result pattern
 */
export abstract class Failure {
  constructor(
    public readonly message: string,
    public readonly code?: string
  ) {}

  toString(): string {
    return `${this.constructor.name}: ${this.message}${this.code ? ` (${this.code})` : ''}`;
  }

  equals(other: unknown): boolean {
    if (!(other instanceof Failure)) {
      return false;
    }
    return (
      this.message === other.message &&
      this.code === other.code &&
      this.constructor.name === other.constructor.name
    );
  }
}

/**
 * Failure representing a network/API error
 */
export class ApiFailure extends Failure {
  constructor(
    message: string,
    public readonly statusCode?: number,
    code?: string
  ) {
    super(message, code);
  }
}

/**
 * Failure representing a request cancellation
 */
export class CancelledFailure extends Failure {
  constructor(message = 'Request was cancelled') {
    super(message, 'CANCELLED');
  }
}

/**
 * Failure representing a network error
 */
export class NetworkFailure extends Failure {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR');
  }
}

/**
 * Failure representing a timeout
 */
export class TimeoutFailure extends Failure {
  constructor(message = 'Request timeout') {
    super(message, 'TIMEOUT');
  }
}

/**
 * Failure representing a resource not found (404)
 */
export class NotFoundFailure extends ApiFailure {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

/**
 * Failure representing unauthorized access (401)
 */
export class UnauthorizedFailure extends ApiFailure {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

/**
 * Failure representing forbidden access (403)
 */
export class ForbiddenFailure extends ApiFailure {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

/**
 * Failure representing a server error (5xx)
 */
export class ServerFailure extends ApiFailure {
  constructor(message = 'Server error', statusCode = 500) {
    super(message, statusCode, 'SERVER_ERROR');
  }
}

/**
 * Failure representing a data parsing error
 */
export class ParseFailure extends Failure {
  constructor(message: string) {
    super(message, 'PARSE_ERROR');
  }
}

/**
 * Failure representing a validation error
 */
export class ValidationFailure extends Failure {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
  }
}

/**
 * Feature-specific failures
 */

export class DomainFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class DomainNotAvailableFailure extends DomainFailure {
  constructor(message = 'Domain not available') {
    super(message, 'DOMAIN_NOT_AVAILABLE');
  }
}

export class PublicationFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class InfographicFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class StaticTableFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class NewsFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class NewsCategoryFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class PressReleaseFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class SubjectFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class SubjectCategoryFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class StrategicIndicatorFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class VariableFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class VerticalVariableFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class UnitFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class PeriodFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class DerivedPeriodFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class DerivedVariableFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class DynamicTableFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class StatisticClassificationFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}

export class CensusFailure extends Failure {
  constructor(message: string, code?: string) {
    super(message, code);
  }
}
