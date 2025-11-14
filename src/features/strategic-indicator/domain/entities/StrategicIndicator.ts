import { BaseEntity } from '../../../../core';

/**
 * Represents a strategic indicator
 */
export class StrategicIndicator extends BaseEntity {
  constructor(
    public readonly variableId: number,
    public readonly indicatorId: number,
    public readonly subjectCsa: number,
    public readonly title: string,
    public readonly name: string,
    public readonly dataSource: string,
    public readonly value: number,
    public readonly unit: string,
    public readonly category: number,
    public readonly hashId: string,
    public readonly period: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      var: this.variableId,
      indicator_id: this.indicatorId,
      subject_csa: this.subjectCsa,
      title: this.title,
      name: this.name,
      data_source: this.dataSource,
      value: this.value,
      unit: this.unit,
      category: this.category,
      hash_id: this.hashId,
      periode: this.period,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): StrategicIndicator {
    return new StrategicIndicator(
      Number(json.var || json.variableId || 0),
      Number(json.indicator_id || json.indicatorId || 0),
      Number(json.subject_csa || json.subjectCsa || 0),
      String(json.title || ''),
      String(json.name || ''),
      String(json.data_source || json.dataSource || ''),
      Number(json.value || 0),
      String(json.unit || ''),
      Number(json.category || 0),
      String(json.hash_id || json.hashId || ''),
      String(json.periode || json.period || '')
    );
  }
}
