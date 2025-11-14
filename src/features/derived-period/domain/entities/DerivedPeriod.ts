import { BaseEntity } from '../../../../core';

/**
 * Represents a derived period entity
 */
export class DerivedPeriod extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly period: string,
    public readonly groupId: number,
    public readonly groupName: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      turth_id: this.id,
      turth: this.period,
      group_turth_id: this.groupId,
      name_group_turth: this.groupName,
    };
  }

  static fromJson(json: Record<string, unknown>): DerivedPeriod {
    return new DerivedPeriod(
      Number(json.turth_id || json.id || 0),
      String(json.turth || json.period || ''),
      Number(json.group_turth_id || json.groupId || 0),
      String(json.name_group_turth || json.groupName || '')
    );
  }
}
