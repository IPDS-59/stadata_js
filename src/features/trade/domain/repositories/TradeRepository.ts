import { Result } from 'neverthrow';
import { ApiFailure } from '../../../../core/failures';
import { ResponseData, TradeParams } from '../../../../types';

/**
 * Repository interface for Trade operations
 */
export interface TradeRepository {
  /**
   * Gets trade data (export/import)
   * @param params - Trade parameters
   * @returns Result containing response data or failure
   */
  get(params: TradeParams): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>>;
}
