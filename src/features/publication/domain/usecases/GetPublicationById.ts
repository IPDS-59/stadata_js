import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { Publication } from '../entities';
import { PublicationRepository } from '../repositories/PublicationRepository';
import { ViewParams } from '../../../../types';

/**
 * Use case for getting a publication by ID
 */
export class GetPublicationById {
  constructor(private readonly repository: PublicationRepository) {}

  async execute(params: ViewParams): Promise<Result<Publication, ApiFailure>> {
    return this.repository.getById(params);
  }
}
