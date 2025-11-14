import { Period } from '../domain/entities/Period';

describe('Period Entity', () => {
  it('should create a period with all fields', () => {
    const period = new Period(1, '2023');

    expect(period.id).toBe(1);
    expect(period.label).toBe('2023');
  });

  it('should convert to JSON correctly', () => {
    const period = new Period(1, '2023');

    const json = period.toJson();

    expect(json.period_id).toBe(1);
    expect(json.label).toBe('2023');
  });

  it('should create from JSON correctly', () => {
    const json = {
      period_id: 1,
      label: '2023',
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(1);
    expect(period.label).toBe('2023');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      name: '2023',
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(1);
    expect(period.label).toBe('2023');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const period = Period.fromJson(json);

    expect(period.id).toBe(0);
    expect(period.label).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      period_id: 1,
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(1);
    expect(period.label).toBe('');
  });

  it('should handle string ID by converting to number', () => {
    const json = {
      period_id: '1',
      label: '2023',
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(1);
    expect(period.label).toBe('2023');
  });

  it('should handle zero values correctly', () => {
    const json = {
      period_id: 0,
      label: '',
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(0);
    expect(period.label).toBe('');
  });
});
