import { DerivedVariable } from '../domain/entities/DerivedVariable';

describe('DerivedVariable Entity', () => {
  it('should create a derived variable with all fields', () => {
    const derivedVariable = new DerivedVariable(3200, 'DKI Jakarta', 1, 'Wilayah Provinsi');

    expect(derivedVariable.id).toBe(3200);
    expect(derivedVariable.name).toBe('DKI Jakarta');
    expect(derivedVariable.groupId).toBe(1);
    expect(derivedVariable.groupName).toBe('Wilayah Provinsi');
  });

  it('should convert to JSON correctly', () => {
    const derivedVariable = new DerivedVariable(3200, 'DKI Jakarta', 1, 'Wilayah Provinsi');

    const json = derivedVariable.toJson();

    expect(json.turvar_id).toBe(3200);
    expect(json.turvar).toBe('DKI Jakarta');
    expect(json.group_turvar_id).toBe(1);
    expect(json.name_group_turvar).toBe('Wilayah Provinsi');
  });

  it('should create from JSON correctly', () => {
    const json = {
      turvar_id: 3200,
      turvar: 'DKI Jakarta',
      group_turvar_id: 1,
      name_group_turvar: 'Wilayah Provinsi',
    };

    const derivedVariable = DerivedVariable.fromJson(json);

    expect(derivedVariable.id).toBe(3200);
    expect(derivedVariable.name).toBe('DKI Jakarta');
    expect(derivedVariable.groupId).toBe(1);
    expect(derivedVariable.groupName).toBe('Wilayah Provinsi');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const derivedVariable = DerivedVariable.fromJson(json);

    expect(derivedVariable.id).toBe(0);
    expect(derivedVariable.name).toBe('');
    expect(derivedVariable.groupId).toBe(0);
    expect(derivedVariable.groupName).toBe('');
  });
});
