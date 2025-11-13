import { BaseEntity } from '../../../core/base';
import { Pagination } from './Pagination';

/**
 * List result entity for paginated responses
 */
export class ListResult<T> extends BaseEntity {
  constructor(
    public readonly data: T[],
    public readonly pagination: Pagination
  ) {
    super();
  }

  /**
   * Checks if there is more data to load
   */
  get hasMore(): boolean {
    return this.pagination.hasNextPage;
  }

  /**
   * Gets the total number of items across all pages
   */
  get totalItems(): number {
    return this.pagination.total;
  }

  /**
   * Gets the current page items
   */
  get items(): T[] {
    return this.data;
  }

  /**
   * Gets the number of items in current page
   */
  get itemCount(): number {
    return this.data.length;
  }

  toJson(): Record<string, unknown> {
    return {
      data: this.data,
      pagination: this.pagination.toJson(),
    };
  }

  static fromJson<T>(
    json: Record<string, unknown>,
    itemFactory: (item: Record<string, unknown>) => T
  ): ListResult<T> {
    const dataArray = (json['data'] as Array<Record<string, unknown>>) || [];
    const data = dataArray.map((item) => itemFactory(item));

    const paginationData = json['pagination'] as Record<string, unknown>;
    const pagination = Pagination.fromJson(paginationData);

    return new ListResult(data, pagination);
  }
}
