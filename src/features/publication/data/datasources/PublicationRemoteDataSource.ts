import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiEndpoint } from '../../../../core/constants';
import { ApiFailure } from '../../../../core/failures';
import { PublicationListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for publications
 * Handles API calls for publication data
 */
export class PublicationRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Fetches all publications from API
   */
  async getAll(
    params: PublicationListParams
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
    const url = `${ApiEndpoint.PUBLICATION_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }

  /**
   * Fetches a publication by ID from API
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
    const url = `${ApiEndpoint.PUBLICATION_LIST}/${params.id}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
