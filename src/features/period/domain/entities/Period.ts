import { BaseEntity } from '../../../../core';

/**
 * Represents a time period for statistical data
 */
export class Period extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly label: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      period_id: this.id,
      label: this.label,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): Period {
    return new Period(
      Number(json.period_id || json.id || 0),
      String(json.label || json.name || '')
    );
  }
}
