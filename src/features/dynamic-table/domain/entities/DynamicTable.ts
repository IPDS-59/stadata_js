import { BaseEntity } from '../../../../core';
import {
  VariableInfo,
  VerticalVariableInfo,
  PeriodInfo,
  SubjectInfo,
  RelatedTable,
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
    public readonly related: RelatedTable[],
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
      related: this.related.map((r) => r.toJson()),
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
      relatedArray.map((r) => RelatedTable.fromJson(r as Record<string, unknown>)),
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

  /**
   * Transforms the flat datacontent into a structured array for table rendering
   * @returns Array of rows with columns
   */
  toTableData(): Array<{ label: string; values: Record<string, unknown> }> {
    const varValue = this.variables[0]?.value || 0;
    const hasDerivedVars =
      this.derivedVariables.length > 1 ||
      (this.derivedVariables[0]?.value !== 0 && this.derivedVariables[0]?.value !== '0');
    const turtahunValue = this.derivedPeriods[0]?.value || 0;

    return this.verticalVariables.map((vervar) => {
      const row: { label: string; values: Record<string, unknown> } = {
        label: vervar.label,
        values: {},
      };

      if (hasDerivedVars) {
        this.derivedVariables.forEach((turvar) => {
          this.periods.forEach((period) => {
            const key = `${turvar.label}_${period.label}`;
            const value = this.getDataValue(
              vervar.value,
              varValue,
              turvar.value,
              period.value,
              turtahunValue
            );
            row.values[key] = value ?? null;
          });
        });
      } else {
        this.periods.forEach((period) => {
          row.values[period.label] =
            this.getDataValue(vervar.value, varValue, 0, period.value, turtahunValue) ?? null;
        });
      }

      return row;
    });
  }

  /**
   * Transforms the data into a format suitable for chart libraries
   * @returns Array of data points with labels and values
   */
  toChartData(): Array<{ category: string; period: string; value: unknown }> {
    const varValue = this.variables[0]?.value || 0;
    const hasDerivedVars =
      this.derivedVariables.length > 1 ||
      (this.derivedVariables[0]?.value !== 0 && this.derivedVariables[0]?.value !== '0');
    const turtahunValue = this.derivedPeriods[0]?.value || 0;
    const dataPoints: Array<{ category: string; period: string; value: unknown }> = [];

    this.verticalVariables.forEach((vervar) => {
      if (hasDerivedVars) {
        this.derivedVariables.forEach((turvar) => {
          this.periods.forEach((period) => {
            const value = this.getDataValue(
              vervar.value,
              varValue,
              turvar.value,
              period.value,
              turtahunValue
            );
            dataPoints.push({
              category: `${vervar.label} - ${turvar.label}`,
              period: period.label,
              value: value ?? null,
            });
          });
        });
      } else {
        this.periods.forEach((period) => {
          const value = this.getDataValue(vervar.value, varValue, 0, period.value, turtahunValue);
          dataPoints.push({
            category: vervar.label,
            period: period.label,
            value: value ?? null,
          });
        });
      }
    });

    return dataPoints;
  }

  /**
   * Gets column headers for table rendering
   * @returns Array of column header labels
   */
  getColumnHeaders(): string[] {
    const hasDerivedVars =
      this.derivedVariables.length > 1 ||
      (this.derivedVariables[0]?.value !== 0 && this.derivedVariables[0]?.value !== '0');

    if (hasDerivedVars) {
      const headers: string[] = [];
      this.derivedVariables.forEach((turvar) => {
        this.periods.forEach((period) => {
          headers.push(`${turvar.label} - ${period.label}`);
        });
      });
      return headers;
    }

    return this.periods.map((p) => p.label);
  }

  /**
   * Transforms the data into a universal structured format
   * suitable for tables, charts, exports (CSV, Excel), and other consumers
   *
   * Structure adapts based on what dimensions exist:
   * - L1: Vertical variables (always)
   * - L2: Derived variables (if exist) OR Periods (if no derived variables)
   * - L3: Periods (if derived variables exist) OR Derived periods (if exist and no derived variables)
   * - L4: Derived periods (if both derived variables and derived periods exist)
   *
   * @returns Structured data with nested hierarchy
   */
  toStructuredData(): {
    subject_id: number;
    subject_label: string;
    variable_id: number;
    variable_label: string;
    variable_unit: string;
    vertical_variable_label: string;
    last_update: string | null | undefined;
    data: Array<{
      id: number | string;
      label: string;
      data: Array<{
        id: number | string;
        label: string;
        data: Array<{
          id: number | string;
          label: string;
          value?: unknown;
          data?: Array<{
            id: number | string;
            label: string;
            value: unknown;
          }>;
        }>;
      }>;
    }>;
  } {
    const subject = this.subjects[0];
    const variable = this.variables[0];
    const varValue = variable?.value || 0;

    const hasDerivedVars =
      this.derivedVariables.length > 1 ||
      (this.derivedVariables[0]?.value !== 0 && this.derivedVariables[0]?.value !== '0');
    const hasDerivedPeriods =
      this.derivedPeriods.length > 1 ||
      (this.derivedPeriods[0]?.value !== 0 && this.derivedPeriods[0]?.value !== '0');

    // L1: Vertical variables (always present)
    const data = this.verticalVariables.map((vervar) => {
      if (hasDerivedVars) {
        // L2: Derived variables
        return {
          id: vervar.value,
          label: vervar.label,
          data: this.derivedVariables.map((turvar) => ({
            id: turvar.value,
            label: turvar.label,
            // L3: Periods
            data: this.periods.map((period) => {
              if (hasDerivedPeriods) {
                // L4: Derived periods
                return {
                  id: period.value,
                  label: period.label,
                  data: this.derivedPeriods.map((turtahun) => ({
                    id: turtahun.value,
                    label: turtahun.label,
                    value:
                      this.getDataValue(
                        vervar.value,
                        varValue,
                        turvar.value,
                        period.value,
                        turtahun.value
                      ) ?? null,
                  })),
                };
              } else {
                // No derived periods - value at period level
                return {
                  id: period.value,
                  label: period.label,
                  value:
                    this.getDataValue(
                      vervar.value,
                      varValue,
                      turvar.value,
                      period.value,
                      this.derivedPeriods[0]?.value || 0
                    ) ?? null,
                };
              }
            }),
          })),
        };
      } else {
        // No derived variables
        // L2: Periods
        return {
          id: vervar.value,
          label: vervar.label,
          data: this.periods.map((period) => ({
            id: period.value,
            label: period.label,
            // L3: Derived periods (if exist) or value
            data: hasDerivedPeriods
              ? this.derivedPeriods.map((turtahun) => ({
                  id: turtahun.value,
                  label: turtahun.label,
                  value:
                    this.getDataValue(vervar.value, varValue, 0, period.value, turtahun.value) ??
                    null,
                }))
              : [
                  {
                    id: period.value,
                    label: period.label,
                    value:
                      this.getDataValue(
                        vervar.value,
                        varValue,
                        0,
                        period.value,
                        this.derivedPeriods[0]?.value || 0
                      ) ?? null,
                  },
                ],
          })),
        };
      }
    });

    return {
      subject_id: subject?.value || 0,
      subject_label: subject?.label || '',
      variable_id: variable?.value || 0,
      variable_label: variable?.label || '',
      variable_unit: variable?.unit || '',
      vertical_variable_label: this.verticalVariableLabel,
      last_update: this.lastUpdate,
      data,
    };
  }
}
