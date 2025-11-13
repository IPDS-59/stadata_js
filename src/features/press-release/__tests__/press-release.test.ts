import { PressRelease } from '../domain/entities/PressRelease';

describe('PressRelease Entity', () => {
  it('should create a press release with all fields', () => {
    const pressRelease = new PressRelease(
      '123',
      'Important Press Release',
      'This is the abstract content of the press release',
      '2024-01-15',
      'https://example.com/press-image.jpg'
    );

    expect(pressRelease.id).toBe('123');
    expect(pressRelease.title).toBe('Important Press Release');
    expect(pressRelease.abstract).toBe('This is the abstract content of the press release');
    expect(pressRelease.releaseDate).toBe('2024-01-15');
    expect(pressRelease.picture).toBe('https://example.com/press-image.jpg');
  });

  it('should create a press release with null picture', () => {
    const pressRelease = new PressRelease(
      '123',
      'Important Press Release',
      'This is the abstract content of the press release',
      '2024-01-15',
      null
    );

    expect(pressRelease.picture).toBeNull();
  });

  it('should convert to JSON correctly', () => {
    const pressRelease = new PressRelease(
      '123',
      'Important Press Release',
      'This is the abstract content of the press release',
      '2024-01-15',
      'https://example.com/press-image.jpg'
    );

    const json = pressRelease.toJson();

    expect(json.rl_id).toBe('123');
    expect(json.title).toBe('Important Press Release');
    expect(json.abstract).toBe('This is the abstract content of the press release');
    expect(json.rl_date).toBe('2024-01-15');
    expect(json.picture).toBe('https://example.com/press-image.jpg');
  });

  it('should create from JSON correctly', () => {
    const json = {
      rl_id: '123',
      title: 'Important Press Release',
      abstract: 'This is the abstract content of the press release',
      rl_date: '2024-01-15',
      picture: 'https://example.com/press-image.jpg',
    };

    const pressRelease = PressRelease.fromJson(json);

    expect(pressRelease.id).toBe('123');
    expect(pressRelease.title).toBe('Important Press Release');
    expect(pressRelease.abstract).toBe('This is the abstract content of the press release');
    expect(pressRelease.releaseDate).toBe('2024-01-15');
    expect(pressRelease.picture).toBe('https://example.com/press-image.jpg');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: '123',
      title: 'Important Press Release',
      abstract: 'This is the abstract content of the press release',
      releaseDate: '2024-01-15',
      picture: 'https://example.com/press-image.jpg',
    };

    const pressRelease = PressRelease.fromJson(json);

    expect(pressRelease.id).toBe('123');
    expect(pressRelease.title).toBe('Important Press Release');
    expect(pressRelease.abstract).toBe('This is the abstract content of the press release');
    expect(pressRelease.releaseDate).toBe('2024-01-15');
    expect(pressRelease.picture).toBe('https://example.com/press-image.jpg');
  });

  it('should handle missing optional picture field in JSON', () => {
    const json = {
      rl_id: '123',
      title: 'Important Press Release',
      abstract: 'This is the abstract content of the press release',
      rl_date: '2024-01-15',
    };

    const pressRelease = PressRelease.fromJson(json);

    expect(pressRelease.id).toBe('123');
    expect(pressRelease.title).toBe('Important Press Release');
    expect(pressRelease.abstract).toBe('This is the abstract content of the press release');
    expect(pressRelease.releaseDate).toBe('2024-01-15');
    expect(pressRelease.picture).toBeNull();
  });

  it('should handle empty string values correctly', () => {
    const json = {
      rl_id: '',
      title: '',
      abstract: '',
      rl_date: '',
      picture: null,
    };

    const pressRelease = PressRelease.fromJson(json);

    expect(pressRelease.id).toBe('');
    expect(pressRelease.title).toBe('');
    expect(pressRelease.abstract).toBe('');
    expect(pressRelease.releaseDate).toBe('');
    expect(pressRelease.picture).toBeNull();
  });

  it('should handle undefined picture field', () => {
    const json = {
      rl_id: '123',
      title: 'Important Press Release',
      abstract: 'This is the abstract content of the press release',
      rl_date: '2024-01-15',
      picture: undefined,
    };

    const pressRelease = PressRelease.fromJson(json);

    expect(pressRelease.picture).toBeNull();
  });
});
