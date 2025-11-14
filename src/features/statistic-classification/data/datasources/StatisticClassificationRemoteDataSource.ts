import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiFailure } from '../../../../core/failures';
import { ApiEndpoint } from '../../../../core/constants';
import { StatisticClassificationListParams, ViewParams, ResponseData } from '../../../../types';
import { ClassificationType } from '../../../../shared/enums';

/**
 * Remote data source for statistic classification operations
 */
export class StatisticClassificationRemoteDataSource {
  constructor(private readonly client: NetworkClient) {}

  /**
   * Gets all statistic classifications from the API
   */
  async getAll(
    params?: StatisticClassificationListParams
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

    if (params?.keyword) {
      queryParams['keyword'] = params.keyword;
    }

    if (params?.level) {
      queryParams['level'] = params.level;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const classificationType = params?.type || ClassificationType.KBLI_2020;
    const url = `${ApiEndpoint.statisticClassification(classificationType)}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params?.cancelToken,
    });
  }

  /**
   * Gets a statistic classification by ID from the API
   */
  async getById(
    params: ViewParams & { type?: ClassificationType }
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {
      id: params.id.toString(),
    };

    if (params.lang) {
      queryParams['lang'] = params.lang;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const classificationType = params.type || ClassificationType.KBLI_2020;
    const url = `${ApiEndpoint.statisticClassification(classificationType)}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
