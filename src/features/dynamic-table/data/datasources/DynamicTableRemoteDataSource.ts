import { Result } from 'neverthrow';
import { ApiEndpoint, NetworkClient } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { DynamicTableParams, ResponseData } from '../../../../types';

/**
 * Remote data source for DynamicTable operations
 *
 * Note: The list of dynamic tables is handled by the Variable endpoint.
 * This datasource fetches variables which represent available tables.
 */
export class DynamicTableRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Gets all dynamic tables from the API
   * Uses the Variable endpoint since there's no dedicated dynamic table list endpoint
   * @param params - Dynamic table parameters
   * @returns Result containing response data or failure
   */
  async getAll(
    params: DynamicTableParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {};

    // For list operation, use domain from BaseListParams or fallback to tableId
    if (params.domain) {
      queryParams['domain'] = params.domain;
    } else {
      queryParams['domain'] = params.tableId;
    }

    if (params.lang) {
      queryParams['lang'] = params.lang;
    }

    if (params.page) {
      queryParams['page'] = params.page.toString();
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.VARIABLE_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
