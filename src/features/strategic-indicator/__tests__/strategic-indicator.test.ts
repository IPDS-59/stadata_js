import { StrategicIndicator } from '../domain/entities/StrategicIndicator';

describe('StrategicIndicator Entity', () => {
  it('should create a strategic indicator with all fields', () => {
    const indicator = new StrategicIndicator(1, 'Economic Growth');

    expect(indicator.id).toBe(1);
    expect(indicator.name).toBe('Economic Growth');
  });

  it('should convert to JSON correctly', () => {
    const indicator = new StrategicIndicator(1, 'Economic Growth');

    const json = indicator.toJson();

    expect(json.ind_id).toBe(1);
    expect(json.ind_name).toBe('Economic Growth');
  });

  it('should create from JSON correctly', () => {
    const json = {
      ind_id: 1,
      ind_name: 'Economic Growth',
    };

    const indicator = StrategicIndicator.fromJson(json);

    expect(indicator.id).toBe(1);
    expect(indicator.name).toBe('Economic Growth');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      name: 'Economic Growth',
    };

    const indicator = StrategicIndicator.fromJson(json);

    expect(indicator.id).toBe(1);
    expect(indicator.name).toBe('Economic Growth');
  });

  it('should handle missing fields by defaulting to 0 for id and empty string for name', () => {
    const json = {};

    const indicator = StrategicIndicator.fromJson(json);

    expect(indicator.id).toBe(0);
    expect(indicator.name).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      ind_id: 1,
    };

    const indicator = StrategicIndicator.fromJson(json);

    expect(indicator.id).toBe(1);
    expect(indicator.name).toBe('');
  });

  it('should handle string ID by converting to number', () => {
    const json = {
      ind_id: '1',
      ind_name: 'Economic Growth',
    };

    const indicator = StrategicIndicator.fromJson(json);

    expect(indicator.id).toBe(1);
    expect(indicator.name).toBe('Economic Growth');
  });

  it('should handle zero values correctly', () => {
    const json = {
      ind_id: 0,
      ind_name: '',
    };

    const indicator = StrategicIndicator.fromJson(json);

    expect(indicator.id).toBe(0);
    expect(indicator.name).toBe('');
  });
});
