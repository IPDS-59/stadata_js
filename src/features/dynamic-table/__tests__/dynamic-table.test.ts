import { DynamicTable } from '../domain/entities/DynamicTable';

describe('DynamicTable Entity', () => {
  it('should create a dynamic table with all required fields', () => {
    const dynamicTable = new DynamicTable(
      123,
      'Population Growth Rate',
      45,
      'Demographics',
      'Population growth rate by region',
      'Percent',
      67,
      '7200'
    );

    expect(dynamicTable.variableId).toBe(123);
    expect(dynamicTable.title).toBe('Population Growth Rate');
    expect(dynamicTable.subjectId).toBe(45);
    expect(dynamicTable.subjectName).toBe('Demographics');
    expect(dynamicTable.notes).toBe('Population growth rate by region');
    expect(dynamicTable.unit).toBe('Percent');
    expect(dynamicTable.verticalVariableId).toBe(67);
    expect(dynamicTable.domain).toBe('7200');
  });

  it('should create a dynamic table with optional fields', () => {
    const dynamicTable = new DynamicTable(
      123,
      'Population Growth Rate',
      45,
      'Demographics',
      'Population growth rate by region',
      'Percent',
      67,
      '7200',
      10,
      'CSA Subject',
      5,
      'Line Graph'
    );

    expect(dynamicTable.csaSubjectId).toBe(10);
    expect(dynamicTable.csaSubjectName).toBe('CSA Subject');
    expect(dynamicTable.graphId).toBe(5);
    expect(dynamicTable.graphName).toBe('Line Graph');
  });

  it('should convert to JSON correctly', () => {
    const dynamicTable = new DynamicTable(
      123,
      'Population Growth Rate',
      45,
      'Demographics',
      'Population growth rate by region',
      'Percent',
      67,
      '7200',
      10,
      'CSA Subject',
      5,
      'Line Graph'
    );

    const json = dynamicTable.toJson();

    expect(json.var).toBe(123);
    expect(json.label).toBe('Population Growth Rate');
    expect(json.subj).toBe(45);
    expect(json.subj_label).toBe('Demographics');
    expect(json.notes).toBe('Population growth rate by region');
    expect(json.unit).toBe('Percent');
    expect(json.vervar).toBe(67);
    expect(json.table).toBe('7200');
    expect(json.subcsa).toBe(10);
    expect(json.subcsa_label).toBe('CSA Subject');
    expect(json.graph).toBe(5);
    expect(json.graph_label).toBe('Line Graph');
  });

  it('should create from JSON correctly', () => {
    const json = {
      var: 123,
      label: 'Population Growth Rate',
      subj: 45,
      subj_label: 'Demographics',
      notes: 'Population growth rate by region',
      unit: 'Percent',
      vervar: 67,
      table: '7200',
      subcsa: 10,
      subcsa_label: 'CSA Subject',
      graph: 5,
      graph_label: 'Line Graph',
    };

    const dynamicTable = DynamicTable.fromJson(json);

    expect(dynamicTable.variableId).toBe(123);
    expect(dynamicTable.title).toBe('Population Growth Rate');
    expect(dynamicTable.subjectId).toBe(45);
    expect(dynamicTable.subjectName).toBe('Demographics');
    expect(dynamicTable.notes).toBe('Population growth rate by region');
    expect(dynamicTable.unit).toBe('Percent');
    expect(dynamicTable.verticalVariableId).toBe(67);
    expect(dynamicTable.domain).toBe('7200');
    expect(dynamicTable.csaSubjectId).toBe(10);
    expect(dynamicTable.csaSubjectName).toBe('CSA Subject');
    expect(dynamicTable.graphId).toBe(5);
    expect(dynamicTable.graphName).toBe('Line Graph');
  });

  it('should handle missing optional fields in JSON', () => {
    const json = {
      var: 123,
      label: 'Population Growth Rate',
      subj: 45,
      subj_label: 'Demographics',
      notes: 'Population growth rate by region',
      unit: 'Percent',
      vervar: 67,
      table: '7200',
    };

    const dynamicTable = DynamicTable.fromJson(json);

    expect(dynamicTable.csaSubjectId).toBeUndefined();
    expect(dynamicTable.csaSubjectName).toBeUndefined();
    expect(dynamicTable.graphId).toBeUndefined();
    expect(dynamicTable.graphName).toBeUndefined();
  });

  it('should handle string var by converting to number', () => {
    const json = {
      var: '123',
      label: 'Population Growth Rate',
      subj: '45',
      subj_label: 'Demographics',
      notes: 'Population growth rate by region',
      unit: 'Percent',
      vervar: 67,
      table: '7200',
    };

    const dynamicTable = DynamicTable.fromJson(json);

    expect(dynamicTable.variableId).toBe(123);
    expect(dynamicTable.subjectId).toBe(45);
  });

  it('should handle missing required fields by defaulting to empty values', () => {
    const json = {};

    const dynamicTable = DynamicTable.fromJson(json);

    expect(dynamicTable.variableId).toBe(0);
    expect(dynamicTable.title).toBe('');
    expect(dynamicTable.subjectId).toBe(0);
    expect(dynamicTable.subjectName).toBe('');
    expect(dynamicTable.notes).toBe('');
    expect(dynamicTable.unit).toBe('');
    expect(dynamicTable.verticalVariableId).toBe(0);
    expect(dynamicTable.domain).toBe('');
  });

  it('should handle partial JSON data', () => {
    const json = {
      var: 123,
      label: 'Population Growth Rate',
      subj: 45,
    };

    const dynamicTable = DynamicTable.fromJson(json);

    expect(dynamicTable.variableId).toBe(123);
    expect(dynamicTable.title).toBe('Population Growth Rate');
    expect(dynamicTable.subjectId).toBe(45);
    expect(dynamicTable.subjectName).toBe('');
    expect(dynamicTable.notes).toBe('');
    expect(dynamicTable.unit).toBe('');
  });
});
