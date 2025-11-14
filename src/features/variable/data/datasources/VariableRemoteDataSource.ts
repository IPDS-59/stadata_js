import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiFailure } from '../../../../core/failures';
import { ApiEndpoint } from '../../../../core/constants';
import { VariableListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for variable operations
 */
export class VariableRemoteDataSource {
  constructor(private readonly client: NetworkClient) {}

  /**
   * Gets all variables from the API
   */
  async getAll(
    params?: VariableListParams
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

    if (params?.subjectId) {
      queryParams['subject'] = params.subjectId.toString();
    }

    if (params?.showDeleted !== undefined) {
      queryParams['show_deleted'] = params.showDeleted ? '1' : '0';
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.VARIABLE_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params?.cancelToken,
    });
  }

  /**
   * Gets a variable by ID from the API
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
    const url = `${ApiEndpoint.VARIABLE_VIEW}/${params.id}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
