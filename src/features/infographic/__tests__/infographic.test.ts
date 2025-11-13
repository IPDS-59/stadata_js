import { Infographic } from '../domain/entities/Infographic';

describe('Infographic Entity', () => {
  it('should create an infographic with all fields', () => {
    const infographic = new Infographic(
      '1',
      'Test Infographic',
      'https://example.com/image.jpg',
      5,
      'https://example.com/download.pdf',
      'This is a test description'
    );

    expect(infographic.id).toBe('1');
    expect(infographic.title).toBe('Test Infographic');
    expect(infographic.image).toBe('https://example.com/image.jpg');
    expect(infographic.category).toBe(5);
    expect(infographic.downloadUrl).toBe('https://example.com/download.pdf');
    expect(infographic.description).toBe('This is a test description');
  });

  it('should create an infographic with null description', () => {
    const infographic = new Infographic(
      '1',
      'Test Infographic',
      'https://example.com/image.jpg',
      5,
      'https://example.com/download.pdf',
      null
    );

    expect(infographic.description).toBeNull();
  });

  it('should convert to JSON correctly', () => {
    const infographic = new Infographic(
      '1',
      'Test Infographic',
      'https://example.com/image.jpg',
      5,
      'https://example.com/download.pdf',
      'This is a test description'
    );

    const json = infographic.toJson();

    expect(json.inf_id).toBe('1');
    expect(json.title).toBe('Test Infographic');
    expect(json.img).toBe('https://example.com/image.jpg');
    expect(json.category).toBe(5);
    expect(json.dl).toBe('https://example.com/download.pdf');
    expect(json.desc).toBe('This is a test description');
  });

  it('should create from JSON correctly', () => {
    const json = {
      inf_id: '1',
      title: 'Test Infographic',
      img: 'https://example.com/image.jpg',
      category: 5,
      dl: 'https://example.com/download.pdf',
      desc: 'This is a test description',
    };

    const infographic = Infographic.fromJson(json);

    expect(infographic.id).toBe('1');
    expect(infographic.title).toBe('Test Infographic');
    expect(infographic.image).toBe('https://example.com/image.jpg');
    expect(infographic.category).toBe(5);
    expect(infographic.downloadUrl).toBe('https://example.com/download.pdf');
    expect(infographic.description).toBe('This is a test description');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: '1',
      title: 'Test Infographic',
      image: 'https://example.com/image.jpg',
      category: 5,
      downloadUrl: 'https://example.com/download.pdf',
      description: 'This is a test description',
    };

    const infographic = Infographic.fromJson(json);

    expect(infographic.id).toBe('1');
    expect(infographic.title).toBe('Test Infographic');
    expect(infographic.image).toBe('https://example.com/image.jpg');
    expect(infographic.category).toBe(5);
    expect(infographic.downloadUrl).toBe('https://example.com/download.pdf');
    expect(infographic.description).toBe('This is a test description');
  });

  it('should handle missing optional fields in JSON', () => {
    const json = {
      inf_id: '1',
      title: 'Test Infographic',
      img: 'https://example.com/image.jpg',
      category: 5,
      dl: 'https://example.com/download.pdf',
    };

    const infographic = Infographic.fromJson(json);

    expect(infographic.id).toBe('1');
    expect(infographic.title).toBe('Test Infographic');
    expect(infographic.image).toBe('https://example.com/image.jpg');
    expect(infographic.category).toBe(5);
    expect(infographic.downloadUrl).toBe('https://example.com/download.pdf');
    expect(infographic.description).toBeNull();
  });

  it('should handle missing category by defaulting to 0', () => {
    const json = {
      inf_id: '1',
      title: 'Test Infographic',
      img: 'https://example.com/image.jpg',
      dl: 'https://example.com/download.pdf',
    };

    const infographic = Infographic.fromJson(json);

    expect(infographic.category).toBe(0);
  });
});
