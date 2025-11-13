/**
 * Pagination metadata
 */
export interface IPagination {
  page: number;
  perPage: number;
  total: number;
  pages: number;
  count: number;
}

/**
 * Pagination class
 */
export class Pagination implements IPagination {
  constructor(
    public readonly page: number,
    public readonly perPage: number,
    public readonly total: number,
    public readonly pages: number,
    public readonly count: number
  ) {}

  static fromJson(json: Record<string, unknown>): Pagination {
    return new Pagination(
      json.page as number,
      json.per_page as number,
      json.total as number,
      json.pages as number,
      json.count as number
    );
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

  get hasNextPage(): boolean {
    return this.page < this.pages;
  }

  get hasPreviousPage(): boolean {
    return this.page > 1;
  }
}
