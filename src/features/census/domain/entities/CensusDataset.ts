import { BaseEntity } from '../../../../core';

/**
 * Represents a census dataset (id=40)
 */
export class CensusDataset extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly topicId: number,
    public readonly topic: string,
    public readonly eventId: number,
    public readonly name: string,
    public readonly description?: string | null
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    const json: Record<string, unknown> = {
      id: this.id,
      id_topik: this.topicId,
      topik: this.topic,
      id_kegiatan: this.eventId,
      nama: this.name,
    };

    if (this.description !== undefined && this.description !== null) {
      json.deskripsi = this.description;
    }

    return json;
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
  static fromJson(json: Record<string, unknown>): CensusDataset {
    return new CensusDataset(
      Number(json.id || 0),
      Number(json.id_topik || 0),
      String(json.topik || ''),
      Number(json.id_kegiatan || 0),
      String(json.nama || ''),
      json.deskripsi ? String(json.deskripsi) : null
    );
  }
}
