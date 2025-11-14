import { VerticalVariable } from '../domain/entities/VerticalVariable';

describe('VerticalVariable Entity', () => {
  it('should create a vertical variable with all fields', () => {
    const verticalVariable = new VerticalVariable(7211, 'Banggai Laut', 249, 1, 'Province');

    expect(verticalVariable.id).toBe(7211);
    expect(verticalVariable.label).toBe('Banggai Laut');
    expect(verticalVariable.itemId).toBe(249);
    expect(verticalVariable.groupId).toBe(1);
    expect(verticalVariable.groupName).toBe('Province');
  });

  it('should convert to JSON correctly', () => {
    const verticalVariable = new VerticalVariable(7211, 'Banggai Laut', 249, 1, 'Province');

    const json = verticalVariable.toJson();

    expect(json.kode_ver_id).toBe(7211);
    expect(json.vervar).toBe('Banggai Laut');
    expect(json.item_ver_id).toBe(249);
    expect(json.group_ver_id).toBe(1);
    expect(json.name_group_ver_id).toBe('Province');
  });

  it('should create from JSON correctly', () => {
    const json = {
      kode_ver_id: 7211,
      vervar: 'Banggai Laut',
      item_ver_id: 249,
      group_ver_id: 1,
      name_group_ver_id: 'Province',
    };

    const verticalVariable = VerticalVariable.fromJson(json);

    expect(verticalVariable.id).toBe(7211);
    expect(verticalVariable.label).toBe('Banggai Laut');
    expect(verticalVariable.itemId).toBe(249);
    expect(verticalVariable.groupId).toBe(1);
    expect(verticalVariable.groupName).toBe('Province');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const verticalVariable = VerticalVariable.fromJson(json);

    expect(verticalVariable.id).toBe(0);
    expect(verticalVariable.label).toBe('');
    expect(verticalVariable.itemId).toBe(0);
    expect(verticalVariable.groupId).toBe(0);
    expect(verticalVariable.groupName).toBe('');
  });
});
