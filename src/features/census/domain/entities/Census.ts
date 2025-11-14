import { BaseEntity } from '../../../../core';

/**
 * Represents a category in census data
 */
export interface CensusCategory {
  id: string;
  name: string;
  itemId: string;
  itemCode: string;
  itemName: string;
}

/**
 * Represents census data with area, indicator, and categories
 */
export class Census extends BaseEntity {
  constructor(
    // Census event fields (for id=37)
    public readonly id?: number,
    public readonly activity?: string,
    public readonly year?: string,

    // Census data fields (for id=41)
    public readonly areaId?: string,
    public readonly areaCode?: string,
    public readonly areaName?: string,
    public readonly areaLevel?: number,
    public readonly indicatorId?: string,
    public readonly indicatorName?: string,
    public readonly category1?: CensusCategory | null,
    public readonly category2?: CensusCategory | null,
    public readonly category3?: CensusCategory | null,
    public readonly category4?: CensusCategory | null,
    public readonly category5?: CensusCategory | null,
    public readonly period?: string,
    public readonly value?: number
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    const json: Record<string, unknown> = {};

    // Census event fields
    if (this.id !== undefined) json.id = this.id;
    if (this.activity) json.kegiatan = this.activity;
    if (this.year) json.tahun_kegiatan = this.year;

    // Census data fields
    if (this.areaId) json.id_wilayah = this.areaId;
    if (this.areaCode) json.kode_wilayah = this.areaCode;
    if (this.areaName) json.nama_wilayah = this.areaName;
    if (this.areaLevel !== undefined) json.level_wilayah = this.areaLevel;
    if (this.indicatorId) json.id_indikator = this.indicatorId;
    if (this.indicatorName) json.nama_indikator = this.indicatorName;

    if (this.category1) {
      json.id_kategori_1 = this.category1.id;
      json.nama_kategori_1 = this.category1.name;
      json.id_item_kategori_1 = this.category1.itemId;
      json.kode_item_kategori_1 = this.category1.itemCode;
      json.nama_item__kategori_1 = this.category1.itemName;
    }

    if (this.category2) {
      json.id_kategori_2 = this.category2.id;
      json.nama_kategori_2 = this.category2.name;
      json.id_item_kategori_2 = this.category2.itemId;
      json.kode_item_kategori_2 = this.category2.itemCode;
      json.nama_item__kategori_2 = this.category2.itemName;
    }

    if (this.category3) {
      json.id_kategori_3 = this.category3.id;
      json.nama_kategori_3 = this.category3.name;
      json.id_item_kategori_3 = this.category3.itemId;
      json.kode_item_kategori_3 = this.category3.itemCode;
      json.nama_item__kategori_3 = this.category3.itemName;
    }

    if (this.category4) {
      json.id_kategori_4 = this.category4.id;
      json.nama_kategori_4 = this.category4.name;
      json.id_item_kategori_4 = this.category4.itemId;
      json.kode_item_kategori_4 = this.category4.itemCode;
      json.nama_item__kategori_4 = this.category4.itemName;
    }

    if (this.category5) {
      json.id_kategori_5 = this.category5.id;
      json.nama_kategori_5 = this.category5.name;
      json.id_item_kategori_5 = this.category5.itemId;
      json.kode_item_kategori_5 = this.category5.itemCode;
      json.nama_item__kategori_5 = this.category5.itemName;
    }

    if (this.period) json.period = this.period;
    if (this.value !== undefined) json.nilai = this.value;

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
  static fromJson(json: Record<string, unknown>): Census {
    // Helper function to parse category
    const parseCategory = (num: number): CensusCategory | null => {
      const id = String(json[`id_kategori_${num}`] || '');
      const name = String(json[`nama_kategori_${num}`] || '');
      const itemId = String(json[`id_item_kategori_${num}`] || '');
      const itemCode = String(json[`kode_item_kategori_${num}`] || '');
      const itemName = String(json[`nama_item__kategori_${num}`] || '');

      // Return null if category is empty (all fields are empty strings)
      if (!id && !name && !itemId && !itemCode && !itemName) {
        return null;
      }

      return {
        id,
        name,
        itemId,
        itemCode,
        itemName,
      };
    };

    return new Census(
      // Census event fields (for id=37)
      json.id !== undefined ? Number(json.id) : undefined,
      json.kegiatan ? String(json.kegiatan) : json.activity ? String(json.activity) : undefined,
      json.tahun_kegiatan ? String(json.tahun_kegiatan) : json.year ? String(json.year) : undefined,

      // Census data fields (for id=41)
      json.id_wilayah ? String(json.id_wilayah) : undefined,
      json.kode_wilayah ? String(json.kode_wilayah) : undefined,
      json.nama_wilayah ? String(json.nama_wilayah) : undefined,
      json.level_wilayah !== undefined ? Number(json.level_wilayah) : undefined,
      json.id_indikator ? String(json.id_indikator) : undefined,
      json.nama_indikator ? String(json.nama_indikator) : undefined,
      parseCategory(1),
      parseCategory(2),
      parseCategory(3),
      parseCategory(4),
      parseCategory(5),
      json.period ? String(json.period) : undefined,
      json.nilai !== undefined ? Number(json.nilai) : undefined
    );
  }
}

