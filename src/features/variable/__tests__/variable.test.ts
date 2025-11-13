import { Variable } from '../domain/entities/Variable';

describe('Variable Entity', () => {
  it('should create a variable with all fields', () => {
    const variable = new Variable(1, 'GDP Growth Rate', 5, 'Percent', 3, 2, ['line', 'bar']);

    expect(variable.id).toBe(1);
    expect(variable.title).toBe('GDP Growth Rate');
    expect(variable.subjectId).toBe(5);
    expect(variable.unit).toBe('Percent');
    expect(variable.verticalVariableCount).toBe(3);
    expect(variable.derivedVariableCount).toBe(2);
    expect(variable.graph).toEqual(['line', 'bar']);
  });

  it('should convert to JSON correctly', () => {
    const variable = new Variable(1, 'GDP Growth Rate', 5, 'Percent', 3, 2, ['line', 'bar']);

    const json = variable.toJson();

    expect(json.var_id).toBe(1);
    expect(json.title).toBe('GDP Growth Rate');
    expect(json.subject_id).toBe(5);
    expect(json.unit).toBe('Percent');
    expect(json.vertical_variable).toBe(3);
    expect(json.derived_variable).toBe(2);
    expect(json.graph).toEqual(['line', 'bar']);
  });

  it('should create from JSON correctly', () => {
    const json = {
      var_id: 1,
      title: 'GDP Growth Rate',
      subject_id: 5,
      unit: 'Percent',
      vertical_variable: 3,
      derived_variable: 2,
      graph: ['line', 'bar'],
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(1);
    expect(variable.title).toBe('GDP Growth Rate');
    expect(variable.subjectId).toBe(5);
    expect(variable.unit).toBe('Percent');
    expect(variable.verticalVariableCount).toBe(3);
    expect(variable.derivedVariableCount).toBe(2);
    expect(variable.graph).toEqual(['line', 'bar']);
  });

  it('should handle alternative JSON field names', () => {
    const json = {
      id: 1,
      name: 'GDP Growth Rate',
      subjectId: 5,
      unit: 'Percent',
      verticalVariableCount: 3,
      derivedVariableCount: 2,
      graphs: ['line', 'bar'],
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(1);
    expect(variable.title).toBe('GDP Growth Rate');
    expect(variable.subjectId).toBe(5);
    expect(variable.unit).toBe('Percent');
    expect(variable.verticalVariableCount).toBe(3);
    expect(variable.derivedVariableCount).toBe(2);
    expect(variable.graph).toEqual(['line', 'bar']);
  });

  it('should handle missing fields by defaulting appropriately', () => {
    const json = {};

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(0);
    expect(variable.title).toBe('');
    expect(variable.subjectId).toBe(0);
    expect(variable.unit).toBe('');
    expect(variable.verticalVariableCount).toBe(0);
    expect(variable.derivedVariableCount).toBe(0);
    expect(variable.graph).toEqual([]);
  });

  it('should handle partial JSON data', () => {
    const json = {
      var_id: 1,
      title: 'GDP Growth Rate',
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(1);
    expect(variable.title).toBe('GDP Growth Rate');
    expect(variable.subjectId).toBe(0);
    expect(variable.unit).toBe('');
    expect(variable.verticalVariableCount).toBe(0);
    expect(variable.derivedVariableCount).toBe(0);
    expect(variable.graph).toEqual([]);
  });

  it('should handle string IDs by converting to number', () => {
    const json = {
      var_id: '1',
      title: 'GDP Growth Rate',
      subject_id: '5',
      unit: 'Percent',
      vertical_variable: '3',
      derived_variable: '2',
      graph: ['line'],
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(1);
    expect(variable.subjectId).toBe(5);
    expect(variable.verticalVariableCount).toBe(3);
    expect(variable.derivedVariableCount).toBe(2);
  });

  it('should handle zero values correctly', () => {
    const json = {
      var_id: 0,
      title: '',
      subject_id: 0,
      unit: '',
      vertical_variable: 0,
      derived_variable: 0,
      graph: [],
    };

    const variable = Variable.fromJson(json);

    expect(variable.id).toBe(0);
    expect(variable.title).toBe('');
    expect(variable.subjectId).toBe(0);
    expect(variable.unit).toBe('');
    expect(variable.verticalVariableCount).toBe(0);
    expect(variable.derivedVariableCount).toBe(0);
    expect(variable.graph).toEqual([]);
  });

  it('should handle graph as string by converting to array', () => {
    const json = {
      var_id: 1,
      title: 'GDP Growth Rate',
      subject_id: 5,
      unit: 'Percent',
      vertical_variable: 3,
      derived_variable: 2,
      graph: 'line',
    };

    const variable = Variable.fromJson(json);

    expect(variable.graph).toEqual(['line']);
  });

  it('should handle empty graph array', () => {
    const json = {
      var_id: 1,
      title: 'GDP Growth Rate',
      subject_id: 5,
      unit: 'Percent',
      vertical_variable: 3,
      derived_variable: 2,
    };

    const variable = Variable.fromJson(json);

    expect(variable.graph).toEqual([]);
  });
});
