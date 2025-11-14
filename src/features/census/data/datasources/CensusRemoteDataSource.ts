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
   * Gets census data from the API based on type
   * @param params - List parameters
   * @returns Result containing response data or failure
   */
  async getAll(
    params?: CensusListParams
  ): Promise<Result<ResponseData<Record<string, unknown>>, ApiFailure>> {
    const queryParams: Record<string, string> = {};

    // Determine which endpoint and parameters based on type
    switch (params?.type) {
      case 'topics':
        // id=38 for census topics
        queryParams['id'] = '38';
        if (params.censusId) {
          queryParams['event'] = params.censusId;
        }
        break;

      case 'areas':
        // id=39 for census areas
        queryParams['id'] = '39';
        if (params.censusId) {
          queryParams['event'] = params.censusId;
        }
        break;

      case 'datasets':
        // id=40 for census datasets
        queryParams['id'] = '40';
        if (params.censusId) {
          queryParams['event'] = params.censusId;
        }
        if (params.topicId) {
          queryParams['topic'] = params.topicId.toString();
        }
        break;

      case 'data':
        // id=41 for census data
        queryParams['id'] = '41';
        if (params.censusId) {
          queryParams['event'] = params.censusId;
        }
        if (params.censusAreaId) {
          queryParams['censusarea'] = params.censusAreaId;
        }
        if (params.datasetId) {
          queryParams['dataset'] = params.datasetId;
        }
        break;

      default:
        // id=37 for census events (default)
        queryParams['id'] = '37';
        break;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.CENSUS}${queryString ? `?${queryString}` : ''}`;

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
    const url = `${ApiEndpoint.CENSUS}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<Record<string, unknown>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
