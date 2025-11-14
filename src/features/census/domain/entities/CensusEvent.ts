import { BaseEntity } from '../../../../core';

/**
 * Represents a census event (id=37)
 */
export class CensusEvent extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly year: number
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      kegiatan: this.name,
      tahun_kegiatan: this.year,
    };
  }

  /**
   * Custom JSON serialization for JSON.stringify()
   */
  toJSON(): Record<string, unknown> {
    return this.toJson();
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): CensusEvent {
    return new CensusEvent(
      String(json.id || ''),
      String(json.kegiatan || ''),
      Number(json.tahun_kegiatan || 0)
    );
  }
}
