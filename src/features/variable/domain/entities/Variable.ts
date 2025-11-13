import { BaseEntity } from '../../../../core';

/**
 * Represents a variable (statistical indicator)
 */
export class Variable extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly subjectId: number,
    public readonly unit: string,
    public readonly verticalVariableCount: number,
    public readonly derivedVariableCount: number,
    public readonly graph: string[]
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      var_id: this.id,
      title: this.title,
      subject_id: this.subjectId,
      unit: this.unit,
      vertical_variable: this.verticalVariableCount,
      derived_variable: this.derivedVariableCount,
      graph: this.graph,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): Variable {
    const graphData = json.graph || json.graphs;
    let graphs: string[] = [];

    if (Array.isArray(graphData)) {
      graphs = graphData.map((item) => String(item));
    } else if (typeof graphData === 'string') {
      graphs = [graphData];
    }

    return new Variable(
      Number(json.var_id || json.id || 0),
      String(json.title || json.name || ''),
      Number(json.subject_id || json.subjectId || 0),
      String(json.unit || ''),
      Number(json.vertical_variable || json.verticalVariableCount || 0),
      Number(json.derived_variable || json.derivedVariableCount || 0),
      graphs
    );
  }
}
