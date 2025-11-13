import { News } from '../domain/entities/News';

describe('News Entity', () => {
  it('should create a news item with all fields', () => {
    const news = new News(
      '123',
      'Breaking News Title',
      'This is the full news content',
      '2024-01-15',
      5,
      'https://example.com/news-image.jpg'
    );

    expect(news.id).toBe('123');
    expect(news.title).toBe('Breaking News Title');
    expect(news.content).toBe('This is the full news content');
    expect(news.releaseDate).toBe('2024-01-15');
    expect(news.categoryId).toBe(5);
    expect(news.picture).toBe('https://example.com/news-image.jpg');
  });

  it('should create a news item with null picture', () => {
    const news = new News(
      '123',
      'Breaking News Title',
      'This is the full news content',
      '2024-01-15',
      5,
      null
    );

    expect(news.picture).toBeNull();
  });

  it('should convert to JSON correctly', () => {
    const news = new News(
      '123',
      'Breaking News Title',
      'This is the full news content',
      '2024-01-15',
      5,
      'https://example.com/news-image.jpg'
    );

    const json = news.toJson();

    expect(json.news_id).toBe('123');
    expect(json.title).toBe('Breaking News Title');
    expect(json.news_content).toBe('This is the full news content');
    expect(json.rl_date).toBe('2024-01-15');
    expect(json.category_id).toBe(5);
    expect(json.picture).toBe('https://example.com/news-image.jpg');
  });

  it('should create from JSON correctly', () => {
    const json = {
      news_id: '123',
      title: 'Breaking News Title',
      news_content: 'This is the full news content',
      rl_date: '2024-01-15',
      category_id: 5,
      picture: 'https://example.com/news-image.jpg',
    };

    const news = News.fromJson(json);

    expect(news.id).toBe('123');
    expect(news.title).toBe('Breaking News Title');
    expect(news.content).toBe('This is the full news content');
    expect(news.releaseDate).toBe('2024-01-15');
    expect(news.categoryId).toBe(5);
    expect(news.picture).toBe('https://example.com/news-image.jpg');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: '123',
      title: 'Breaking News Title',
      content: 'This is the full news content',
      releaseDate: '2024-01-15',
      categoryId: 5,
      picture: 'https://example.com/news-image.jpg',
    };

    const news = News.fromJson(json);

    expect(news.id).toBe('123');
    expect(news.title).toBe('Breaking News Title');
    expect(news.content).toBe('This is the full news content');
    expect(news.releaseDate).toBe('2024-01-15');
    expect(news.categoryId).toBe(5);
    expect(news.picture).toBe('https://example.com/news-image.jpg');
  });

  it('should handle missing optional picture field in JSON', () => {
    const json = {
      news_id: '123',
      title: 'Breaking News Title',
      news_content: 'This is the full news content',
      rl_date: '2024-01-15',
      category_id: 5,
    };

    const news = News.fromJson(json);

    expect(news.id).toBe('123');
    expect(news.title).toBe('Breaking News Title');
    expect(news.content).toBe('This is the full news content');
    expect(news.releaseDate).toBe('2024-01-15');
    expect(news.categoryId).toBe(5);
    expect(news.picture).toBeNull();
  });

  it('should handle missing category by defaulting to 0', () => {
    const json = {
      news_id: '123',
      title: 'Breaking News Title',
      news_content: 'This is the full news content',
      rl_date: '2024-01-15',
    };

    const news = News.fromJson(json);

    expect(news.categoryId).toBe(0);
  });

  it('should handle empty string values correctly', () => {
    const json = {
      news_id: '',
      title: '',
      news_content: '',
      rl_date: '',
      category_id: 0,
      picture: null,
    };

    const news = News.fromJson(json);

    expect(news.id).toBe('');
    expect(news.title).toBe('');
    expect(news.content).toBe('');
    expect(news.releaseDate).toBe('');
    expect(news.categoryId).toBe(0);
    expect(news.picture).toBeNull();
  });
});
