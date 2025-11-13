import { Result } from 'neverthrow';
import { StadataList } from './StadataList';
import { ApiFailure } from '../core/failures';
import { ListResult } from '../shared/domain/entities';
import { Injector } from '../core/di';
import { DomainListParams, PublicationListParams, InfographicListParams, NewsListParams } from '../types';
import { Domain, DomainInjector } from '../features/domain';
import { Publication, PublicationInjector } from '../features/publication';
import { Infographic, InfographicInjector } from '../features/infographic';
import { News, NewsInjector } from '../features/news';

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

  // TODO: Implement other features
}
