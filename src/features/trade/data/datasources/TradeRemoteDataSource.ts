import { Result } from 'neverthrow';
import { ApiEndpoint, NetworkClient } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { ResponseData, TradeParams } from '../../../../types';

/**
 * Remote data source for Trade operations
 */
export class TradeRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Gets trade data from the API
   * @param params - Trade parameters
   * @returns Result containing response data or failure
   */
  async get(
    params: TradeParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {
      sumber: params.source.toString(),
      periode: params.period.toString(),
      kodehs: params.hsCode,
      jenishs: params.hsType.toString(),
      Tahun: params.year,
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.TRADE}?${queryString}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
