import { Result } from 'neverthrow';
import { NetworkClient } from '../../../../core/network';
import { ApiEndpoint } from '../../../../core/constants';
import { ApiFailure } from '../../../../core/failures';
import { NewsListParams, ViewParams, ResponseData } from '../../../../types';

/**
 * Remote data source for news
 * Handles API calls for news data
 */
export class NewsRemoteDataSource {
  constructor(private client: NetworkClient) {}

  /**
   * Fetches all news from API
   */
  async getAll(
    params: NewsListParams
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
    if (params.newsCategoryId) {
      queryParams['news_category_id'] = params.newsCategoryId;
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${ApiEndpoint.NEWS_LIST}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }

  /**
   * Fetches a news item by ID from API
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
    const url = `${ApiEndpoint.NEWS_LIST}/${params.id}${queryString ? `?${queryString}` : ''}`;

    return this.client.get<ResponseData<Record<string, unknown>>>(url, {
      cancelToken: params.cancelToken,
    });
  }
}
