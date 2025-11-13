import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { DomainRepository } from '../repositories';
import { Domain } from '../entities';
import { ListResult } from '../../../../shared/domain/entities';
import { DomainListParams } from '../../../../types';

/**
 * Use case for getting all domains
 */
export class GetAllDomains extends UseCase<DomainListParams | undefined, ListResult<Domain>> {
  constructor(private repository: DomainRepository) {
    super();
  }

  async execute(params?: DomainListParams): Promise<Result<ListResult<Domain>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
