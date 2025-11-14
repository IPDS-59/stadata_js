import { Census } from '../domain/entities/Census';

describe('Census Entity', () => {
  it('should create a census with all fields', () => {
    const census = new Census(1, 'Sensus Penduduk', '2020');

    expect(census.id).toBe(1);
    expect(census.activity).toBe('Sensus Penduduk');
    expect(census.year).toBe('2020');
  });

  it('should convert to JSON correctly', () => {
    const census = new Census(1, 'Sensus Penduduk', '2020');

    const json = census.toJson();

    expect(json.id).toBe(1);
    expect(json.kegiatan).toBe('Sensus Penduduk');
    expect(json.tahun_kegiatan).toBe('2020');
  });

  it('should create from JSON correctly', () => {
    const json = {
      id: 1,
      kegiatan: 'Sensus Penduduk',
      tahun_kegiatan: '2020',
    };

    const census = Census.fromJson(json);

    expect(census.id).toBe(1);
    expect(census.activity).toBe('Sensus Penduduk');
    expect(census.year).toBe('2020');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      activity: 'Sensus Ekonomi',
      year: '2016',
    };

    const census = Census.fromJson(json);

    expect(census.id).toBe(1);
    expect(census.activity).toBe('Sensus Ekonomi');
    expect(census.year).toBe('2016');
  });

  it('should handle missing fields by defaulting to empty values', () => {
    const json = {};

    const census = Census.fromJson(json);

    expect(census.id).toBe(0);
    expect(census.activity).toBe('');
    expect(census.year).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      id: 1,
    };

    const census = Census.fromJson(json);

    expect(census.id).toBe(1);
    expect(census.activity).toBe('');
    expect(census.year).toBe('');
  });

  it('should handle numeric year by converting to string', () => {
    const json = {
      id: 1,
      kegiatan: 'Sensus Pertanian',
      tahun_kegiatan: 2023,
    };

    const census = Census.fromJson(json);

    expect(census.id).toBe(1);
    expect(census.activity).toBe('Sensus Pertanian');
    expect(census.year).toBe('2023');
  });

  it('should handle empty string values correctly', () => {
    const json = {
      id: 0,
      kegiatan: '',
      tahun_kegiatan: '',
    };

    const census = Census.fromJson(json);

    expect(census.id).toBe(0);
    expect(census.activity).toBe('');
    expect(census.year).toBe('');
  });
});
