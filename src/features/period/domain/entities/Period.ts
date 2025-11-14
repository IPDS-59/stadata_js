import { BaseEntity } from '../../../../core';

/**
 * Represents a time period for statistical data
 */
export class Period extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly period: number
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      th_id: this.id,
      th: this.period,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): Period {
    return new Period(Number(json.th_id || json.id || 0), Number(json.th || json.period || 0));
  }
}
