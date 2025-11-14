import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';
import { ViewParams } from '../types';
import { Publication } from '../features/publication';
import { Infographic } from '../features/infographic';
import { News } from '../features/news';
import { NewsCategory } from '../features/news-category';
import { PressRelease } from '../features/press-release';
import { StaticTable } from '../features/static-table';
import { Subject } from '../features/subject';
import { SubjectCategory } from '../features/subject-category';
import { StrategicIndicator } from '../features/strategic-indicator';
import { Variable } from '../features/variable';
import { VerticalVariable } from '../features/vertical-variable';
import { Unit } from '../features/unit';
import { Period } from '../features/period';
import { DerivedPeriod } from '../features/derived-period';
import { DerivedVariable } from '../features/derived-variable';
import { StatisticClassification } from '../features/statistic-classification';
import { CensusEvent } from '../features/census';

/**
 * Interface for view API operations
 * Provides access to all view endpoints
 */
export interface StadataView {
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

  /**
   * Gets a subject category by ID
   */
  subjectCategory(params: ViewParams): Promise<Result<SubjectCategory, ApiFailure>>;

  /**
   * Gets a strategic indicator by ID
   */
  strategicIndicator(params: ViewParams): Promise<Result<StrategicIndicator, ApiFailure>>;

  /**
   * Gets a variable by ID
   */
  variable(params: ViewParams): Promise<Result<Variable, ApiFailure>>;

  /**
   * Gets a vertical variable by ID
   */
  verticalVariable(params: ViewParams): Promise<Result<VerticalVariable, ApiFailure>>;

  /**
   * Gets a unit by ID
   */
  unit(params: ViewParams): Promise<Result<Unit, ApiFailure>>;

  /**
   * Gets a period by ID
   */
  period(params: ViewParams): Promise<Result<Period, ApiFailure>>;

  /**
   * Gets a derived period by ID
   */
  derivedPeriod(params: ViewParams): Promise<Result<DerivedPeriod, ApiFailure>>;

  /**
   * Gets a derived variable by ID
   */
  derivedVariable(params: ViewParams): Promise<Result<DerivedVariable, ApiFailure>>;

  /**
   * Gets a statistic classification by ID
   */
  statisticClassification(params: ViewParams): Promise<Result<StatisticClassification, ApiFailure>>;

  /**
   * Gets a census by ID
   */
  census(params: ViewParams): Promise<Result<CensusEvent, ApiFailure>>;

  // TODO: Add methods for other features
}
