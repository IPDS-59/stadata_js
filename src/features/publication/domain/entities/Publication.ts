import { BaseEntity } from '../../../../core/base';
import { RelatedPublication } from './RelatedPublication';

/**
 * Publication entity representing statistical publications from BPS Web API
 *
 * Publications are official statistical reports, bulletins, and documents
 * published by BPS covering various aspects of Indonesian statistics.
 */
export class Publication extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly issn: string,
    public readonly cover: string,
    public readonly pdf: string,
    public readonly size: string,
    public readonly scheduledDate: Date | null,
    public readonly releaseDate: Date | null,
    public readonly updateDate: Date | null,
    public readonly abstract: string | null,
    public readonly catalogueNumber: string | null,
    public readonly publicationNumber: string | null,
    public readonly relatedPublications: RelatedPublication[]
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      id: this.id,
      title: this.title,
      issn: this.issn,
      cover: this.cover,
      pdf: this.pdf,
      size: this.size,
      scheduled_date: this.scheduledDate?.toISOString().split('T')[0] || null,
      rl_date: this.releaseDate?.toISOString().split('T')[0] || null,
      updt_date: this.updateDate?.toISOString().split('T')[0] || null,
      abstract: this.abstract,
      catalogue_number: this.catalogueNumber,
      publication_number: this.publicationNumber,
      related_publications: this.relatedPublications.map((rp) => rp.toJson()),
    };
  }

  static fromJson(json: Record<string, unknown>): Publication {
    const relatedPubs = json.related_publications || json.relatedPublications;
    const relatedPublications = Array.isArray(relatedPubs)
      ? relatedPubs.map((item) => RelatedPublication.fromJson(item as Record<string, unknown>))
      : [];

    return new Publication(
      String(json.id || ''),
      String(json.title || ''),
      String(json.issn || ''),
      String(json.cover || ''),
      String(json.pdf || ''),
      String(json.size || ''),
      json.scheduled_date || json.scheduledDate
        ? new Date(String(json.scheduled_date || json.scheduledDate))
        : null,
      json.rl_date || json.release_date || json.releaseDate
        ? new Date(String(json.rl_date || json.release_date || json.releaseDate))
        : null,
      json.updt_date || json.update_date || json.updateDate
        ? new Date(String(json.updt_date || json.update_date || json.updateDate))
        : null,
      json.abstract ? String(json.abstract) : null,
      json.catalogue_number || json.catalogueNumber
        ? String(json.catalogue_number || json.catalogueNumber)
        : null,
      json.publication_number || json.publicationNumber
        ? String(json.publication_number || json.publicationNumber)
        : null,
      relatedPublications
    );
  }
}
