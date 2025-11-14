import { BaseEntity } from '../../../../core/base/BaseEntity';

/**
 * Trade entity representing foreign trade (export/import) data
 */
export class Trade extends BaseEntity {
  constructor(
    public readonly value: number,
    public readonly netWeight: number,
    public readonly hsCode: string,
    public readonly port: string,
    public readonly country: string,
    public readonly year: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      value: this.value,
      netweight: this.netWeight,
      kodehs: this.hsCode,
      pod: this.port,
      ctr: this.country,
      tahun: this.year,
    };
  }

  static fromJson(json: Record<string, unknown>): Trade {
    return new Trade(
      Number(json.value || 0),
      Number(json.netweight || 0),
      String(json.kodehs || ''),
      String(json.pod || ''),
      String(json.ctr || ''),
      String(json.tahun || '')
    );
  }
}
