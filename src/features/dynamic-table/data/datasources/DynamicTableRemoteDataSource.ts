import { Result } from 'neverthrow';
import { ApiEndpoint, NetworkClient } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { DynamicTableParams } from '../../../../types';

/**
 * Response type for dynamic table detail endpoint
 */
export interface DynamicTableResponse {
  status: string;
  'data-availability': string;
  last_update?: string | null;
  subject?: Array<Record<string, unknown>>;
  var?: Array<Record<string, unknown>>;
  turvar?: Array<Record<string, unknown>>;
  labelvervar?: string;
  vervar?: Array<Record<string, unknown>>;
  tahun?: Array<Record<string, unknown>>;
  turtahun?: Array<Record<string, unknown>>;
  datacontent?: Record<string, unknown>;
  related?: unknown[];
}

/**
 * Remote data source for DynamicTable operations
 *
 * Fetches dynamic table data from the /list/model/data endpoint
 */
export class DynamicTableRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Gets dynamic table data from the API
   * @param params - Dynamic table parameters
   * @returns Result containing dynamic table response or failure
   */
  async getAll(params: DynamicTableParams): Promise<Result<DynamicTableResponse, ApiFailure>> {
    const queryParams: Record<string, string> = {
      domain: params.domain || '',
      var: params.variableId.toString(),
      th: params.periodId.toString(),
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

    if (params.derivedPeriodId !== undefined) {
      queryParams['turth'] = params.derivedPeriodId.toString();
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.DYNAMIC_TABLE_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<DynamicTableResponse>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
