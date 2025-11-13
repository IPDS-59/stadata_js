import { Result } from 'neverthrow';
import { StadataView } from './StadataView';
import { ApiFailure } from '../core/failures';
import { Injector } from '../core/di';
import { ViewParams } from '../types';
import { Domain, DomainInjector } from '../features/domain';
import { Publication, PublicationInjector } from '../features/publication';
import { Infographic, InfographicInjector } from '../features/infographic';
import { News, NewsInjector } from '../features/news';
import { NewsCategory, NewsCategoryInjector } from '../features/news-category';
import { PressRelease, PressReleaseInjector } from '../features/press-release';
import { StaticTable, StaticTableInjector } from '../features/static-table';
import { Subject, SubjectInjector } from '../features/subject';

/**
 * Implementation of StadataView interface
 */
export class StadataViewImpl implements StadataView {
  constructor(private injector: Injector) {}

  async domain(params: ViewParams): Promise<Result<Domain, ApiFailure>> {
    const useCase = DomainInjector.getDomainByIdUseCase(this.injector);
    return useCase.execute(params);
  }

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

  // TODO: Implement other features
}
