import { DerivedVariable } from '../domain/entities/DerivedVariable';

describe('DerivedVariable Entity', () => {
  it('should create a derived variable with all fields', () => {
    const derivedVariable = new DerivedVariable(1, 'Growth Rate');

    expect(derivedVariable.id).toBe(1);
    expect(derivedVariable.name).toBe('Growth Rate');
  });

  it('should convert to JSON correctly', () => {
    const derivedVariable = new DerivedVariable(1, 'Growth Rate');

    const json = derivedVariable.toJson();

    expect(json.derived_variable_id).toBe(1);
    expect(json.derived_variable).toBe('Growth Rate');
  });

  it('should create from JSON correctly', () => {
    const json = {
      derived_variable_id: 1,
      derived_variable: 'Growth Rate',
    };

    const derivedVariable = DerivedVariable.fromJson(json);

    expect(derivedVariable.id).toBe(1);
    expect(derivedVariable.name).toBe('Growth Rate');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      name: 'Growth Rate',
    };

    const derivedVariable = DerivedVariable.fromJson(json);

    expect(derivedVariable.id).toBe(1);
    expect(derivedVariable.name).toBe('Growth Rate');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const derivedVariable = DerivedVariable.fromJson(json);

    expect(derivedVariable.id).toBe(0);
    expect(derivedVariable.name).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      derived_variable_id: 1,
    };

    const derivedVariable = DerivedVariable.fromJson(json);

    expect(derivedVariable.id).toBe(1);
    expect(derivedVariable.name).toBe('');
  });

  it('should handle string ID by converting to number', () => {
    const json = {
      derived_variable_id: '1',
      derived_variable: 'Growth Rate',
    };

    const derivedVariable = DerivedVariable.fromJson(json);

    expect(derivedVariable.id).toBe(1);
    expect(derivedVariable.name).toBe('Growth Rate');
  });

  it('should handle zero values correctly', () => {
    const json = {
      derived_variable_id: 0,
      derived_variable: '',
    };

    const derivedVariable = DerivedVariable.fromJson(json);

    expect(derivedVariable.id).toBe(0);
    expect(derivedVariable.name).toBe('');
  });
});
