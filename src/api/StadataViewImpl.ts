import { Result } from 'neverthrow';
import { StadataView } from './StadataView';
import { ApiFailure } from '../core/failures';
import { Injector } from '../core/di';
import { ViewParams } from '../types';
import { Publication, PublicationInjector } from '../features/publication';
import { Infographic, InfographicInjector } from '../features/infographic';
import { News, NewsInjector } from '../features/news';
import { NewsCategory, NewsCategoryInjector } from '../features/news-category';
import { PressRelease, PressReleaseInjector } from '../features/press-release';
import { StaticTable, StaticTableInjector } from '../features/static-table';
import { Subject, SubjectInjector } from '../features/subject';
import { SubjectCategory, SubjectCategoryInjector } from '../features/subject-category';
import { StrategicIndicator, StrategicIndicatorInjector } from '../features/strategic-indicator';
import { Variable, VariableInjector } from '../features/variable';
import { VerticalVariable, VerticalVariableInjector } from '../features/vertical-variable';
import { Unit, UnitInjector } from '../features/unit';
import { Period, PeriodInjector } from '../features/period';
import { DerivedPeriod, DerivedPeriodInjector } from '../features/derived-period';
import { DerivedVariable, DerivedVariableInjector } from '../features/derived-variable';
import {
  StatisticClassification,
  StatisticClassificationInjector,
} from '../features/statistic-classification';
import { CensusEvent, CensusInjector } from '../features/census';

/**
 * Implementation of StadataView interface
 */
export class StadataViewImpl implements StadataView {
  constructor(private injector: Injector) {}

  async publication(params: ViewParams): Promise<Result<Publication, ApiFailure>> {
    const useCase = PublicationInjector.getPublicationByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async infographic(params: ViewParams): Promise<Result<Infographic, ApiFailure>> {
    const useCase = InfographicInjector.getInfographicByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async news(params: ViewParams): Promise<Result<News, ApiFailure>> {
    const useCase = NewsInjector.getNewsByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async newsCategory(params: ViewParams): Promise<Result<NewsCategory, ApiFailure>> {
    const useCase = NewsCategoryInjector.getNewsCategoryByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async pressRelease(params: ViewParams): Promise<Result<PressRelease, ApiFailure>> {
    const useCase = PressReleaseInjector.getPressReleaseByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async staticTable(params: ViewParams): Promise<Result<StaticTable, ApiFailure>> {
    const useCase = StaticTableInjector.getStaticTableByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async subject(params: ViewParams): Promise<Result<Subject, ApiFailure>> {
    const useCase = SubjectInjector.getSubjectByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async subjectCategory(params: ViewParams): Promise<Result<SubjectCategory, ApiFailure>> {
    const useCase = SubjectCategoryInjector.getSubjectCategoryByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async strategicIndicator(params: ViewParams): Promise<Result<StrategicIndicator, ApiFailure>> {
    const useCase = StrategicIndicatorInjector.getStrategicIndicatorByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async variable(params: ViewParams): Promise<Result<Variable, ApiFailure>> {
    const useCase = VariableInjector.getVariableByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async verticalVariable(params: ViewParams): Promise<Result<VerticalVariable, ApiFailure>> {
    const useCase = VerticalVariableInjector.getVerticalVariableByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async unit(params: ViewParams): Promise<Result<Unit, ApiFailure>> {
    const useCase = UnitInjector.getUnitByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async period(params: ViewParams): Promise<Result<Period, ApiFailure>> {
    const useCase = PeriodInjector.getPeriodByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async derivedPeriod(params: ViewParams): Promise<Result<DerivedPeriod, ApiFailure>> {
    const useCase = DerivedPeriodInjector.getDerivedPeriodByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async derivedVariable(params: ViewParams): Promise<Result<DerivedVariable, ApiFailure>> {
    const useCase = DerivedVariableInjector.getDerivedVariableByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  async statisticClassification(
    params: ViewParams
  ): Promise<Result<StatisticClassification, ApiFailure>> {
    const useCase = StatisticClassificationInjector.getStatisticClassificationByIdUseCase(
      this.injector
    );
    return useCase.execute(params);
  }

  async census(params: ViewParams): Promise<Result<CensusEvent, ApiFailure>> {
    const useCase = CensusInjector.getCensusByIdUseCase(this.injector);
    return useCase.execute(params);
  }

  // TODO: Implement other features
}
