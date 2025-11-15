import {
  DynamicTable,
  VariableInfo,
  VerticalVariableInfo,
  PeriodInfo,
  SubjectInfo,
  RelatedTable,
} from '../domain/entities';

describe('DynamicTable Entity', () => {
  it('should create a dynamic table with all fields', () => {
    const subjects = [new SubjectInfo(521, 'Pendidikan')];
    const variables = [
      new VariableInfo(
        33,
        'Rata-Rata Lama Sekolah',
        'Tahun',
        'Indeks Pembangunan Manusia',
        '',
        '',
        2
      ),
    ];
    const verticalVariables = [new VerticalVariableInfo(7200, 'Sulawesi Tengah')];
    const periods = [new PeriodInfo(104, '2004')];
    const derivedVariables = [new VerticalVariableInfo('0', 'Tidak ada')];
    const derivedPeriods = [new VerticalVariableInfo(0, 'Tahun')];
    const dataContent = { '72003301040': 7.46 };
    const related = [new RelatedTable('MTMwIzI=', 'Related Table', 2, '2025-11-06', '/link')];

    const dynamicTable = new DynamicTable(
      subjects,
      variables,
      verticalVariables,
      'Kabupaten/Kota',
      periods,
      derivedVariables,
      derivedPeriods,
      dataContent,
      related,
      null
    );

    expect(dynamicTable.subjects).toEqual(subjects);
    expect(dynamicTable.variables).toEqual(variables);
    expect(dynamicTable.verticalVariables).toEqual(verticalVariables);
    expect(dynamicTable.verticalVariableLabel).toBe('Kabupaten/Kota');
    expect(dynamicTable.periods).toEqual(periods);
    expect(dynamicTable.derivedVariables).toEqual(derivedVariables);
    expect(dynamicTable.derivedPeriods).toEqual(derivedPeriods);
    expect(dynamicTable.dataContent).toEqual(dataContent);
    expect(dynamicTable.related).toEqual(related);
    expect(dynamicTable.lastUpdate).toBeNull();
  });

  it('should convert to JSON correctly', () => {
    const subjects = [new SubjectInfo(521, 'Pendidikan')];
    const variables = [new VariableInfo(33, 'Rata-Rata Lama Sekolah', 'Tahun', 'IPM', '', '', 2)];
    const verticalVariables = [new VerticalVariableInfo(7200, 'Sulawesi Tengah')];
    const periods = [new PeriodInfo(104, '2004')];
    const derivedVariables = [new VerticalVariableInfo('0', 'Tidak ada')];
    const derivedPeriods = [new VerticalVariableInfo(0, 'Tahun')];
    const dataContent = { '72003301040': 7.46 };
    const related = [new RelatedTable('MTMwIzI=', 'Related Table', 2, '2025-11-06', '/link')];

    const dynamicTable = new DynamicTable(
      subjects,
      variables,
      verticalVariables,
      'Kabupaten/Kota',
      periods,
      derivedVariables,
      derivedPeriods,
      dataContent,
      related,
      null
    );

    const json = dynamicTable.toJson();

    expect(json.subject).toEqual([{ val: 521, label: 'Pendidikan' }]);
    expect(json.var).toEqual([
      {
        val: 33,
        label: 'Rata-Rata Lama Sekolah',
        unit: 'Tahun',
        subj: 'IPM',
        def: '',
        note: '',
        decimal: 2,
      },
    ]);
    expect(json.vervar).toEqual([{ val: 7200, label: 'Sulawesi Tengah' }]);
    expect(json.labelvervar).toBe('Kabupaten/Kota');
    expect(json.tahun).toEqual([{ val: 104, label: '2004' }]);
    expect(json.turvar).toEqual([{ val: '0', label: 'Tidak ada' }]);
    expect(json.turtahun).toEqual([{ val: 0, label: 'Tahun' }]);
    expect(json.datacontent).toEqual({ '72003301040': 7.46 });
    expect(json.related).toEqual([
      {
        id: 'MTMwIzI=',
        title: 'Related Table',
        tablesource: 2,
        last_update: '2025-11-06',
        link: '/link',
      },
    ]);
    expect(json.last_update).toBeNull();
  });

  it('should create from JSON correctly', () => {
    const json = {
      subject: [{ val: 521, label: 'Pendidikan' }],
      var: [
        {
          val: 33,
          label: 'Rata-Rata Lama Sekolah',
          unit: 'Tahun',
          subj: 'IPM',
          def: '',
          note: '',
          decimal: 2,
        },
      ],
      vervar: [{ val: 7200, label: 'Sulawesi Tengah' }],
      labelvervar: 'Kabupaten/Kota',
      tahun: [{ val: 104, label: '2004' }],
      turvar: [{ val: '0', label: 'Tidak ada' }],
      turtahun: [{ val: 0, label: 'Tahun' }],
      datacontent: { '72003301040': 7.46 },
      related: [
        {
          id: 'MTMwIzI=',
          title: 'Related Table',
          tablesource: 2,
          last_update: '2025-11-06',
          link: '/link',
        },
      ],
      last_update: null,
    };

    const dynamicTable = DynamicTable.fromJson(json);

    expect(dynamicTable.subjects).toHaveLength(1);
    expect(dynamicTable.subjects[0].value).toBe(521);
    expect(dynamicTable.subjects[0].label).toBe('Pendidikan');

    expect(dynamicTable.variables).toHaveLength(1);
    expect(dynamicTable.variables[0].value).toBe(33);
    expect(dynamicTable.variables[0].label).toBe('Rata-Rata Lama Sekolah');

    expect(dynamicTable.verticalVariables).toHaveLength(1);
    expect(dynamicTable.verticalVariables[0].value).toBe(7200);

    expect(dynamicTable.verticalVariableLabel).toBe('Kabupaten/Kota');

    expect(dynamicTable.periods).toHaveLength(1);
    expect(dynamicTable.periods[0].value).toBe(104);

    expect(dynamicTable.derivedVariables).toHaveLength(1);
    expect(dynamicTable.derivedVariables[0].value).toBe('0');

    expect(dynamicTable.derivedPeriods).toHaveLength(1);
    expect(dynamicTable.derivedPeriods[0].value).toBe(0);

    expect(dynamicTable.dataContent).toEqual({ '72003301040': 7.46 });

    expect(dynamicTable.related).toHaveLength(1);
    expect(dynamicTable.related[0].id).toBe('MTMwIzI=');

    expect(dynamicTable.lastUpdate).toBeNull();
  });

  it('should handle missing optional arrays in JSON', () => {
    const json = {
      labelvervar: 'Test Label',
      datacontent: {},
    };

    const dynamicTable = DynamicTable.fromJson(json);

    expect(dynamicTable.subjects).toEqual([]);
    expect(dynamicTable.variables).toEqual([]);
    expect(dynamicTable.verticalVariables).toEqual([]);
    expect(dynamicTable.periods).toEqual([]);
    expect(dynamicTable.derivedVariables).toEqual([]);
    expect(dynamicTable.derivedPeriods).toEqual([]);
    expect(dynamicTable.related).toEqual([]);
    expect(dynamicTable.dataContent).toEqual({});
  });

  it('should get data value using composite key', () => {
    const dataContent = {
      '72003301040': 7.46,
      '72013301050': 6.8,
    };

    const dynamicTable = new DynamicTable([], [], [], '', [], [], [], dataContent, [], null);

    expect(dynamicTable.getDataValue(7200, 33, 0, 104, 0)).toBe(7.46);
    expect(dynamicTable.getDataValue(7201, 33, 0, 105, 0)).toBe(6.8);
    expect(dynamicTable.getDataValue(9999, 99, 0, 999, 0)).toBeUndefined();
  });

  it('should handle related tables with null last_update', () => {
    const json = {
      related: [
        {
          id: 'test',
          title: 'Test Table',
          tablesource: 1,
          last_update: null,
          link: '/test',
        },
      ],
      datacontent: {},
    };

    const dynamicTable = DynamicTable.fromJson(json);

    expect(dynamicTable.related).toHaveLength(1);
    expect(dynamicTable.related[0].lastUpdate).toBeNull();
  });

  it('should transform to structured data format without derived variables or periods', () => {
    const subjects = [new SubjectInfo(521, 'Pendidikan')];
    const variables = [new VariableInfo(33, 'Rata-Rata Lama Sekolah', 'Tahun', 'IPM', '', '', 2)];
    const verticalVariables = [
      new VerticalVariableInfo(7200, 'Sulawesi Tengah'),
      new VerticalVariableInfo(7201, 'Banggai Kepulauan'),
    ];
    const periods = [new PeriodInfo(117, '2017'), new PeriodInfo(123, '2023')];
    const derivedVariables = [new VerticalVariableInfo('0', 'Tidak ada')];
    const derivedPeriods = [new VerticalVariableInfo(0, 'Tahun')];
    const dataContent = {
      '72003301170': 7.46,
      '72003301230': 7.89,
      '72013301170': 6.8,
      '72013301230': 7.2,
    };

    const dynamicTable = new DynamicTable(
      subjects,
      variables,
      verticalVariables,
      'Kabupaten/Kota',
      periods,
      derivedVariables,
      derivedPeriods,
      dataContent,
      [],
      '2024-07-22 03:33:13'
    );

    const structured = dynamicTable.toStructuredData();

    expect(structured.subject_id).toBe(521);
    expect(structured.subject_label).toBe('Pendidikan');
    expect(structured.variable_id).toBe(33);
    expect(structured.variable_label).toBe('Rata-Rata Lama Sekolah');
    expect(structured.variable_unit).toBe('Tahun');
    expect(structured.vertical_variable_label).toBe('Kabupaten/Kota');
    expect(structured.last_update).toBe('2024-07-22 03:33:13');
    expect(structured.data).toHaveLength(2);

    // Check first vertical variable
    expect(structured.data[0].id).toBe(7200);
    expect(structured.data[0].label).toBe('Sulawesi Tengah');
    expect(structured.data[0].data).toHaveLength(2);

    // Check periods for first vertical variable
    expect(structured.data[0].data[0].id).toBe(117);
    expect(structured.data[0].data[0].label).toBe('2017');
    expect(structured.data[0].data[0].data[0].value).toBe(7.46);

    expect(structured.data[0].data[1].id).toBe(123);
    expect(structured.data[0].data[1].label).toBe('2023');
    expect(structured.data[0].data[1].data[0].value).toBe(7.89);
  });

  it('should transform to structured data format with derived variables', () => {
    const subjects = [new SubjectInfo(519, 'Kependudukan dan Migrasi')];
    const variables = [
      new VariableInfo(33, 'Penduduk Menurut Jenis Kelamin', 'Jiwa', 'Kependudukan', '', '', 0),
    ];
    const verticalVariables = [
      new VerticalVariableInfo(1, 'Langgam'),
      new VerticalVariableInfo(2, 'Pangkalan Kerinci'),
    ];
    const periods = [new PeriodInfo(117, '2017'), new PeriodInfo(123, '2023')];
    const derivedVariables = [
      new VerticalVariableInfo(34, 'Laki-Laki'),
      new VerticalVariableInfo(35, 'Perempuan'),
    ];
    const derivedPeriods = [new VerticalVariableInfo(0, 'Tahun')];
    const dataContent = {
      '133341170': 16495,
      '133341230': 18571,
      '133351170': 15800,
      '133351230': 17200,
      '233341170': 14500,
      '233341230': 16000,
      '233351170': 14000,
      '233351230': 15500,
    };

    const dynamicTable = new DynamicTable(
      subjects,
      variables,
      verticalVariables,
      'Kecamatan',
      periods,
      derivedVariables,
      derivedPeriods,
      dataContent,
      [],
      '2024-07-22 03:33:13'
    );

    const structured = dynamicTable.toStructuredData();

    expect(structured.subject_id).toBe(519);
    expect(structured.variable_label).toBe('Penduduk Menurut Jenis Kelamin');
    expect(structured.vertical_variable_label).toBe('Kecamatan');
    expect(structured.data).toHaveLength(2);

    // Check first vertical variable (Langgam)
    expect(structured.data[0].id).toBe(1);
    expect(structured.data[0].label).toBe('Langgam');
    expect(structured.data[0].data).toHaveLength(2); // 2 derived variables

    // Check first derived variable (Laki-Laki)
    expect(structured.data[0].data[0].id).toBe(34);
    expect(structured.data[0].data[0].label).toBe('Laki-Laki');
    expect(structured.data[0].data[0].data).toHaveLength(2); // 2 periods

    // Check first period of first derived variable
    expect(structured.data[0].data[0].data[0].id).toBe(117);
    expect(structured.data[0].data[0].data[0].label).toBe('2017');
    expect(structured.data[0].data[0].data[0].value).toBe(16495);

    // Check second period of first derived variable
    expect(structured.data[0].data[0].data[1].id).toBe(123);
    expect(structured.data[0].data[0].data[1].value).toBe(18571);
  });
});

describe('VariableInfo Entity', () => {
  it('should create and convert to JSON', () => {
    const variable = new VariableInfo(
      33,
      'Test Variable',
      'Tahun',
      'Subject',
      'Definition',
      'Notes',
      2
    );

    expect(variable.value).toBe(33);
    expect(variable.label).toBe('Test Variable');
    expect(variable.decimal).toBe(2);

    const json = variable.toJson();
    expect(json.val).toBe(33);
    expect(json.label).toBe('Test Variable');
    expect(json.decimal).toBe(2);
  });

  it('should handle optional decimal field', () => {
    const variable = new VariableInfo(33, 'Test Variable', 'Tahun', 'Subject', '', '');

    expect(variable.decimal).toBeUndefined();

    const json = variable.toJson();
    expect(json.decimal).toBeUndefined();
  });
});

describe('RelatedTable Entity', () => {
  it('should create and convert to JSON', () => {
    const related = new RelatedTable('id123', 'Table Title', 2, '2025-11-06', '/link/path');

    expect(related.id).toBe('id123');
    expect(related.title).toBe('Table Title');
    expect(related.tableSource).toBe(2);
    expect(related.lastUpdate).toBe('2025-11-06');
    expect(related.link).toBe('/link/path');

    const json = related.toJson();
    expect(json.id).toBe('id123');
    expect(json.tablesource).toBe(2);
    expect(json.last_update).toBe('2025-11-06');
  });

  it('should handle null last_update', () => {
    const related = new RelatedTable('id123', 'Table Title', 2, null, '/link/path');

    expect(related.lastUpdate).toBeNull();

    const json = related.toJson();
    expect(json.last_update).toBeNull();
  });
});
