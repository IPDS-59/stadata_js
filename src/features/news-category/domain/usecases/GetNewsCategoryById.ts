import { Result } from 'neverthrow';
import { UseCase } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ViewParams } from '../../../../types';
import { NewsCategory } from '../entities';
import { NewsCategoryRepository } from '../repositories';

/**
 * Use case for getting a news category by ID
 */
export class GetNewsCategoryById implements UseCase<ViewParams, NewsCategory> {
  constructor(private readonly repository: NewsCategoryRepository) {}

  async execute(params: ViewParams): Promise<Result<NewsCategory, ApiFailure>> {
    return this.repository.getById(params);
  }
}
