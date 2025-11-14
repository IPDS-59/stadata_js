import { Pagination } from './pagination';

/**
 * API response structure
 */
export interface IApiResponse<T> {
  data: T[];
  dataAvailability?: string;
  pagination?: Pagination;
}

/**
 * API response class
 */
export class ApiResponse<T> implements IApiResponse<T> {
  constructor(
    public readonly data: T[],
    public readonly dataAvailability?: string,
    public readonly pagination?: Pagination
  ) {}

  static fromJson<T>(
    json: Record<string, unknown>,
    fromJsonT: (json: Record<string, unknown>) => T
  ): ApiResponse<T> {
    const dataList = json['data-availability'] || json.data || json['data[1]'];

    if (!Array.isArray(dataList)) {
      throw new Error('Invalid API response: data is not an array');
    }

    const data = dataList.map((item) => {
      if (typeof item === 'object' && item !== null) {
        return fromJsonT(item as Record<string, unknown>);
      }
      throw new Error('Invalid API response: data item is not an object');
    });

    const pagination = json.pagination
      ? Pagination.fromJson(json.pagination as Record<string, unknown>)
      : undefined;

    const dataAvailability =
      typeof json['data-availability'] === 'string' ? json['data-availability'] : undefined;

    return new ApiResponse(data, dataAvailability, pagination);
  }

  toJson(toJsonT: (item: T) => Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {
      data: this.data.map((item) => toJsonT(item)),
    };

    if (this.dataAvailability) {
      result['data-availability'] = this.dataAvailability;
    }

    if (this.pagination) {
      result.pagination = this.pagination.toJson();
    }

    return result;
  }
}
