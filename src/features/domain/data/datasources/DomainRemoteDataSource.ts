import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiEndpoint } from '../../../../core/constants';
import { ApiFailure } from '../../../../core/failures';
import { DomainListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for domains
 * Handles API calls for domain data
 */
export class DomainRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Fetches all domains from API
   */
  async getAll(
    params?: DomainListParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {};

    if (params?.lang) {
      queryParams['lang'] = params.lang;
    }
    if (params?.page) {
      queryParams['page'] = params.page.toString();
    }
    if (params?.perPage) {
      queryParams['per_page'] = params.perPage.toString();
    }
    if (params?.keyword) {
      queryParams['keyword'] = params.keyword;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.DOMAIN_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params?.cancelToken,
    });
  }

  /**
   * Fetches a domain by ID from API
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
    if (params.id) {
      queryParams['id'] = params.id.toString();
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.DOMAIN_VIEW}?${queryString}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
