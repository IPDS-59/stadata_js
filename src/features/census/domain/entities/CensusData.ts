import { BaseEntity } from '../../../../core';
import { CensusCategory } from './CensusCategory';

/**
 * Represents census data (id=41)
 */
export class CensusData extends BaseEntity {
  constructor(
    public readonly regionId: string,
    public readonly regionCode: string,
    public readonly regionName: string,
    public readonly indicatorId: string,
    public readonly indicatorName: string,
    public readonly categories: CensusCategory[],
    public readonly period: string,
    public readonly value: number,
    public readonly regionLevel?: string | null
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    const json: Record<string, unknown> = {
      id_wilayah: this.regionId,
      kode_wilayah: this.regionCode,
      nama_wilayah: this.regionName,
      id_indikator: this.indicatorId,
      nama_indikator: this.indicatorName,
      period: this.period,
      nilai: this.value,
    };

    if (this.regionLevel !== undefined && this.regionLevel !== null) {
      json.level_wilayah = this.regionLevel;
    }

    // Serialize categories back to individual fields
    for (let i = 0; i < this.categories.length && i < 5; i++) {
      const category = this.categories[i];
      const num = i + 1;
      json[`id_kategori_${num}`] = category.id;
      json[`nama_kategori_${num}`] = category.name;
      json[`id_item_kategori_${num}`] = category.itemId;
      json[`kode_item_kategori_${num}`] = category.itemCode;
      json[`nama_item__kategori_${num}`] = category.itemName;
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
  static fromJson(json: Record<string, unknown>): CensusData {
    // Parse categories from JSON
    const categories: CensusCategory[] = [];

    for (let i = 1; i <= 5; i++) {
      const categoryId = String(json[`id_kategori_${i}`] || '');
      const categoryName = String(json[`nama_kategori_${i}`] || '');
      const itemId = String(json[`id_item_kategori_${i}`] || '');
      const itemCode = String(json[`kode_item_kategori_${i}`] || '');
      const itemName = String(json[`nama_item__kategori_${i}`] || '');

      // Skip if any required field is empty
      if (!categoryId || !categoryName || !itemId || !itemCode || !itemName) {
        continue;
      }

      categories.push(
        new CensusCategory(categoryId, categoryName, itemId, itemCode, itemName)
      );
    }

    return new CensusData(
      String(json.id_wilayah || ''),
      String(json.kode_wilayah || ''),
      String(json.nama_wilayah || ''),
      String(json.id_indikator || ''),
      String(json.nama_indikator || ''),
      categories,
      String(json.period || ''),
      Number(json.nilai || 0),
      json.level_wilayah ? String(json.level_wilayah) : null
    );
  }
}
