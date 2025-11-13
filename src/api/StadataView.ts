import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';
import { ViewParams } from '../types';
import { Domain } from '../features/domain';
import { Publication } from '../features/publication';
import { Infographic } from '../features/infographic';
import { News } from '../features/news';
import { NewsCategory } from '../features/news-category';
import { PressRelease } from '../features/press-release';
import { StaticTable } from '../features/static-table';
import { Subject } from '../features/subject';

/**
 * Interface for view API operations
 * Provides access to all view endpoints
 */
export interface StadataView {
  /**
   * Gets a domain by ID
   */
  domain(params: ViewParams): Promise<Result<Domain, ApiFailure>>;

  /**
   * Gets a publication by ID
   */
  publication(params: ViewParams): Promise<Result<Publication, ApiFailure>>;

  /**
   * Gets an infographic by ID
   */
  infographic(params: ViewParams): Promise<Result<Infographic, ApiFailure>>;

  /**
   * Gets a news item by ID
   */
  news(params: ViewParams): Promise<Result<News, ApiFailure>>;

  /**
   * Gets a news category by ID
   */
  newsCategory(params: ViewParams): Promise<Result<NewsCategory, ApiFailure>>;

  /**
   * Gets a press release by ID
   */
  pressRelease(params: ViewParams): Promise<Result<PressRelease, ApiFailure>>;

  /**
   * Gets a static table by ID
   */
  staticTable(params: ViewParams): Promise<Result<StaticTable, ApiFailure>>;

  /**
   * Gets a subject by ID
   */
  subject(params: ViewParams): Promise<Result<Subject, ApiFailure>>;

  // TODO: Add methods for other features
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
