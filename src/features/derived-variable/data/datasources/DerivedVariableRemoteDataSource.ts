import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiFailure } from '../../../../core/failures';
import { ApiEndpoint } from '../../../../core/constants';
import { DerivedVariableListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for derived variable operations
 */
export class DerivedVariableRemoteDataSource {
  constructor(private readonly client: NetworkClient) {}

  /**
   * Gets all derived variables from the API
   */
  async getAll(
    params: DerivedVariableListParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {
      var: params.variableId.toString(),
    };

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
    const url = `${ApiEndpoint.DERIVED_VARIABLE_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }

  /**
   * Gets a derived variable by ID from the API
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
    const url = `${ApiEndpoint.DERIVED_VARIABLE_VIEW}/${params.id}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
