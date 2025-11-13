import { BaseEntity } from '../../../core/base';

/**
 * Pagination entity
 */
export class Pagination extends BaseEntity {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
    public readonly total: number,
    public readonly pages: number,
    public readonly count: number
  ) {
    super();
  }

  /**
   * Checks if there is a next page
   */
  get hasNextPage(): boolean {
    return this.page < this.pages;
  }

  /**
   * Checks if there is a previous page
   */
  get hasPreviousPage(): boolean {
    return this.page > 1;
  }

  /**
   * Gets the next page number
   */
  get nextPage(): number | null {
    return this.hasNextPage ? this.page + 1 : null;
  }

  /**
   * Gets the previous page number
   */
  get previousPage(): number | null {
    return this.hasPreviousPage ? this.page - 1 : null;
  }

  toJson(): Record<string, unknown> {
    return {
      page: this.page,
      per_page: this.perPage,
      total: this.total,
      pages: this.pages,
      count: this.count,
    };
  }

  static fromJson(json: Record<string, unknown>): Pagination {
    return new Pagination(
      (json['page'] as number) || 1,
      (json['per_page'] as number) || 10,
      (json['total'] as number) || 0,
      (json['pages'] as number) || 0,
      (json['count'] as number) || 0
    );
  }
}
