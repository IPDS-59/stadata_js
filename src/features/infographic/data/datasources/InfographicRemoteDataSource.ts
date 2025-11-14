import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiEndpoint } from '../../../../core/constants';
import { ApiFailure } from '../../../../core/failures';
import { InfographicListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for infographics
 * Handles API calls for infographic data
 */
export class InfographicRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Fetches all infographics from API
   */
  async getAll(
    params: InfographicListParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {};

    if (params.domain) {
      queryParams['domain'] = params.domain;
    }
    if (params.lang) {
      queryParams['lang'] = params.lang;
    }
    if (params.page) {
      queryParams['page'] = params.page.toString();
    }
    if (params.keyword) {
      queryParams['keyword'] = params.keyword;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.INFOGRAPHIC_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }

  /**
   * Fetches an infographic by ID from API
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
    const url = `${ApiEndpoint.INFOGRAPHIC_LIST}/${params.id}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
