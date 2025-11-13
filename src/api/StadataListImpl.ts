import { Result } from 'neverthrow';
import { StadataList } from './StadataList';
import { ApiFailure } from '../core/failures';
import { ListResult } from '../shared/domain/entities';
import { Injector } from '../core/di';
import {
  DomainListParams,
  PublicationListParams,
  InfographicListParams,
  NewsListParams,
  NewsCategoryListParams,
  PressReleaseListParams,
  StaticTableListParams,
  SubjectListParams,
  SubjectCategoryListParams,
  StrategicIndicatorListParams,
  VariableListParams,
  VerticalVariableListParams,
  UnitListParams,
  PeriodListParams,
} from '../types';
import { Domain, DomainInjector } from '../features/domain';
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

/**
 * Implementation of StadataList interface
 */
export class StadataListImpl implements StadataList {
  constructor(private injector: Injector) {}

  async domains(params?: DomainListParams): Promise<Result<ListResult<Domain>, ApiFailure>> {
    const useCase = DomainInjector.getAllDomainsUseCase(this.injector);
    return useCase.execute(params);
  }

  async publications(
    params: PublicationListParams
  ): Promise<Result<ListResult<Publication>, ApiFailure>> {
    const useCase = PublicationInjector.getAllPublicationsUseCase(this.injector);
    return useCase.execute(params);
  }

  async infographics(
    params: InfographicListParams
  ): Promise<Result<ListResult<Infographic>, ApiFailure>> {
    const useCase = InfographicInjector.getAllInfographicsUseCase(this.injector);
    return useCase.execute(params);
  }

  async news(params: NewsListParams): Promise<Result<ListResult<News>, ApiFailure>> {
    const useCase = NewsInjector.getAllNewsUseCase(this.injector);
    return useCase.execute(params);
  }

  async newsCategories(
    params?: NewsCategoryListParams
  ): Promise<Result<ListResult<NewsCategory>, ApiFailure>> {
    const useCase = NewsCategoryInjector.getAllNewsCategoriesUseCase(this.injector);
    return useCase.execute(params);
  }

  async pressReleases(
    params: PressReleaseListParams
  ): Promise<Result<ListResult<PressRelease>, ApiFailure>> {
    const useCase = PressReleaseInjector.getAllPressReleasesUseCase(this.injector);
    return useCase.execute(params);
  }

  async staticTables(
    params: StaticTableListParams
  ): Promise<Result<ListResult<StaticTable>, ApiFailure>> {
    const useCase = StaticTableInjector.getAllStaticTablesUseCase(this.injector);
    return useCase.execute(params);
  }

  async subjects(params?: SubjectListParams): Promise<Result<ListResult<Subject>, ApiFailure>> {
    const useCase = SubjectInjector.getAllSubjectsUseCase(this.injector);
    return useCase.execute(params);
  }

  async subjectCategories(
    params?: SubjectCategoryListParams
  ): Promise<Result<ListResult<SubjectCategory>, ApiFailure>> {
    const useCase = SubjectCategoryInjector.getAllSubjectCategoriesUseCase(this.injector);
    return useCase.execute(params);
  }

  async strategicIndicators(
    params?: StrategicIndicatorListParams
  ): Promise<Result<ListResult<StrategicIndicator>, ApiFailure>> {
    const useCase = StrategicIndicatorInjector.getAllStrategicIndicatorsUseCase(this.injector);
    return useCase.execute(params);
  }

  async variables(params?: VariableListParams): Promise<Result<ListResult<Variable>, ApiFailure>> {
    const useCase = VariableInjector.getAllVariablesUseCase(this.injector);
    return useCase.execute(params);
  }

  async verticalVariables(
    params: VerticalVariableListParams
  ): Promise<Result<ListResult<VerticalVariable>, ApiFailure>> {
    const useCase = VerticalVariableInjector.getAllVerticalVariablesUseCase(this.injector);
    return useCase.execute(params);
  }

  async units(params?: UnitListParams): Promise<Result<ListResult<Unit>, ApiFailure>> {
    const useCase = UnitInjector.getAllUnitsUseCase(this.injector);
    return useCase.execute(params);
  }

  async periods(params: PeriodListParams): Promise<Result<ListResult<Period>, ApiFailure>> {
    const useCase = PeriodInjector.getAllPeriodsUseCase(this.injector);
    return useCase.execute(params);
  }

  // TODO: Implement other features
}
