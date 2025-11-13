import { VerticalVariable } from '../domain/entities/VerticalVariable';

describe('VerticalVariable Entity', () => {
  it('should create a vertical variable with all fields', () => {
    const verticalVariable = new VerticalVariable(1, 100, 'Urban', 'Perkotaan');

    expect(verticalVariable.id).toBe(1);
    expect(verticalVariable.variableId).toBe(100);
    expect(verticalVariable.label).toBe('Urban');
    expect(verticalVariable.alias).toBe('Perkotaan');
  });

  it('should convert to JSON correctly', () => {
    const verticalVariable = new VerticalVariable(1, 100, 'Urban', 'Perkotaan');

    const json = verticalVariable.toJson();

    expect(json.vervar_id).toBe(1);
    expect(json.var_id).toBe(100);
    expect(json.label).toBe('Urban');
    expect(json.alias).toBe('Perkotaan');
  });

  it('should create from JSON correctly', () => {
    const json = {
      vervar_id: 1,
      var_id: 100,
      label: 'Urban',
      alias: 'Perkotaan',
    };

    const verticalVariable = VerticalVariable.fromJson(json);

    expect(verticalVariable.id).toBe(1);
    expect(verticalVariable.variableId).toBe(100);
    expect(verticalVariable.label).toBe('Urban');
    expect(verticalVariable.alias).toBe('Perkotaan');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      variableId: 100,
      label: 'Urban',
      alias: 'Perkotaan',
    };

    const verticalVariable = VerticalVariable.fromJson(json);

    expect(verticalVariable.id).toBe(1);
    expect(verticalVariable.variableId).toBe(100);
    expect(verticalVariable.label).toBe('Urban');
    expect(verticalVariable.alias).toBe('Perkotaan');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const verticalVariable = VerticalVariable.fromJson(json);

    expect(verticalVariable.id).toBe(0);
    expect(verticalVariable.variableId).toBe(0);
    expect(verticalVariable.label).toBe('');
    expect(verticalVariable.alias).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      vervar_id: 1,
      var_id: 100,
    };

    const verticalVariable = VerticalVariable.fromJson(json);

    expect(verticalVariable.id).toBe(1);
    expect(verticalVariable.variableId).toBe(100);
    expect(verticalVariable.label).toBe('');
    expect(verticalVariable.alias).toBe('');
  });

  it('should handle string IDs by converting to number', () => {
    const json = {
      vervar_id: '1',
      var_id: '100',
      label: 'Urban',
      alias: 'Perkotaan',
    };

    const verticalVariable = VerticalVariable.fromJson(json);

    expect(verticalVariable.id).toBe(1);
    expect(verticalVariable.variableId).toBe(100);
  });

  it('should handle zero values correctly', () => {
    const json = {
      vervar_id: 0,
      var_id: 0,
      label: '',
      alias: '',
    };

    const verticalVariable = VerticalVariable.fromJson(json);

    expect(verticalVariable.id).toBe(0);
    expect(verticalVariable.variableId).toBe(0);
    expect(verticalVariable.label).toBe('');
    expect(verticalVariable.alias).toBe('');
  });
});
