import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { PressRelease } from '../entities';
import { PressReleaseRepository } from '../repositories/PressReleaseRepository';
import { ListResult } from '../../../../shared/domain/entities';
import { PressReleaseListParams } from '../../../../types';

/**
 * Use case for getting all press releases
 */
export class GetAllPressReleases {
  constructor(private readonly repository: PressReleaseRepository) {}

  async execute(
    params: PressReleaseListParams
  ): Promise<Result<ListResult<PressRelease>, ApiFailure>> {
    return this.repository.getAll(params);
  }
}
