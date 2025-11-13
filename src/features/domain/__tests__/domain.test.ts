import { Domain } from '../domain/entities/Domain';

describe('Domain Entity', () => {
  it('should create a domain from valid data', () => {
    const domain = new Domain('1', 'Social and Welfare', 'https://example.com');

    expect(domain.id).toBe('1');
    expect(domain.name).toBe('Social and Welfare');
    expect(domain.url).toBe('https://example.com');
  });

  it('should convert to JSON correctly', () => {
    const domain = new Domain('1', 'Social and Welfare', 'https://example.com');
    const json = domain.toJson();

    expect(json).toEqual({
      domain_id: '1',
      domain_name: 'Social and Welfare',
      domain_url: 'https://example.com',
    });
  });

  it('should create from JSON correctly', () => {
    const json = {
      domain_id: '1',
      domain_name: 'Social and Welfare',
      domain_url: 'https://example.com',
    };

    const domain = Domain.fromJson(json);

    expect(domain.id).toBe('1');
    expect(domain.name).toBe('Social and Welfare');
    expect(domain.url).toBe('https://example.com');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: '1',
      name: 'Social and Welfare',
      url: 'https://example.com',
    };

    const domain = Domain.fromJson(json);

    expect(domain.id).toBe('1');
    expect(domain.name).toBe('Social and Welfare');
    expect(domain.url).toBe('https://example.com');
  });
});
