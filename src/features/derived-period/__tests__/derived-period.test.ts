import { DerivedPeriod } from '../domain/entities/DerivedPeriod';

describe('DerivedPeriod Entity', () => {
  it('should create a derived period with all fields', () => {
    const derivedPeriod = new DerivedPeriod(1, 'Q1 2023');

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.label).toBe('Q1 2023');
  });

  it('should convert to JSON correctly', () => {
    const derivedPeriod = new DerivedPeriod(1, 'Q1 2023');

    const json = derivedPeriod.toJson();

    expect(json.derived_period_id).toBe(1);
    expect(json.label).toBe('Q1 2023');
  });

  it('should create from JSON correctly', () => {
    const json = {
      derived_period_id: 1,
      label: 'Q1 2023',
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.label).toBe('Q1 2023');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      name: 'Q1 2023',
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.label).toBe('Q1 2023');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(0);
    expect(derivedPeriod.label).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      derived_period_id: 1,
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.label).toBe('');
  });

  it('should handle string ID by converting to number', () => {
    const json = {
      derived_period_id: '1',
      label: 'Q1 2023',
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(1);
    expect(derivedPeriod.label).toBe('Q1 2023');
  });

  it('should handle zero values correctly', () => {
    const json = {
      derived_period_id: 0,
      label: '',
    };

    const derivedPeriod = DerivedPeriod.fromJson(json);

    expect(derivedPeriod.id).toBe(0);
    expect(derivedPeriod.label).toBe('');
  });
});
