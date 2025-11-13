import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiEndpoint } from '../../../../core/constants';
import { ApiFailure } from '../../../../core/failures';
import { PressReleaseListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for press releases
 * Handles API calls for press release data
 */
export class PressReleaseRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Fetches all press releases from API
   */
  async getAll(
    params: PressReleaseListParams
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
    if (params.month) {
      queryParams['month'] = params.month.toString();
    }
    if (params.year) {
      queryParams['year'] = params.year.toString();
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.PRESS_RELEASE_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }

  /**
   * Fetches a press release by ID from API
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
    const url = `${ApiEndpoint.PRESS_RELEASE_LIST}/${params.id}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
