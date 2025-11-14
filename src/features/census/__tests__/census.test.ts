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

    expect(census.id).toBeUndefined();
    expect(census.activity).toBeUndefined();
    expect(census.year).toBeUndefined();
  });

  it('should handle partial JSON data', () => {
    const json = {
      id: 1,
    };

    const census = Census.fromJson(json);

    expect(census.id).toBe(1);
    expect(census.activity).toBeUndefined();
    expect(census.year).toBeUndefined();
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
    expect(census.activity).toBeUndefined();
    expect(census.year).toBeUndefined();
  });

  it('should create census data with all fields including categories', () => {
    const json = {
      id_wilayah: '1797',
      kode_wilayah: '1501',
      nama_wilayah: 'KERINCI',
      level_wilayah: 2,
      id_indikator: '3873925',
      nama_indikator: 'Jumlah Penduduk',
      id_kategori_1: '1026',
      nama_kategori_1: 'Klasifikasi Jenis Kelamin ',
      id_item_kategori_1: '1355',
      kode_item_kategori_1: 'L',
      nama_item__kategori_1: 'Laki-laki',
      id_kategori_2: '',
      nama_kategori_2: '',
      id_item_kategori_2: '',
      kode_item_kategori_2: '',
      nama_item__kategori_2: '',
      id_kategori_3: '',
      nama_kategori_3: '',
      id_item_kategori_3: '',
      kode_item_kategori_3: '',
      nama_item__kategori_3: '',
      id_kategori_4: '',
      nama_kategori_4: '',
      id_item_kategori_4: '',
      kode_item_kategori_4: '',
      nama_item__kategori_4: '',
      id_kategori_5: '',
      nama_kategori_5: '',
      id_item_kategori_5: '',
      kode_item_kategori_5: '',
      nama_item__kategori_5: '',
      period: '2020',
      nilai: 125647,
    };

    const census = Census.fromJson(json);

    expect(census.areaId).toBe('1797');
    expect(census.areaCode).toBe('1501');
    expect(census.areaName).toBe('KERINCI');
    expect(census.areaLevel).toBe(2);
    expect(census.indicatorId).toBe('3873925');
    expect(census.indicatorName).toBe('Jumlah Penduduk');
    expect(census.category1).toEqual({
      id: '1026',
      name: 'Klasifikasi Jenis Kelamin ',
      itemId: '1355',
      itemCode: 'L',
      itemName: 'Laki-laki',
    });
    expect(census.category2).toBeNull();
    expect(census.category3).toBeNull();
    expect(census.category4).toBeNull();
    expect(census.category5).toBeNull();
    expect(census.period).toBe('2020');
    expect(census.value).toBe(125647);
  });

  it('should convert census data with categories to JSON correctly', () => {
    const census = new Census(
      undefined,
      undefined,
      undefined,
      '1797',
      '1501',
      'KERINCI',
      2,
      '3873925',
      'Jumlah Penduduk',
      {
        id: '1026',
        name: 'Klasifikasi Jenis Kelamin ',
        itemId: '1355',
        itemCode: 'L',
        itemName: 'Laki-laki',
      },
      null,
      null,
      null,
      null,
      '2020',
      125647
    );

    const json = census.toJson();

    expect(json.id_wilayah).toBe('1797');
    expect(json.kode_wilayah).toBe('1501');
    expect(json.nama_wilayah).toBe('KERINCI');
    expect(json.level_wilayah).toBe(2);
    expect(json.id_indikator).toBe('3873925');
    expect(json.nama_indikator).toBe('Jumlah Penduduk');
    expect(json.id_kategori_1).toBe('1026');
    expect(json.nama_kategori_1).toBe('Klasifikasi Jenis Kelamin ');
    expect(json.id_item_kategori_1).toBe('1355');
    expect(json.kode_item_kategori_1).toBe('L');
    expect(json.nama_item__kategori_1).toBe('Laki-laki');
    expect(json.period).toBe('2020');
    expect(json.nilai).toBe(125647);
  });
});
