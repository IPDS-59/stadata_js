import { BaseEntity } from '../../../../core';

/**
 * Represents a derived variable entity
 */
export class DerivedVariable extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly name: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      derived_variable_id: this.id,
      derived_variable: this.name,
    };
  }

  static fromJson(json: Record<string, unknown>): DerivedVariable {
    return new DerivedVariable(
      Number(json.derived_variable_id || json.id || 0),
      String(json.derived_variable || json.name || '')
    );
  }
}
