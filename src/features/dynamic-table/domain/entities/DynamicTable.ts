import { BaseEntity } from '../../../../core';

/**
 * Represents a dynamic statistical table from BPS Web API
 *
 * For list endpoint, contains basic variable metadata.
 * For detail endpoint (not yet implemented), would include comprehensive data.
 */
export class DynamicTable extends BaseEntity {
  constructor(
    public readonly variableId: number,
    public readonly title: string,
    public readonly subjectId: number,
    public readonly subjectName: string,
    public readonly notes: string,
    public readonly unit: string,
    public readonly verticalVariableId: number,
    public readonly domain: string,
    public readonly csaSubjectId?: number,
    public readonly csaSubjectName?: string,
    public readonly graphId?: number,
    public readonly graphName?: string
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      var: this.variableId,
      label: this.title,
      subj: this.subjectId,
      subj_label: this.subjectName,
      notes: this.notes,
      unit: this.unit,
      vervar: this.verticalVariableId,
      table: this.domain,
      subcsa: this.csaSubjectId,
      subcsa_label: this.csaSubjectName,
      graph: this.graphId,
      graph_label: this.graphName,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): DynamicTable {
    const varValue = json.var;
    const subjValue = json.subj;

    return new DynamicTable(
      typeof varValue === 'number' ? varValue : parseInt(String(varValue || 0)),
      String(json.label || ''),
      typeof subjValue === 'number' ? subjValue : parseInt(String(subjValue || 0)),
      String(json.subj_label || ''),
      String(json.notes || ''),
      String(json.unit || ''),
      Number(json.vervar || 0),
      String(json.table || ''),
      json.subcsa !== undefined ? Number(json.subcsa) : undefined,
      json.subcsa_label !== undefined ? String(json.subcsa_label) : undefined,
      json.graph !== undefined ? Number(json.graph) : undefined,
      json.graph_label !== undefined ? String(json.graph_label) : undefined
    );
  }
}
