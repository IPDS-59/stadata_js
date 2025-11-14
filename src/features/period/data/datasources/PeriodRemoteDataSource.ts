import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiFailure } from '../../../../core/failures';
import { ApiEndpoint } from '../../../../core/constants';
import { PeriodListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for period operations
 */
export class PeriodRemoteDataSource {
  constructor(private readonly client: NetworkClient) {}

  /**
   * Gets all periods from the API
   */
  async getAll(
    params: PeriodListParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {};

    if (params.variableId !== undefined) {
      queryParams['var'] = params.variableId.toString();
    }

    if (params.domain) {
      queryParams['domain'] = params.domain;
    }

    if (params.lang) {
      queryParams['lang'] = params.lang;
    }

    if (params.page) {
      queryParams['page'] = params.page.toString();
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.PERIOD_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }

  /**
   * Gets a period by ID from the API
   */
  async getById(
    params: ViewParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {
      domain: params.domain,
    };

    if (params.lang) {
      queryParams['lang'] = params.lang;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.PERIOD_VIEW}/${params.id}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
