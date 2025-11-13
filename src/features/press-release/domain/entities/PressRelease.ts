import { BaseEntity } from '../../../../core';

/**
 * PressRelease entity representing a press release from BPS
 */
export class PressRelease extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly abstract: string,
    public readonly releaseDate: string,
    public readonly picture: string | null
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      rl_id: this.id,
      title: this.title,
      abstract: this.abstract,
      rl_date: this.releaseDate,
      picture: this.picture,
    };
  }

  static fromJson(json: Record<string, unknown>): PressRelease {
    return new PressRelease(
      String(json.rl_id || json.id || ''),
      String(json.title || ''),
      String(json.abstract || ''),
      String(json.rl_date || json.releaseDate || ''),
      json.picture ? String(json.picture) : null
    );
  }
}
