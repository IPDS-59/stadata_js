import { BaseEntity } from '../../../../core';

/**
 * Represents a census event
 */
export class Census extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly activity: string,
    public readonly year: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      kegiatan: this.activity,
      tahun_kegiatan: this.year,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): Census {
    return new Census(
      Number(json.id || 0),
      String(json.kegiatan || json.activity || ''),
      String(json.tahun_kegiatan || json.year || '')
    );
  }
}
