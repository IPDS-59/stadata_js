import { BaseEntity } from '../../../../core';
import {
  VariableInfo,
  VerticalVariableInfo,
  PeriodInfo,
  SubjectInfo,
} from './VariableInfo';

/**
 * Represents a dynamic statistical table from BPS Web API
 *
 * Contains metadata and data content for rendering a multi-dimensional table.
 * The table structure is: rows (vertical variables) × columns (derived variables × periods)
 *
 * Data is stored in a flat map with composite keys in format:
 * {vervar}{var}{turvar}{tahun}{turtahun}
 */
export class DynamicTable extends BaseEntity {
  constructor(
    public readonly subjects: SubjectInfo[],
    public readonly variables: VariableInfo[],
    public readonly verticalVariables: VerticalVariableInfo[],
    public readonly verticalVariableLabel: string,
    public readonly periods: PeriodInfo[],
    public readonly derivedVariables: VerticalVariableInfo[],
    public readonly derivedPeriods: VerticalVariableInfo[],
    public readonly dataContent: Record<string, unknown>,
    public readonly related: unknown[],
    public readonly lastUpdate?: string | null
  ) {
    super();
  }

  /**
   * Converts the entity to JSON
   */
  toJson(): Record<string, unknown> {
    return {
      subject: this.subjects.map((s) => s.toJson()),
      var: this.variables.map((v) => v.toJson()),
      vervar: this.verticalVariables.map((v) => v.toJson()),
      labelvervar: this.verticalVariableLabel,
      tahun: this.periods.map((p) => p.toJson()),
      turvar: this.derivedVariables.map((d) => d.toJson()),
      turtahun: this.derivedPeriods.map((d) => d.toJson()),
      datacontent: this.dataContent,
      related: this.related,
      last_update: this.lastUpdate,
    };
  }

  /**
   * Creates an entity from JSON
   */
  static fromJson(json: Record<string, unknown>): DynamicTable {
    const subjectArray = Array.isArray(json.subject) ? json.subject : [];
    const varArray = Array.isArray(json.var) ? json.var : [];
    const vervarArray = Array.isArray(json.vervar) ? json.vervar : [];
    const tahunArray = Array.isArray(json.tahun) ? json.tahun : [];
    const turvarArray = Array.isArray(json.turvar) ? json.turvar : [];
    const turtahunArray = Array.isArray(json.turtahun) ? json.turtahun : [];
    const relatedArray = Array.isArray(json.related) ? json.related : [];

    return new DynamicTable(
      subjectArray.map((s) => SubjectInfo.fromJson(s as Record<string, unknown>)),
      varArray.map((v) => VariableInfo.fromJson(v as Record<string, unknown>)),
      vervarArray.map((v) => VerticalVariableInfo.fromJson(v as Record<string, unknown>)),
      String(json.labelvervar || ''),
      tahunArray.map((p) => PeriodInfo.fromJson(p as Record<string, unknown>)),
      turvarArray.map((d) => VerticalVariableInfo.fromJson(d as Record<string, unknown>)),
      turtahunArray.map((d) => VerticalVariableInfo.fromJson(d as Record<string, unknown>)),
      (json.datacontent as Record<string, unknown>) || {},
      relatedArray,
      json.last_update !== undefined ? (json.last_update as string | null) : undefined
    );
  }

  /**
   * Gets a data value using composite key
   * @param vervarValue - Vertical variable value
   * @param varValue - Variable value
   * @param turvarValue - Derived variable value (0 if none)
   * @param tahunValue - Period value
   * @param turtahunValue - Derived period value (0 if none)
   * @returns The data value or undefined if not found
   */
  getDataValue(
    vervarValue: number | string,
    varValue: number | string,
    turvarValue: number | string,
    tahunValue: number | string,
    turtahunValue: number | string
  ): unknown {
    const key = `${vervarValue}${varValue}${turvarValue}${tahunValue}${turtahunValue}`;
    return this.dataContent[key];
  }
}
