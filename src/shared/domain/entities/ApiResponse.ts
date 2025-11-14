import { BaseEntity } from '../../../core/base';
import { Pagination } from './Pagination';

/**
 * Generic API response entity
 */
export class ApiResponse<T> extends BaseEntity {
  constructor(
    public readonly data: T[],
    public readonly dataAvailability: string,
    public readonly pagination?: Pagination
  ) {
    super();
  }

  /**
   * Checks if data is available
   */
  get isAvailable(): boolean {
    return this.dataAvailability === 'available';
  }

  /**
   * Gets the total number of items
   */
  get totalItems(): number {
    return this.pagination?.total || this.data.length;
  }

  /**
   * Checks if the response has data
   */
  get hasData(): boolean {
    return this.data.length > 0;
  }

  toJson(): Record<string, unknown> {
    return {
      data: this.data,
      data_availability: this.dataAvailability,
      pagination: this.pagination?.toJson(),
    };
  }

  static fromJson<T>(
    json: Record<string, unknown>,
    itemFactory: (item: Record<string, unknown>) => T
  ): ApiResponse<T> {
    const dataArray = (json['data'] as Array<Record<string, unknown>>) || [];
    const data = dataArray.map((item) => itemFactory(item));

    const paginationData = json['pagination'] as Record<string, unknown> | undefined;
    const pagination = paginationData ? Pagination.fromJson(paginationData) : undefined;

    return new ApiResponse(data, (json['data-availability'] as string) || 'available', pagination);
  }
}
