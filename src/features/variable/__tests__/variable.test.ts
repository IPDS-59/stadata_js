import { Variable } from '../domain/entities/Variable';

describe('Variable Entity', () => {
  it('should create a variable with all fields', () => {
    const variable = new Variable(
      62,
      'Jumlah Penduduk Miskin Provinsi Sulawesi Tengah',
      23,
      'Kemiskinan dan Ketimpangan',
      563,
      'Kondisi Tempat Tinggal, Kemiskinan, dan Permasalahan Sosial Lintas Sektor',
      'Definition here',
      'Notes here',
      'Ribu Jiwa',
      16,
      0,
      1,
      'bar'
    );

    expect(variable.id).toBe(62);
    expect(variable.title).toBe('Jumlah Penduduk Miskin Provinsi Sulawesi Tengah');
    expect(variable.subjectId).toBe(23);
    expect(variable.subjectName).toBe('Kemiskinan dan Ketimpangan');
    expect(variable.statisticClassificationId).toBe(563);
    expect(variable.statisticClassificationName).toBe(
      'Kondisi Tempat Tinggal, Kemiskinan, dan Permasalahan Sosial Lintas Sektor'
    );
    expect(variable.definition).toBe('Definition here');
    expect(variable.notes).toBe('Notes here');
    expect(variable.unit).toBe('Ribu Jiwa');
    expect(variable.verticalVariableCount).toBe(16);
    expect(variable.derivedVariableCount).toBe(0);
    expect(variable.graphId).toBe(1);
    expect(variable.graphName).toBe('bar');
  });

  it('should convert to JSON correctly', () => {
    const variable = new Variable(
      62,
      'Jumlah Penduduk Miskin',
      23,
      'Kemiskinan',
      563,
      'Kondisi Sosial',
      'Def',
      'Notes',
      'Ribu Jiwa',
      16,
      0,
      1,
      'bar'
    );

    const json = variable.toJson();

    expect(json.var_id).toBe(62);
    expect(json.title).toBe('Jumlah Penduduk Miskin');
    expect(json.sub_id).toBe(23);
    expect(json.sub_name).toBe('Kemiskinan');
    expect(json.subcsa_id).toBe(563);
    expect(json.subcsa_name).toBe('Kondisi Sosial');
    expect(json.def).toBe('Def');
    expect(json.notes).toBe('Notes');
    expect(json.unit).toBe('Ribu Jiwa');
    expect(json.vertical).toBe(16);
    expect(json.graph_id).toBe(1);
    expect(json.graph_name).toBe('bar');
  });

  it('should create from JSON correctly', () => {
    const json = {
      var_id: 62,
      title: 'Jumlah Penduduk Miskin Provinsi Sulawesi Tengah',
      sub_id: 23,
      sub_name: 'Kemiskinan dan Ketimpangan',
      subcsa_id: 563,
      subcsa_name: 'Kondisi Tempat Tinggal, Kemiskinan, dan Permasalahan Sosial Lintas Sektor',
      def: '',
      notes: '',
      vertical: 16,
      unit: 'Ribu Jiwa',
      graph_id: 1,
      graph_name: 'bar',
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(62);
    expect(variable.title).toBe('Jumlah Penduduk Miskin Provinsi Sulawesi Tengah');
    expect(variable.subjectId).toBe(23);
    expect(variable.subjectName).toBe('Kemiskinan dan Ketimpangan');
    expect(variable.statisticClassificationId).toBe(563);
    expect(variable.statisticClassificationName).toBe(
      'Kondisi Tempat Tinggal, Kemiskinan, dan Permasalahan Sosial Lintas Sektor'
    );
    expect(variable.definition).toBe('');
    expect(variable.notes).toBe('');
    expect(variable.unit).toBe('Ribu Jiwa');
    expect(variable.verticalVariableCount).toBe(16);
    expect(variable.derivedVariableCount).toBe(0);
    expect(variable.graphId).toBe(1);
    expect(variable.graphName).toBe('bar');
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      name: 'GDP Growth Rate',
      subjectId: 5,
      subjectName: 'Economy',
      statisticClassificationId: 100,
      statisticClassificationName: 'Economic Indicators',
      definition: 'Def',
      notes: 'Notes',
      unit: 'Percent',
      verticalVariableCount: 3,
      derivedVariableCount: 2,
      graphId: 1,
      graphName: 'line',
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(1);
    expect(variable.title).toBe('GDP Growth Rate');
    expect(variable.subjectId).toBe(5);
    expect(variable.subjectName).toBe('Economy');
    expect(variable.statisticClassificationId).toBe(100);
    expect(variable.statisticClassificationName).toBe('Economic Indicators');
    expect(variable.definition).toBe('Def');
    expect(variable.notes).toBe('Notes');
    expect(variable.unit).toBe('Percent');
    expect(variable.verticalVariableCount).toBe(3);
    expect(variable.derivedVariableCount).toBe(2);
    expect(variable.graphId).toBe(1);
    expect(variable.graphName).toBe('line');
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(0);
    expect(variable.title).toBe('');
    expect(variable.subjectId).toBe(0);
    expect(variable.subjectName).toBe('');
    expect(variable.statisticClassificationId).toBe(0);
    expect(variable.statisticClassificationName).toBe('');
    expect(variable.definition).toBe('');
    expect(variable.notes).toBe('');
    expect(variable.unit).toBe('');
    expect(variable.verticalVariableCount).toBe(0);
    expect(variable.derivedVariableCount).toBe(0);
    expect(variable.graphId).toBe(0);
    expect(variable.graphName).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      var_id: 1,
      title: 'GDP Growth Rate',
      sub_id: 5,
      sub_name: 'Economy',
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(1);
    expect(variable.title).toBe('GDP Growth Rate');
    expect(variable.subjectId).toBe(5);
    expect(variable.subjectName).toBe('Economy');
    expect(variable.statisticClassificationId).toBe(0);
    expect(variable.statisticClassificationName).toBe('');
    expect(variable.definition).toBe('');
    expect(variable.notes).toBe('');
    expect(variable.unit).toBe('');
    expect(variable.verticalVariableCount).toBe(0);
    expect(variable.derivedVariableCount).toBe(0);
    expect(variable.graphId).toBe(0);
    expect(variable.graphName).toBe('');
  });

  it('should handle string IDs by converting to number', () => {
    const json = {
      var_id: '62',
      title: 'GDP Growth Rate',
      sub_id: '23',
      sub_name: 'Economy',
      subcsa_id: '563',
      subcsa_name: 'Classification',
      def: 'Definition',
      notes: 'Notes',
      unit: 'Percent',
      vertical: '16',
      derived_variable: '2',
      graph_id: '1',
      graph_name: 'line',
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(62);
    expect(variable.subjectId).toBe(23);
    expect(variable.statisticClassificationId).toBe(563);
    expect(variable.verticalVariableCount).toBe(16);
    expect(variable.derivedVariableCount).toBe(2);
    expect(variable.graphId).toBe(1);
  });

  it('should handle zero values correctly', () => {
    const json = {
      var_id: 0,
      title: '',
      sub_id: 0,
      sub_name: '',
      subcsa_id: 0,
      subcsa_name: '',
      def: '',
      notes: '',
      unit: '',
      vertical: 0,
      derived_variable: 0,
      graph_id: 0,
      graph_name: '',
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(0);
    expect(variable.title).toBe('');
    expect(variable.subjectId).toBe(0);
    expect(variable.subjectName).toBe('');
    expect(variable.statisticClassificationId).toBe(0);
    expect(variable.statisticClassificationName).toBe('');
    expect(variable.definition).toBe('');
    expect(variable.notes).toBe('');
    expect(variable.unit).toBe('');
    expect(variable.verticalVariableCount).toBe(0);
    expect(variable.derivedVariableCount).toBe(0);
    expect(variable.graphId).toBe(0);
    expect(variable.graphName).toBe('');
  });
});
