import { BaseEntity } from '../../../../core';

/**
 * Represents a vertical variable (sub-variable of a main variable)
 */
export class VerticalVariable extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly label: string,
    public readonly itemId: number,
    public readonly groupId: number,
    public readonly groupName: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      kode_ver_id: this.id,
      vervar: this.label,
      item_ver_id: this.itemId,
      group_ver_id: this.groupId,
      name_group_ver_id: this.groupName,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): VerticalVariable {
    return new VerticalVariable(
      Number(json.kode_ver_id || json.id || 0),
      String(json.vervar || json.label || ''),
      Number(json.item_ver_id || json.itemId || 0),
      Number(json.group_ver_id || json.groupId || 0),
      String(json.name_group_ver_id || json.groupName || '')
    );
  }
}
