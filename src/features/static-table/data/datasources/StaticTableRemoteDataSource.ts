import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiEndpoint } from '../../../../core/constants';
import { ApiFailure } from '../../../../core/failures';
import { StaticTableListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for static tables
 * Handles API calls for static table data
 */
export class StaticTableRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Fetches all static tables from API
   */
  async getAll(
    params: StaticTableListParams
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
    const url = `${ApiEndpoint.STATIC_TABLE_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }

  /**
   * Fetches a static table by ID from API
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
    const url = `${ApiEndpoint.STATIC_TABLE_LIST}/${params.id}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
