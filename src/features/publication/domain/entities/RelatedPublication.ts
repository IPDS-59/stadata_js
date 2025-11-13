import { BaseEntity } from '../../../../core/base';

/**
 * Related Publication entity
 * Represents related publications from BPS Web API
 */
export class RelatedPublication extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly releaseDate: Date,
    public readonly url: string,
    public readonly cover: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      rl_date: this.releaseDate.toISOString().split('T')[0],
      url: this.url,
      cover: this.cover,
    };
  }

  static fromJson(json: Record<string, unknown>): RelatedPublication {
    return new RelatedPublication(
      String(json.id || ''),
      String(json.title || ''),
      new Date(String(json.rl_date || json.release_date || json.releaseDate || '')),
      String(json.url || ''),
      String(json.cover || '')
    );
  }
}
