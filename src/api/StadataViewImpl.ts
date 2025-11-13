import { Result } from 'neverthrow';
import { StadataView } from './StadataView';
import { ApiFailure } from '../core/failures';
import { Injector } from '../core/di';
import { ViewParams } from '../types';
import { Domain, DomainInjector } from '../features/domain';
import { Publication, PublicationInjector } from '../features/publication';

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

  // TODO: Implement other features
}
