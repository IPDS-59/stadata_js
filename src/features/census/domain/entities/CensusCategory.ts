import { BaseEntity } from '../../../../core';

/**
 * Represents a category in census data
 */
export class CensusCategory extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly itemId: string,
    public readonly itemCode: string,
    public readonly itemName: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      itemID: this.itemId,
      itemCode: this.itemCode,
      itemName: this.itemName,
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
  static fromJson(json: Record<string, unknown>): CensusCategory {
    return new CensusCategory(
      String(json.id || ''),
      String(json.name || ''),
      String(json.itemID || ''),
      String(json.itemCode || ''),
      String(json.itemName || '')
    );
  }
}
