import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { DomainRepository } from '../repositories';
import { Domain } from '../entities';
import { ViewParams } from '../../../../types';

/**
 * Use case for getting a domain by ID
 */
export class GetDomainById extends UseCase<ViewParams, Domain> {
  constructor(private repository: DomainRepository) {
    super();
  }

  async execute(params: ViewParams): Promise<Result<Domain, ApiFailure>> {
    return this.repository.getById(params);
  }
}
