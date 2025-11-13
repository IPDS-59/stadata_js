import { BaseEntity } from '../../../../core';

/**
 * Represents a vertical variable (sub-variable of a main variable)
 */
export class VerticalVariable extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly variableId: number,
    public readonly label: string,
    public readonly alias: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      vervar_id: this.id,
      var_id: this.variableId,
      label: this.label,
      alias: this.alias,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): VerticalVariable {
    return new VerticalVariable(
      Number(json.vervar_id || json.id || 0),
      Number(json.var_id || json.variableId || 0),
      String(json.label || ''),
      String(json.alias || '')
    );
  }
}
