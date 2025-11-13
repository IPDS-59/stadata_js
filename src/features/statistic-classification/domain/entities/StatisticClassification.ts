import { BaseEntity } from '../../../../core';

/**
 * Represents a statistic classification entity (KBLI)
 */
export class StatisticClassification extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly title: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      kbli_id: this.id,
      title: this.title,
    };
  }

  static fromJson(json: Record<string, unknown>): StatisticClassification {
    return new StatisticClassification(
      String(json.kbli_id || json.id || ''),
      String(json.title || json.name || '')
    );
  }
}
