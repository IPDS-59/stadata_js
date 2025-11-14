import { BaseEntity } from '../../../../core';

/**
 * Represents a news category
 */
export class NewsCategory extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      newscat_id: this.id,
      newscat_name: this.name,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): NewsCategory {
    return new NewsCategory(
      String(json.newscat_id || json.id || ''),
      String(json.newscat_name || json.name || '')
    );
  }
}
