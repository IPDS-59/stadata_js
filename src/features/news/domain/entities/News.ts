import { BaseEntity } from '../../../../core';

/**
 * News entity representing a news item from BPS
 */
export class News extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly content: string,
    public readonly releaseDate: string,
    public readonly categoryId: number,
    public readonly picture: string | null
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      news_id: this.id,
      title: this.title,
      news_content: this.content,
      rl_date: this.releaseDate,
      category_id: this.categoryId,
      picture: this.picture,
    };
  }

  static fromJson(json: Record<string, unknown>): News {
    return new News(
      String(json.news_id || json.id || ''),
      String(json.title || ''),
      String(json.news_content || json.content || ''),
      String(json.rl_date || json.releaseDate || ''),
      Number(json.category_id || json.categoryId || 0),
      json.picture ? String(json.picture) : null
    );
  }
}
