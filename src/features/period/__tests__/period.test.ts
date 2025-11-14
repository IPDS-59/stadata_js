import { Period } from '../domain/entities/Period';

describe('Period Entity', () => {
  it('should create a period with all fields', () => {
    const period = new Period(1, 2023);

    expect(period.id).toBe(1);
    expect(period.period).toBe(2023);
  });

  it('should convert to JSON correctly', () => {
    const period = new Period(1, 2023);

    const json = period.toJson();

    expect(json.th_id).toBe(1);
    expect(json.th).toBe(2023);
  });

  it('should create from JSON correctly', () => {
    const json = {
      th_id: 1,
      th: 2023,
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(1);
    expect(period.period).toBe(2023);
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      period: 2023,
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(1);
    expect(period.period).toBe(2023);
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const period = Period.fromJson(json);

    expect(period.id).toBe(0);
    expect(period.period).toBe(0);
  });

  it('should handle partial JSON data', () => {
    const json = {
      th_id: 1,
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(1);
    expect(period.period).toBe(0);
  });

  it('should handle string ID by converting to number', () => {
    const json = {
      th_id: '1',
      th: '2023',
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(1);
    expect(period.period).toBe(2023);
  });

  it('should handle zero values correctly', () => {
    const json = {
      th_id: 0,
      th: 0,
    };

    const period = Period.fromJson(json);

    expect(period.id).toBe(0);
    expect(period.period).toBe(0);
  });
});
