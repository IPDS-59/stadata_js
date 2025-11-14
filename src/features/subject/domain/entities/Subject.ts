import { BaseEntity } from '../../../../core';

/**
 * Represents a subject (subject matter/topic)
 */
export class Subject extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly categoryId: number
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      subj_id: this.id,
      title: this.name,
      subcatid: this.categoryId,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): Subject {
    return new Subject(
      Number(json.subj_id || json.id || 0),
      String(json.title || json.name || ''),
      Number(json.subcatid || json.categoryId || 0)
    );
  }
}
