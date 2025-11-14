import { CensusEvent } from '../domain/entities/CensusEvent';

describe('CensusEvent Entity', () => {
  it('should create a census event with all fields', () => {
    const census = new CensusEvent('1', 'Sensus Penduduk', 2020);

    expect(census.id).toBe('1');
    expect(census.name).toBe('Sensus Penduduk');
    expect(census.year).toBe(2020);
  });

  it('should convert to JSON correctly', () => {
    const census = new CensusEvent('1', 'Sensus Penduduk', 2020);

    const json = census.toJson();

    expect(json.id).toBe('1');
    expect(json.kegiatan).toBe('Sensus Penduduk');
    expect(json.tahun_kegiatan).toBe(2020);
  });

  it('should create from JSON correctly', () => {
    const json = {
      id: '1',
      kegiatan: 'Sensus Penduduk',
      tahun_kegiatan: 2020,
    };

    const census = CensusEvent.fromJson(json);

    expect(census.id).toBe('1');
    expect(census.name).toBe('Sensus Penduduk');
    expect(census.year).toBe(2020);
  });

  it('should handle missing fields by defaulting to empty values', () => {
    const json = {};

    const census = CensusEvent.fromJson(json);

    expect(census.id).toBe('');
    expect(census.name).toBe('');
    expect(census.year).toBe(0);
  });

  it('should handle partial JSON data', () => {
    const json = {
      id: '1',
    };

    const census = CensusEvent.fromJson(json);

    expect(census.id).toBe('1');
    expect(census.name).toBe('');
    expect(census.year).toBe(0);
  });

  it('should handle numeric year correctly', () => {
    const json = {
      id: '1',
      kegiatan: 'Sensus Pertanian',
      tahun_kegiatan: 2023,
    };

    const census = CensusEvent.fromJson(json);

    expect(census.id).toBe('1');
    expect(census.name).toBe('Sensus Pertanian');
    expect(census.year).toBe(2023);
  });

  it('should handle empty string values correctly', () => {
    const json = {
      id: '',
      kegiatan: '',
      tahun_kegiatan: 0,
    };

    const census = CensusEvent.fromJson(json);

    expect(census.id).toBe('');
    expect(census.name).toBe('');
    expect(census.year).toBe(0);
  });
});
