import { BaseEntity } from '../../../../core';

/**
 * Represents a derived period entity
 */
export class DerivedPeriod extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly label: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      derived_period_id: this.id,
      label: this.label,
    };
  }

  static fromJson(json: Record<string, unknown>): DerivedPeriod {
    return new DerivedPeriod(
      Number(json.derived_period_id || json.id || 0),
      String(json.label || json.name || '')
    );
  }
}
