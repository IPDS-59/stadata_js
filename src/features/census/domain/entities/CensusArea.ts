import { BaseEntity } from '../../../../core';

/**
 * Represents a census area (id=39)
 */
export class CensusArea extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly mfdCode: string,
    public readonly name: string,
    public readonly slug: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      kode_mfd: this.mfdCode,
      nama: this.name,
      slug: this.slug,
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
  static fromJson(json: Record<string, unknown>): CensusArea {
    return new CensusArea(
      Number(json.id || 0),
      String(json.kode_mfd || ''),
      String(json.nama || ''),
      String(json.slug || '')
    );
  }
}
