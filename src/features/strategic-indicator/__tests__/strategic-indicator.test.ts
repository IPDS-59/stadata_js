import { StrategicIndicator } from '../domain/entities/StrategicIndicator';

describe('StrategicIndicator Entity', () => {
  it('should create a strategic indicator with all fields', () => {
    const indicator = new StrategicIndicator(
      29,
      10,
      535,
      'Ekspor, Januari 2021',
      'Ekspor di Provinsi Sulawesi Tengah',
      'Berita Resmi Statistik',
      606.29,
      'Juta US$',
      2,
      'MjkjMg==',
      'Januari 2021'
    );

    expect(indicator.variableId).toBe(29);
    expect(indicator.indicatorId).toBe(10);
    expect(indicator.subjectCsa).toBe(535);
  });

  it('should convert to JSON correctly', () => {
    const indicator = new StrategicIndicator(
      29,
      10,
      535,
      'Ekspor, Januari 2021',
      'Ekspor di Provinsi Sulawesi Tengah',
      'Berita Resmi Statistik',
      606.29,
      'Juta US$',
      2,
      'MjkjMg==',
      'Januari 2021'
    );

    const json = indicator.toJson();

    expect(json.var).toBe(29);
    expect(json.indicator_id).toBe(10);
    expect(json.subject_csa).toBe(535);
  });

  it('should create from JSON correctly', () => {
    const json = {
      var: 29,
      indicator_id: 10,
      subject_csa: 535,
      title: 'Ekspor, Januari 2021',
      name: 'Ekspor di Provinsi Sulawesi Tengah',
      data_source: 'Berita Resmi Statistik',
      value: 606.29,
      unit: 'Juta US$',
      category: 2,
      hash_id: 'MjkjMg==',
      periode: 'Januari 2021',
    };

    const indicator = StrategicIndicator.fromJson(json);

    expect(indicator.variableId).toBe(29);
    expect(indicator.indicatorId).toBe(10);
    expect(indicator.subjectCsa).toBe(535);
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const indicator = StrategicIndicator.fromJson(json);

    expect(indicator.variableId).toBe(0);
    expect(indicator.indicatorId).toBe(0);
    expect(indicator.subjectCsa).toBe(0);
    expect(indicator.title).toBe('');
    expect(indicator.name).toBe('');
    expect(indicator.value).toBe(0);
  });
});
