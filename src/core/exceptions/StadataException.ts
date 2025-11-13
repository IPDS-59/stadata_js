/**
 * Base exception class for all Stadata SDK exceptions
 */
export class StadataException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'StadataException';
    Object.setPrototypeOf(this, StadataException.prototype);
  }
}

/**
 * Exception thrown when an API call fails
 */
export class ApiException extends StadataException {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly response?: unknown
  ) {
    super(message);
    this.name = 'ApiException';
    Object.setPrototypeOf(this, ApiException.prototype);
  }
}

/**
 * Exception thrown when a request is cancelled
 */
export class CancelledException extends StadataException {
  constructor(message = 'Request was cancelled') {
    super(message);
    this.name = 'CancelledException';
    Object.setPrototypeOf(this, CancelledException.prototype);
  }
}

/**
 * Exception thrown when a network error occurs
 */
export class NetworkException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkException';
    Object.setPrototypeOf(this, NetworkException.prototype);
  }
}

/**
 * Exception thrown when a request times out
 */
export class TimeoutException extends StadataException {
  constructor(message = 'Request timeout') {
    super(message);
    this.name = 'TimeoutException';
    Object.setPrototypeOf(this, TimeoutException.prototype);
  }
}

/**
 * Exception thrown when a resource is not found (404)
 */
export class NotFoundException extends ApiException {
  constructor(message = 'Resource not found') {
    super(message, 404);
    this.name = 'NotFoundException';
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

/**
 * Exception thrown when authentication fails (401)
 */
export class UnauthorizedException extends ApiException {
  constructor(message = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedException';
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

/**
 * Exception thrown when access is forbidden (403)
 */
export class ForbiddenException extends ApiException {
  constructor(message = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenException';
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}

/**
 * Exception thrown when a server error occurs (5xx)
 */
export class ServerException extends ApiException {
  constructor(message = 'Server error', statusCode = 500) {
    super(message, statusCode);
    this.name = 'ServerException';
    Object.setPrototypeOf(this, ServerException.prototype);
  }
}

/**
 * Feature-specific exceptions
 */

export class DomainException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}

export class DomainNotAvailableException extends DomainException {
  constructor(message = 'Domain not available') {
    super(message);
    this.name = 'DomainNotAvailableException';
    Object.setPrototypeOf(this, DomainNotAvailableException.prototype);
  }
}

export class PublicationException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'PublicationException';
    Object.setPrototypeOf(this, PublicationException.prototype);
  }
}

export class InfographicException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'InfographicException';
    Object.setPrototypeOf(this, InfographicException.prototype);
  }
}

export class StaticTableException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'StaticTableException';
    Object.setPrototypeOf(this, StaticTableException.prototype);
  }
}

export class NewsException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'NewsException';
    Object.setPrototypeOf(this, NewsException.prototype);
  }
}

export class NewsCategoryException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'NewsCategoryException';
    Object.setPrototypeOf(this, NewsCategoryException.prototype);
  }
}

export class PressReleaseException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'PressReleaseException';
    Object.setPrototypeOf(this, PressReleaseException.prototype);
  }
}

export class SubjectException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'SubjectException';
    Object.setPrototypeOf(this, SubjectException.prototype);
  }
}

export class SubjectCategoryException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'SubjectCategoryException';
    Object.setPrototypeOf(this, SubjectCategoryException.prototype);
  }
}

export class StrategicIndicatorException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'StrategicIndicatorException';
    Object.setPrototypeOf(this, StrategicIndicatorException.prototype);
  }
}

export class VariableException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'VariableException';
    Object.setPrototypeOf(this, VariableException.prototype);
  }
}

export class VerticalVariableException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'VerticalVariableException';
    Object.setPrototypeOf(this, VerticalVariableException.prototype);
  }
}

export class UnitException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'UnitException';
    Object.setPrototypeOf(this, UnitException.prototype);
  }
}

export class PeriodException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'PeriodException';
    Object.setPrototypeOf(this, PeriodException.prototype);
  }
}

export class DerivedPeriodException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'DerivedPeriodException';
    Object.setPrototypeOf(this, DerivedPeriodException.prototype);
  }
}

export class DerivedVariableException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'DerivedVariableException';
    Object.setPrototypeOf(this, DerivedVariableException.prototype);
  }
}

export class DynamicTableException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'DynamicTableException';
    Object.setPrototypeOf(this, DynamicTableException.prototype);
  }
}

export class StatisticClassificationException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'StatisticClassificationException';
    Object.setPrototypeOf(this, StatisticClassificationException.prototype);
  }
}

export class CensusException extends StadataException {
  constructor(message: string) {
    super(message);
    this.name = 'CensusException';
    Object.setPrototypeOf(this, CensusException.prototype);
  }
}
