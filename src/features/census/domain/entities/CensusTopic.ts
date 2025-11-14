import { BaseEntity } from '../../../../core';

/**
 * Represents a census topic (id=38)
 */
export class CensusTopic extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly topic: string,
    public readonly eventId: string,
    public readonly eventName: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      topik: this.topic,
      id_kegiatan: this.eventId,
      kegiatan: this.eventName,
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
  static fromJson(json: Record<string, unknown>): CensusTopic {
    return new CensusTopic(
      Number(json.id || 0),
      String(json.topik || ''),
      String(json.id_kegiatan || ''),
      String(json.kegiatan || '')
    );
  }
}
