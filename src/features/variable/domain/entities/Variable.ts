import { BaseEntity } from '../../../../core';

/**
 * Represents a variable (statistical indicator)
 */
export class Variable extends BaseEntity {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly subjectId: number,
    public readonly subjectName: string,
    public readonly statisticClassificationId: number,
    public readonly statisticClassificationName: string,
    public readonly definition: string,
    public readonly notes: string,
    public readonly unit: string,
    public readonly verticalVariableCount: number,
    public readonly derivedVariableCount: number,
    public readonly graphId: number,
    public readonly graphName: string
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
      sub_id: this.subjectId,
      sub_name: this.subjectName,
      subcsa_id: this.statisticClassificationId,
      subcsa_name: this.statisticClassificationName,
      def: this.definition,
      notes: this.notes,
      vertical: this.verticalVariableCount,
      unit: this.unit,
      graph_id: this.graphId,
      graph_name: this.graphName,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): Variable {
    return new Variable(
      Number(json.var_id || json.id || 0),
      String(json.title || json.name || ''),
      Number(json.sub_id || json.subject_id || json.subjectId || 0),
      String(json.sub_name || json.subject_name || json.subjectName || ''),
      Number(json.subcsa_id || json.statisticClassificationId || 0),
      String(json.subcsa_name || json.statisticClassificationName || ''),
      String(json.def || json.definition || ''),
      String(json.notes || ''),
      String(json.unit || ''),
      Number(json.vertical || json.vertical_variable || json.verticalVariableCount || 0),
      Number(json.derived_variable || json.derivedVariableCount || 0),
      Number(json.graph_id || json.graphId || 0),
      String(json.graph_name || json.graphName || '')
    );
  }
}
