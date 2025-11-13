import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiFailure } from '../../../../core/failures';
import { ApiEndpoint } from '../../../../core/constants';
import { SubjectCategoryListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for subject category operations
 */
export class SubjectCategoryRemoteDataSource {
  constructor(private readonly client: NetworkClient) {}

  /**
   * Gets all subject categories from the API
   */
  async getAll(
    params?: SubjectCategoryListParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {};

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
    const url = `${ApiEndpoint.SUBJECT_CATEGORY_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params?.cancelToken,
    });
  }

  /**
   * Gets a subject category by ID from the API
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
    const url = `${ApiEndpoint.SUBJECT_CATEGORY_LIST}/${params.id}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
