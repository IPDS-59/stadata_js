import { BaseEntity } from '../../../../core';

/**
 * Represents a strategic indicator
 */
export class StrategicIndicator extends BaseEntity {
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
      ind_id: this.id,
      ind_name: this.name,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): StrategicIndicator {
    return new StrategicIndicator(
      Number(json.ind_id || json.id || 0),
      String(json.ind_name || json.name || '')
    );
  }
}
