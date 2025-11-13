import { Result } from 'neverthrow';
import { StadataList } from './StadataList';
import { ApiFailure } from '../core/failures';
import { ListResult } from '../shared/domain/entities';
import { Injector } from '../core/di';
import { DomainListParams, PublicationListParams } from '../types';
import { Domain, DomainInjector } from '../features/domain';
import { Publication, PublicationInjector } from '../features/publication';

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

  // TODO: Implement other features
}
