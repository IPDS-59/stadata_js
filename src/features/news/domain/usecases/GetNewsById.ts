import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { News } from '../entities';
import { NewsRepository } from '../repositories/NewsRepository';
import { ViewParams } from '../../../../types';

/**
 * Use case for getting a specific news item by ID
 */
export class GetNewsById {
  constructor(private readonly repository: NewsRepository) {}

  async execute(params: ViewParams): Promise<Result<News, ApiFailure>> {
    return this.repository.getById(params);
  }
}
