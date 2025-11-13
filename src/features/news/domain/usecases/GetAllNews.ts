import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { News } from '../entities';
import { NewsRepository } from '../repositories/NewsRepository';
import { ListResult } from '../../../../shared/domain/entities';
import { NewsListParams } from '../../../../types';

/**
 * Use case for getting all news
 */
export class GetAllNews {
  constructor(private readonly repository: NewsRepository) {}

  async execute(params: NewsListParams): Promise<Result<ListResult<News>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
