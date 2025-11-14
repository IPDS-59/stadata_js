import { StaticTable } from '../domain/entities/StaticTable';

describe('StaticTable Entity', () => {
  it('should create a static table with all fields', () => {
    const staticTable = new StaticTable(
      '123',
      'Population Statistics',
      42,
      '2.5MB',
      '2024-01-15',
      'https://example.com/data.xlsx'
    );

    expect(staticTable.id).toBe('123');
    expect(staticTable.title).toBe('Population Statistics');
    expect(staticTable.subjectId).toBe(42);
    expect(staticTable.size).toBe('2.5MB');
    expect(staticTable.updatedAt).toBe('2024-01-15');
    expect(staticTable.excelUrl).toBe('https://example.com/data.xlsx');
  });

  it('should convert to JSON correctly', () => {
    const staticTable = new StaticTable(
      '123',
      'Population Statistics',
      42,
      '2.5MB',
      '2024-01-15',
      'https://example.com/data.xlsx'
    );

    const json = staticTable.toJson();

    expect(json.table_id).toBe('123');
    expect(json.title).toBe('Population Statistics');
    expect(json.subj_id).toBe(42);
    expect(json.size).toBe('2.5MB');
    expect(json.updt_date).toBe('2024-01-15');
    expect(json.excel).toBe('https://example.com/data.xlsx');
  });

  it('should create from JSON correctly', () => {
    const json = {
      table_id: '123',
      title: 'Population Statistics',
      subj_id: 42,
      size: '2.5MB',
      updt_date: '2024-01-15',
      excel: 'https://example.com/data.xlsx',
    };

    const staticTable = StaticTable.fromJson(json);

    expect(staticTable.id).toBe('123');
    expect(staticTable.title).toBe('Population Statistics');
    expect(staticTable.subjectId).toBe(42);
    expect(staticTable.size).toBe('2.5MB');
    expect(staticTable.updatedAt).toBe('2024-01-15');
    expect(staticTable.excelUrl).toBe('https://example.com/data.xlsx');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: '123',
      title: 'Population Statistics',
      subjectId: 42,
      size: '2.5MB',
      updatedAt: '2024-01-15',
      excelUrl: 'https://example.com/data.xlsx',
    };

    const staticTable = StaticTable.fromJson(json);

    expect(staticTable.id).toBe('123');
    expect(staticTable.title).toBe('Population Statistics');
    expect(staticTable.subjectId).toBe(42);
    expect(staticTable.size).toBe('2.5MB');
    expect(staticTable.updatedAt).toBe('2024-01-15');
    expect(staticTable.excelUrl).toBe('https://example.com/data.xlsx');
  });

  it('should handle missing subjectId by defaulting to 0', () => {
    const json = {
      table_id: '123',
      title: 'Population Statistics',
      size: '2.5MB',
      updt_date: '2024-01-15',
      excel: 'https://example.com/data.xlsx',
    };

    const staticTable = StaticTable.fromJson(json);

    expect(staticTable.subjectId).toBe(0);
  });

  it('should handle empty string values correctly', () => {
    const json = {
      table_id: '',
      title: '',
      subj_id: 0,
      size: '',
      updt_date: '',
      excel: '',
    };

    const staticTable = StaticTable.fromJson(json);

    expect(staticTable.id).toBe('');
    expect(staticTable.title).toBe('');
    expect(staticTable.subjectId).toBe(0);
    expect(staticTable.size).toBe('');
    expect(staticTable.updatedAt).toBe('');
    expect(staticTable.excelUrl).toBe('');
  });

  it('should handle numeric subjectId correctly', () => {
    const json = {
      table_id: '123',
      title: 'Population Statistics',
      subj_id: '42',
      size: '2.5MB',
      updt_date: '2024-01-15',
      excel: 'https://example.com/data.xlsx',
    };

    const staticTable = StaticTable.fromJson(json);

    expect(staticTable.subjectId).toBe(42);
  });

  it('should handle partial JSON data', () => {
    const json = {
      table_id: '123',
      title: 'Population Statistics',
    };

    const staticTable = StaticTable.fromJson(json);

    expect(staticTable.id).toBe('123');
    expect(staticTable.title).toBe('Population Statistics');
    expect(staticTable.subjectId).toBe(0);
    expect(staticTable.size).toBe('');
    expect(staticTable.updatedAt).toBe('');
    expect(staticTable.excelUrl).toBe('');
  });
});
