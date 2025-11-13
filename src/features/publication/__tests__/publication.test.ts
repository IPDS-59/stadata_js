import { Publication } from '../domain/entities/Publication';
import { RelatedPublication } from '../domain/entities/RelatedPublication';

describe('Publication Entity', () => {
  const mockRelatedPublications = [
    new RelatedPublication(
      '101',
      'Related Publication 1',
      new Date('2024-01-15'),
      'https://example.com/pub1',
      'https://example.com/cover1.jpg'
    ),
    new RelatedPublication(
      '102',
      'Related Publication 2',
      new Date('2024-02-20'),
      'https://example.com/pub2',
      'https://example.com/cover2.jpg'
    ),
  ];

  it('should create a publication with all fields', () => {
    const publication = new Publication(
      '1',
      'Test Publication',
      '1234-5678',
      'https://example.com/cover.jpg',
      'https://example.com/pub.pdf',
      '2.5 MB',
      new Date('2024-01-01'),
      new Date('2024-01-15'),
      new Date('2024-01-20'),
      'This is a test abstract',
      'CAT-001',
      'PUB-001',
      mockRelatedPublications
    );

    expect(publication.id).toBe('1');
    expect(publication.title).toBe('Test Publication');
    expect(publication.issn).toBe('1234-5678');
    expect(publication.cover).toBe('https://example.com/cover.jpg');
    expect(publication.pdf).toBe('https://example.com/pub.pdf');
    expect(publication.size).toBe('2.5 MB');
    expect(publication.scheduledDate).toEqual(new Date('2024-01-01'));
    expect(publication.releaseDate).toEqual(new Date('2024-01-15'));
    expect(publication.updateDate).toEqual(new Date('2024-01-20'));
    expect(publication.abstract).toBe('This is a test abstract');
    expect(publication.catalogueNumber).toBe('CAT-001');
    expect(publication.publicationNumber).toBe('PUB-001');
    expect(publication.relatedPublications).toHaveLength(2);
  });

  it('should create a publication with nullable fields as null', () => {
    const publication = new Publication(
      '1',
      'Test Publication',
      '1234-5678',
      'https://example.com/cover.jpg',
      'https://example.com/pub.pdf',
      '2.5 MB',
      null,
      null,
      null,
      null,
      null,
      null,
      []
    );

    expect(publication.scheduledDate).toBeNull();
    expect(publication.releaseDate).toBeNull();
    expect(publication.updateDate).toBeNull();
    expect(publication.abstract).toBeNull();
    expect(publication.catalogueNumber).toBeNull();
    expect(publication.publicationNumber).toBeNull();
    expect(publication.relatedPublications).toHaveLength(0);
  });

  it('should convert to JSON correctly', () => {
    const publication = new Publication(
      '1',
      'Test Publication',
      '1234-5678',
      'https://example.com/cover.jpg',
      'https://example.com/pub.pdf',
      '2.5 MB',
      new Date('2024-01-01'),
      new Date('2024-01-15'),
      new Date('2024-01-20'),
      'This is a test abstract',
      'CAT-001',
      'PUB-001',
      mockRelatedPublications
    );

    const json = publication.toJson();

    expect(json.id).toBe('1');
    expect(json.title).toBe('Test Publication');
    expect(json.issn).toBe('1234-5678');
    expect(json.cover).toBe('https://example.com/cover.jpg');
    expect(json.pdf).toBe('https://example.com/pub.pdf');
    expect(json.size).toBe('2.5 MB');
    expect(json.scheduled_date).toBe('2024-01-01');
    expect(json.rl_date).toBe('2024-01-15');
    expect(json.updt_date).toBe('2024-01-20');
    expect(json.abstract).toBe('This is a test abstract');
    expect(json.catalogue_number).toBe('CAT-001');
    expect(json.publication_number).toBe('PUB-001');
    expect(json.related_publications).toHaveLength(2);
  });

  it('should create from JSON correctly', () => {
    const json = {
      id: '1',
      title: 'Test Publication',
      issn: '1234-5678',
      cover: 'https://example.com/cover.jpg',
      pdf: 'https://example.com/pub.pdf',
      size: '2.5 MB',
      scheduled_date: '2024-01-01',
      rl_date: '2024-01-15',
      updt_date: '2024-01-20',
      abstract: 'This is a test abstract',
      catalogue_number: 'CAT-001',
      publication_number: 'PUB-001',
      related_publications: [
        {
          id: '101',
          title: 'Related Publication 1',
          rl_date: '2024-01-15',
          url: 'https://example.com/pub1',
          cover: 'https://example.com/cover1.jpg',
        },
      ],
    };

    const publication = Publication.fromJson(json);

    expect(publication.id).toBe('1');
    expect(publication.title).toBe('Test Publication');
    expect(publication.issn).toBe('1234-5678');
    expect(publication.cover).toBe('https://example.com/cover.jpg');
    expect(publication.pdf).toBe('https://example.com/pub.pdf');
    expect(publication.size).toBe('2.5 MB');
    expect(publication.scheduledDate).toEqual(new Date('2024-01-01'));
    expect(publication.releaseDate).toEqual(new Date('2024-01-15'));
    expect(publication.updateDate).toEqual(new Date('2024-01-20'));
    expect(publication.abstract).toBe('This is a test abstract');
    expect(publication.catalogueNumber).toBe('CAT-001');
    expect(publication.publicationNumber).toBe('PUB-001');
    expect(publication.relatedPublications).toHaveLength(1);
  });

  it('should handle missing optional fields in JSON', () => {
    const json = {
      id: '1',
      title: 'Test Publication',
      issn: '1234-5678',
      cover: 'https://example.com/cover.jpg',
      pdf: 'https://example.com/pub.pdf',
      size: '2.5 MB',
    };

    const publication = Publication.fromJson(json);

    expect(publication.id).toBe('1');
    expect(publication.title).toBe('Test Publication');
    expect(publication.scheduledDate).toBeNull();
    expect(publication.releaseDate).toBeNull();
    expect(publication.updateDate).toBeNull();
    expect(publication.abstract).toBeNull();
    expect(publication.catalogueNumber).toBeNull();
    expect(publication.publicationNumber).toBeNull();
    expect(publication.relatedPublications).toHaveLength(0);
  });
});

describe('RelatedPublication Entity', () => {
  it('should create a related publication', () => {
    const relatedPub = new RelatedPublication(
      '101',
      'Related Publication',
      new Date('2024-01-15'),
      'https://example.com/pub',
      'https://example.com/cover.jpg'
    );

    expect(relatedPub.id).toBe('101');
    expect(relatedPub.title).toBe('Related Publication');
    expect(relatedPub.releaseDate).toEqual(new Date('2024-01-15'));
    expect(relatedPub.url).toBe('https://example.com/pub');
    expect(relatedPub.cover).toBe('https://example.com/cover.jpg');
  });

  it('should convert to JSON correctly', () => {
    const relatedPub = new RelatedPublication(
      '101',
      'Related Publication',
      new Date('2024-01-15'),
      'https://example.com/pub',
      'https://example.com/cover.jpg'
    );

    const json = relatedPub.toJson();

    expect(json.id).toBe('101');
    expect(json.title).toBe('Related Publication');
    expect(json.rl_date).toBe('2024-01-15');
    expect(json.url).toBe('https://example.com/pub');
    expect(json.cover).toBe('https://example.com/cover.jpg');
  });

  it('should create from JSON correctly', () => {
    const json = {
      id: '101',
      title: 'Related Publication',
      rl_date: '2024-01-15',
      url: 'https://example.com/pub',
      cover: 'https://example.com/cover.jpg',
    };

    const relatedPub = RelatedPublication.fromJson(json);

    expect(relatedPub.id).toBe('101');
    expect(relatedPub.title).toBe('Related Publication');
    expect(relatedPub.releaseDate).toEqual(new Date('2024-01-15'));
    expect(relatedPub.url).toBe('https://example.com/pub');
    expect(relatedPub.cover).toBe('https://example.com/cover.jpg');
  });
});
