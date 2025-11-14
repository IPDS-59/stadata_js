import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ListResult } from '../../../../shared/domain/entities';
import { NewsCategoryListParams } from '../../../../types';
import { NewsCategory } from '../entities';
import { NewsCategoryRepository } from '../repositories';

/**
 * Use case for getting all news categories
 */
export class GetAllNewsCategories
  implements UseCase<NewsCategoryListParams | undefined, ListResult<NewsCategory>>
{
  constructor(private readonly repository: NewsCategoryRepository) {}

  async execute(
    params?: NewsCategoryListParams
  ): Promise<Result<ListResult<NewsCategory>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
