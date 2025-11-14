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
      category_id: this.id,
      category_name: this.name,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): NewsCategory {
    return new NewsCategory(
      String(json.category_id || json.id || ''),
      String(json.category_name || json.name || '')
    );
  }
}
