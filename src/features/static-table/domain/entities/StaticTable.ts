import { BaseEntity } from '../../../../core';

/**
 * StaticTable entity representing a static table from BPS
 */
export class StaticTable extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly subjectId: number,
    public readonly size: string,
    public readonly updatedAt: string,
    public readonly excelUrl: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      table_id: this.id,
      title: this.title,
      subj_id: this.subjectId,
      size: this.size,
      updt_date: this.updatedAt,
      excel: this.excelUrl,
    };
  }

  static fromJson(json: Record<string, unknown>): StaticTable {
    return new StaticTable(
      String(json.table_id || json.id || ''),
      String(json.title || ''),
      Number(json.subj_id || json.subjectId || 0),
      String(json.size || ''),
      String(json.updt_date || json.updatedAt || ''),
      String(json.excel || json.excelUrl || '')
    );
  }
}
