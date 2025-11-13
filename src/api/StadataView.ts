import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';
import { ViewParams } from '../types';
import { Domain } from '../features/domain';

/**
 * Interface for view API operations
 * Provides access to all view endpoints
 */
export interface StadataView {
  /**
   * Gets a domain by ID
   */
  domain(params: ViewParams): Promise<Result<Domain, ApiFailure>>;

  // TODO: Add methods for other features
  // publication(params: ViewParams): Promise<Result<Publication, ApiFailure>>;
  // infographic(params: ViewParams): Promise<Result<Infographic, ApiFailure>>;
  // staticTable(params: ViewParams): Promise<Result<StaticTable, ApiFailure>>;
  // news(params: ViewParams): Promise<Result<News, ApiFailure>>;
  // newsCategory(params: ViewParams): Promise<Result<NewsCategory, ApiFailure>>;
  // pressRelease(params: ViewParams): Promise<Result<PressRelease, ApiFailure>>;
  // subject(params: ViewParams): Promise<Result<Subject, ApiFailure>>;
  // subjectCategory(params: ViewParams): Promise<Result<SubjectCategory, ApiFailure>>;
  // strategicIndicator(params: ViewParams): Promise<Result<StrategicIndicator, ApiFailure>>;
  // variable(params: ViewParams): Promise<Result<Variable, ApiFailure>>;
  // verticalVariable(params: ViewParams): Promise<Result<VerticalVariable, ApiFailure>>;
  // unit(params: ViewParams): Promise<Result<Unit, ApiFailure>>;
  // period(params: ViewParams): Promise<Result<Period, ApiFailure>>;
  // derivedPeriod(params: ViewParams): Promise<Result<DerivedPeriod, ApiFailure>>;
  // derivedVariable(params: ViewParams): Promise<Result<DerivedVariable, ApiFailure>>;
  // statisticClassification(params: ViewParams): Promise<Result<StatisticClassification, ApiFailure>>;
  // census(params: ViewParams): Promise<Result<Census, ApiFailure>>;
}
