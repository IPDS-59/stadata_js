import { BaseEntity } from '../../../../core';

/**
 * Represents a derived variable entity
 */
export class DerivedVariable extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly groupId: number,
    public readonly groupName: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      turvar_id: this.id,
      turvar: this.name,
      group_turvar_id: this.groupId,
      name_group_turvar: this.groupName,
    };
  }

  static fromJson(json: Record<string, unknown>): DerivedVariable {
    return new DerivedVariable(
      Number(json.turvar_id || json.id || 0),
      String(json.turvar || json.name || ''),
      Number(json.group_turvar_id || json.groupId || 0),
      String(json.name_group_turvar || json.groupName || '')
    );
  }
}
