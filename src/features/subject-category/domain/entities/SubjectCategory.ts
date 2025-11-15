import { BaseEntity } from '../../../../core';

/**
 * Represents a subject category
 */
export class SubjectCategory extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly name: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      subcat_id: this.id,
      subcat_name: this.name,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): SubjectCategory {
    return new SubjectCategory(
      Number(json.subcat_id || json.id || 0),
      String(json.subcat_name || json.title || json.name || '')
    );
  }
}
