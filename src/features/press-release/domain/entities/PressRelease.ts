import { BaseEntity } from '../../../../core';

/**
 * PressRelease entity representing a press release from BPS
 */
export class PressRelease extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly subjectId: number,
    public readonly subject: string,
    public readonly title: string,
    public readonly abstract: string,
    public readonly releaseDate: string,
    public readonly updatedDate: string | null,
    public readonly pdf: string,
    public readonly size: string,
    public readonly slide: string,
    public readonly thumbnail: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      brs_id: this.id,
      subj_id: this.subjectId,
      subj: this.subject,
      title: this.title,
      abstract: this.abstract,
      rl_date: this.releaseDate,
      updt_date: this.updatedDate,
      pdf: this.pdf,
      size: this.size,
      slide: this.slide,
      thumbnail: this.thumbnail,
    };
  }

  static fromJson(json: Record<string, unknown>): PressRelease {
    return new PressRelease(
      Number(json.brs_id || json.id || 0),
      Number(json.subj_id || json.subjectId || 0),
      String(json.subj || json.subject || ''),
      String(json.title || ''),
      String(json.abstract || ''),
      String(json.rl_date || json.releaseDate || ''),
      json.updt_date ? String(json.updt_date) : null,
      String(json.pdf || ''),
      String(json.size || ''),
      String(json.slide || ''),
      String(json.thumbnail || '')
    );
  }
}
