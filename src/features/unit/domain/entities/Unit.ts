import { BaseEntity } from '../../../../core';

/**
 * Represents a unit of measurement
 */
export class Unit extends BaseEntity {
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
      unit_id: this.id,
      unit: this.name,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): Unit {
    return new Unit(Number(json.unit_id || json.id || 0), String(json.unit || json.name || ''));
  }
}
