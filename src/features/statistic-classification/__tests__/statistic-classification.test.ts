import { StatisticClassification } from '../domain/entities/StatisticClassification';

describe('StatisticClassification Entity', () => {
  it('should create a statistic classification with all fields', () => {
    const statisticClassification = new StatisticClassification(
      'A',
      'Agriculture, Forestry and Fishing'
    );

    expect(statisticClassification.id).toBe('A');
    expect(statisticClassification.title).toBe('Agriculture, Forestry and Fishing');
  });

  it('should convert to JSON correctly', () => {
    const statisticClassification = new StatisticClassification(
      'A',
      'Agriculture, Forestry and Fishing'
    );

    const json = statisticClassification.toJson();

    expect(json.kbli_id).toBe('A');
    expect(json.title).toBe('Agriculture, Forestry and Fishing');
  });

  it('should create from JSON correctly', () => {
    const json = {
      kbli_id: 'A',
      title: 'Agriculture, Forestry and Fishing',
    };

    const statisticClassification = StatisticClassification.fromJson(json);

    expect(statisticClassification.id).toBe('A');
    expect(statisticClassification.title).toBe('Agriculture, Forestry and Fishing');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 'A',
      name: 'Agriculture, Forestry and Fishing',
    };

    const statisticClassification = StatisticClassification.fromJson(json);

    expect(statisticClassification.id).toBe('A');
    expect(statisticClassification.title).toBe('Agriculture, Forestry and Fishing');
  });

  it('should handle missing fields by defaulting to empty string', () => {
    const json = {};

    const statisticClassification = StatisticClassification.fromJson(json);

    expect(statisticClassification.id).toBe('');
    expect(statisticClassification.title).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      kbli_id: 'A',
    };

    const statisticClassification = StatisticClassification.fromJson(json);

    expect(statisticClassification.id).toBe('A');
    expect(statisticClassification.title).toBe('');
  });

  it('should handle numeric ID by converting to string', () => {
    const json = {
      kbli_id: 123,
      title: 'Test Classification',
    };

    const statisticClassification = StatisticClassification.fromJson(json);

    expect(statisticClassification.id).toBe('123');
    expect(statisticClassification.title).toBe('Test Classification');
  });

  it('should handle empty string values correctly', () => {
    const json = {
      kbli_id: '',
      title: '',
    };

    const statisticClassification = StatisticClassification.fromJson(json);

    expect(statisticClassification.id).toBe('');
    expect(statisticClassification.title).toBe('');
  });
});
