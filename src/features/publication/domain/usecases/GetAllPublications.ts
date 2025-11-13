import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { Publication } from '../entities';
import { PublicationRepository } from '../repositories/PublicationRepository';
import { ListResult } from '../../../../shared/domain/entities';
import { PublicationListParams } from '../../../../types';

/**
 * Use case for getting all publications
 */
export class GetAllPublications {
  constructor(private readonly repository: PublicationRepository) {}

  async execute(
    params: PublicationListParams
  ): Promise<Result<ListResult<Publication>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
