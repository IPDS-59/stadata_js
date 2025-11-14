import { Result } from 'neverthrow';
import { UseCase } from '../../../../core/base';
import { ApiFailure } from '../../../../core/failures';
import { ResponseData, TradeParams } from '../../../../types';
import { TradeRepository } from '../repositories/TradeRepository';

/**
 * Use case for getting trade data
 */
export class GetTrade implements UseCase<TradeParams, ResponseData<Record<string, unknown>>> {
  constructor(private repository: TradeRepository) {}

  execute(params: TradeParams): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    return this.repository.get(params);
  }
}
