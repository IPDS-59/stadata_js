import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { PressRelease } from '../entities';
import { PressReleaseRepository } from '../repositories/PressReleaseRepository';
import { ViewParams } from '../../../../types';

/**
 * Use case for getting a specific press release by ID
 */
export class GetPressReleaseById {
  constructor(private readonly repository: PressReleaseRepository) {}

  async execute(params: ViewParams): Promise<Result<PressRelease, ApiFailure>> {
    return this.repository.getById(params);
  }
}
