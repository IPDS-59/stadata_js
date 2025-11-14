import { Result } from 'neverthrow';
import { ApiEndpoint, NetworkClient } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { DynamicTableParams, ResponseData } from '../../../../types';

/**
 * Remote data source for DynamicTable operations
 *
 * Fetches dynamic table data from the /list/model/data endpoint
 */
export class DynamicTableRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Gets all dynamic table data from the API
   * @param params - Dynamic table parameters
   * @returns Result containing response data or failure
   */
  async getAll(
    params: DynamicTableParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {
      model: 'data',
      domain: params.domain || '',
      var: params.variableId.toString(),
    };

    if (params.lang) {
      queryParams['lang'] = params.lang;
    }

    if (params.page) {
      queryParams['page'] = params.page.toString();
    }

    if (params.verticalVariableId !== undefined) {
      queryParams['vervar'] = params.verticalVariableId.toString();
    }

    if (params.derivedVariableId !== undefined) {
      queryParams['turvar'] = params.derivedVariableId.toString();
    }

    if (params.periodId !== undefined) {
      queryParams['th'] = params.periodId.toString();
    }

    if (params.derivedPeriodId !== undefined) {
      queryParams['turth'] = params.derivedPeriodId.toString();
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.DYNAMIC_TABLE_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
