import { NewsCategory } from '../domain/entities/NewsCategory';

describe('NewsCategory Entity', () => {
  it('should create a news category with all fields', () => {
    const newsCategory = new NewsCategory('1', 'Economy');

    expect(newsCategory.id).toBe('1');
    expect(newsCategory.name).toBe('Economy');
  });

  it('should convert to JSON correctly', () => {
    const newsCategory = new NewsCategory('1', 'Economy');

    const json = newsCategory.toJson();

    expect(json.newscat_id).toBe('1');
    expect(json.newscat_name).toBe('Economy');
  });

  it('should create from JSON correctly', () => {
    const json = {
      newscat_id: '1',
      newscat_name: 'Economy',
    };

    const newsCategory = NewsCategory.fromJson(json);

    expect(newsCategory.id).toBe('1');
    expect(newsCategory.name).toBe('Economy');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: '1',
      name: 'Economy',
    };

    const newsCategory = NewsCategory.fromJson(json);

    expect(newsCategory.id).toBe('1');
    expect(newsCategory.name).toBe('Economy');
  });

  it('should handle empty string values correctly', () => {
    const json = {
      newscat_id: '',
      newscat_name: '',
    };

    const newsCategory = NewsCategory.fromJson(json);

    expect(newsCategory.id).toBe('');
    expect(newsCategory.name).toBe('');
  });

  it('should handle missing fields by defaulting to empty string', () => {
    const json = {};

    const newsCategory = NewsCategory.fromJson(json);

    expect(newsCategory.id).toBe('');
    expect(newsCategory.name).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      newscat_id: '1',
    };

    const newsCategory = NewsCategory.fromJson(json);

    expect(newsCategory.id).toBe('1');
    expect(newsCategory.name).toBe('');
  });

  it('should handle numeric ID by converting to string', () => {
    const json = {
      newscat_id: 1,
      newscat_name: 'Economy',
    };

    const newsCategory = NewsCategory.fromJson(json);

    expect(newsCategory.id).toBe('1');
    expect(newsCategory.name).toBe('Economy');
  });
});
