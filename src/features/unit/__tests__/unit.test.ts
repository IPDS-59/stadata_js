import { Unit } from '../domain/entities/Unit';

describe('Unit Entity', () => {
  it('should create a unit with all fields', () => {
    const unit = new Unit(1, 'Percent');

    expect(unit.id).toBe(1);
    expect(unit.name).toBe('Percent');
  });

  it('should convert to JSON correctly', () => {
    const unit = new Unit(1, 'Percent');

    const json = unit.toJson();

    expect(json.unit_id).toBe(1);
    expect(json.unit).toBe('Percent');
  });

  it('should create from JSON correctly', () => {
    const json = {
      unit_id: 1,
      unit: 'Percent',
    };

    const unit = Unit.fromJson(json);

    expect(unit.id).toBe(1);
    expect(unit.name).toBe('Percent');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      name: 'Percent',
    };

    const unit = Unit.fromJson(json);

    expect(unit.id).toBe(1);
    expect(unit.name).toBe('Percent');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const unit = Unit.fromJson(json);

    expect(unit.id).toBe(0);
    expect(unit.name).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      unit_id: 1,
    };

    const unit = Unit.fromJson(json);

    expect(unit.id).toBe(1);
    expect(unit.name).toBe('');
  });

  it('should handle string ID by converting to number', () => {
    const json = {
      unit_id: '1',
      unit: 'Percent',
    };

    const unit = Unit.fromJson(json);

    expect(unit.id).toBe(1);
    expect(unit.name).toBe('Percent');
  });

  it('should handle zero values correctly', () => {
    const json = {
      unit_id: 0,
      unit: '',
    };

    const unit = Unit.fromJson(json);

    expect(unit.id).toBe(0);
    expect(unit.name).toBe('');
  });
});
