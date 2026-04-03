import { StadataClient } from '../client';
import { TradeRemoteDataSource } from '../features/trade/data/datasources';
import { TradeRepositoryImpl } from '../features/trade/data/repositories';
import { TradeParams, ResponseData } from '../types';
import { Result } from 'neverthrow';
import { ApiFailure } from '../core/failures';

export interface UseTrade {
  fetchTradeData: (params: TradeParams) => Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>>;
}

/**
 * Composable for BPS Trade (ekspor/impor) API
 *
 * @example
 * ```typescript
 * const client = createStadataClient({ apiKey: 'key' })
 * const { fetchTradeData } = useTrade(client)
 *
 * const result = await fetchTradeData({ domain: '0000', lang: DataLanguage.ID, type: 'ekspor', year: 2023 })
 * ```
 */
export function useTrade(client: StadataClient): UseTrade {
  const dataSource = new TradeRemoteDataSource(client.networkClient);
  const repository = new TradeRepositoryImpl(dataSource);

  return {
    fetchTradeData: (params) => repository.get(params),
  };
}
