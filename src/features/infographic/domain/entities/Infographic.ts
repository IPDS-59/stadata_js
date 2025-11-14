import { BaseEntity } from '../../../../core/base';

/**
 * Infographic entity representing infographics from BPS Web API
 *
 * Infographics are visual representations of statistical data created by BPS
 * to make complex statistics more accessible and understandable to the public.
 * They cover various topics including demographics, economy, social indicators,
 * and regional statistics.
 */
export class Infographic extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly image: string,
    public readonly category: number,
    public readonly downloadUrl: string,
    public readonly description: string | null
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      inf_id: this.id,
      title: this.title,
      img: this.image,
      category: this.category,
      dl: this.downloadUrl,
      desc: this.description,
    };
  }

  static fromJson(json: Record<string, unknown>): Infographic {
    return new Infographic(
      String(json.inf_id || json.id || ''),
      String(json.title || ''),
      String(json.img || json.image || ''),
      Number(json.category || 0),
      String(json.dl || json.downloadUrl || ''),
      json.desc || json.description ? String(json.desc || json.description) : null
    );
  }
}
