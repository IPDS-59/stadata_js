import { SubjectCategory } from '../domain/entities/SubjectCategory';

describe('SubjectCategory Entity', () => {
  it('should create a subject category with all fields', () => {
    const category = new SubjectCategory(1, 'Social');

    expect(category.id).toBe(1);
    expect(category.name).toBe('Social');
  });

  it('should convert to JSON correctly', () => {
    const category = new SubjectCategory(1, 'Social');

    const json = category.toJson();

    expect(json.subcat_id).toBe(1);
    expect(json.subcat_name).toBe('Social');
  });

  it('should create from JSON correctly', () => {
    const json = {
      subcat_id: 1,
      subcat_name: 'Social',
    };

    const category = SubjectCategory.fromJson(json);

    expect(category.id).toBe(1);
    expect(category.name).toBe('Social');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      name: 'Social',
    };

    const category = SubjectCategory.fromJson(json);

    expect(category.id).toBe(1);
    expect(category.name).toBe('Social');
  });

  it('should handle missing fields by defaulting to 0 for id and empty string for name', () => {
    const json = {};

    const category = SubjectCategory.fromJson(json);

    expect(category.id).toBe(0);
    expect(category.name).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      subcat_id: 1,
    };

    const category = SubjectCategory.fromJson(json);

    expect(category.id).toBe(1);
    expect(category.name).toBe('');
  });

  it('should handle string ID by converting to number', () => {
    const json = {
      subcat_id: '1',
      subcat_name: 'Social',
    };

    const category = SubjectCategory.fromJson(json);

    expect(category.id).toBe(1);
    expect(category.name).toBe('Social');
  });

  it('should handle zero values correctly', () => {
    const json = {
      subcat_id: 0,
      subcat_name: '',
    };

    const category = SubjectCategory.fromJson(json);

    expect(category.id).toBe(0);
    expect(category.name).toBe('');
  });
});
