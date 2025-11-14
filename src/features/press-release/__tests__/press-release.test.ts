import { PressRelease } from '../domain/entities/PressRelease';

describe('PressRelease Entity', () => {
  it('should create a press release with all fields', () => {
    const pressRelease = new PressRelease(
      1969,
      8,
      'Ekspor-Impor',
      'Export Title',
      'Abstract content',
      '2023-09-15',
      null,
      'https://example.com/pdf',
      '6.04 MB',
      'https://example.com/slide.pdf',
      'https://example.com/thumbnail.jpeg'
    );

    expect(pressRelease.id).toBe(1969);
    expect(pressRelease.subjectId).toBe(8);
    expect(pressRelease.subject).toBe('Ekspor-Impor');
    expect(pressRelease.title).toBe('Export Title');
    expect(pressRelease.abstract).toBe('Abstract content');
    expect(pressRelease.releaseDate).toBe('2023-09-15');
    expect(pressRelease.updatedDate).toBeNull();
    expect(pressRelease.pdf).toBe('https://example.com/pdf');
    expect(pressRelease.size).toBe('6.04 MB');
    expect(pressRelease.slide).toBe('https://example.com/slide.pdf');
    expect(pressRelease.thumbnail).toBe('https://example.com/thumbnail.jpeg');
  });

  it('should convert to JSON correctly', () => {
    const pressRelease = new PressRelease(
      1969,
      8,
      'Ekspor-Impor',
      'Export Title',
      'Abstract',
      '2023-09-15',
      null,
      'https://example.com/pdf',
      '6.04 MB',
      'https://example.com/slide.pdf',
      'https://example.com/thumbnail.jpeg'
    );

    const json = pressRelease.toJson();

    expect(json.brs_id).toBe(1969);
    expect(json.subj_id).toBe(8);
    expect(json.subj).toBe('Ekspor-Impor');
    expect(json.title).toBe('Export Title');
    expect(json.abstract).toBe('Abstract');
    expect(json.rl_date).toBe('2023-09-15');
    expect(json.updt_date).toBeNull();
    expect(json.pdf).toBe('https://example.com/pdf');
    expect(json.size).toBe('6.04 MB');
    expect(json.slide).toBe('https://example.com/slide.pdf');
    expect(json.thumbnail).toBe('https://example.com/thumbnail.jpeg');
  });

  it('should create from JSON correctly', () => {
    const json = {
      brs_id: 1969,
      subj_id: 8,
      subj: 'Ekspor-Impor',
      title: 'Export Title',
      abstract: 'Abstract',
      rl_date: '2023-09-15',
      updt_date: null,
      pdf: 'https://example.com/pdf',
      size: '6.04 MB',
      slide: 'https://example.com/slide.pdf',
      thumbnail: 'https://example.com/thumbnail.jpeg',
    };

    const pressRelease = PressRelease.fromJson(json);

    expect(pressRelease.id).toBe(1969);
    expect(pressRelease.subjectId).toBe(8);
    expect(pressRelease.subject).toBe('Ekspor-Impor');
    expect(pressRelease.title).toBe('Export Title');
    expect(pressRelease.abstract).toBe('Abstract');
    expect(pressRelease.releaseDate).toBe('2023-09-15');
    expect(pressRelease.updatedDate).toBeNull();
    expect(pressRelease.pdf).toBe('https://example.com/pdf');
    expect(pressRelease.size).toBe('6.04 MB');
    expect(pressRelease.slide).toBe('https://example.com/slide.pdf');
    expect(pressRelease.thumbnail).toBe('https://example.com/thumbnail.jpeg');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const pressRelease = PressRelease.fromJson(json);

    expect(pressRelease.id).toBe(0);
    expect(pressRelease.subjectId).toBe(0);
    expect(pressRelease.subject).toBe('');
    expect(pressRelease.title).toBe('');
    expect(pressRelease.abstract).toBe('');
    expect(pressRelease.releaseDate).toBe('');
    expect(pressRelease.updatedDate).toBeNull();
    expect(pressRelease.pdf).toBe('');
    expect(pressRelease.size).toBe('');
    expect(pressRelease.slide).toBe('');
    expect(pressRelease.thumbnail).toBe('');
  });
});
