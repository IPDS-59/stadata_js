import { Result } from 'neverthrow';
import { ApiEndpoint, NetworkClient } from '../../../../core';
import { ApiFailure } from '../../../../core/failures';
import { CensusListParams, ResponseData, ViewParams } from '../../../../types';

/**
 * Remote data source for Census operations
 */
export class CensusRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Gets all census events from the API
   * @param params - List parameters
   * @returns Result containing response data or failure
   */
  async getAll(
    params?: CensusListParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {
      id: '37', // Census events require id=37
    };

    if (params?.domain) {
      queryParams['domain'] = params.domain;
    }

    if (params?.lang) {
      queryParams['lang'] = params.lang;
    }

    if (params?.page) {
      queryParams['page'] = params.page.toString();
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.CENSUS_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params?.cancelToken,
    });
  }

  /**
   * Gets a census event by ID from the API
   * @param params - View parameters
   * @returns Result containing response data or failure
   */
  async getById(params: ViewParams): Promise<Result<Record<string, unknown>, ApiFailure>> {
    const queryParams: Record<string, string> = {
      id: params.id.toString(),
      domain: params.domain,
    };

    if (params.lang) {
      queryParams['lang'] = params.lang;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.CENSUS_VIEW}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<Record<string, unknown>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
