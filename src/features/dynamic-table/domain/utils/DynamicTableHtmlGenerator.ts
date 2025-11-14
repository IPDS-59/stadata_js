import { DynamicTable } from '../entities';

/**
 * Generates HTML table from DynamicTable entity
 *
 * Based on the Flutter SDK implementation, this generates an HTML table
 * with proper structure for multi-dimensional data.
 */
export class DynamicTableHtmlGenerator {
  /**
   * Generates an HTML table from dynamic table data
   * @param table - The dynamic table entity
   * @returns HTML string representation of the table
   */
  static generate(table: DynamicTable): string {
    const hasDerivedVars = table.derivedVariables.length > 1 || table.derivedVariables[0]?.value !== 0;
    const hasDerivedPeriods =
      table.derivedPeriods.length > 1 || table.derivedPeriods[0]?.value !== 0;

    let html = '<table border="1" cellpadding="5" cellspacing="0">';

    // Header section
    html += this.generateHeader(table, hasDerivedVars);

    // Body section
    html += this.generateBody(table, hasDerivedVars, hasDerivedPeriods);

    html += '</table>';
    return html;
  }

  /**
   * Generates the table header
   */
  private static generateHeader(table: DynamicTable, hasDerivedVars: boolean): string {
    let header = '<thead>';

    // First row: Vertical variable label + Variable label
    header += '<tr>';
    header += `<th rowspan="${hasDerivedVars ? 3 : 2}">${table.verticalVariableLabel}</th>`;

    const varLabel = table.variables[0]?.label || 'Variable';
    const colspan = hasDerivedVars
      ? table.derivedVariables.length * table.periods.length
      : table.periods.length;

    header += `<th colspan="${colspan}">${varLabel}</th>`;
    header += '</tr>';

    // Second row: Derived variables (if any)
    if (hasDerivedVars) {
      header += '<tr>';
      table.derivedVariables.forEach((derivedVar) => {
        header += `<th colspan="${table.periods.length}">${derivedVar.label}</th>`;
      });
      header += '</tr>';
    }

    // Third row (or second if no derived vars): Periods
    header += '<tr>';
    const periodRepeat = hasDerivedVars ? table.derivedVariables.length : 1;
    for (let i = 0; i < periodRepeat; i++) {
      table.periods.forEach((period) => {
        header += `<th>${period.label}</th>`;
      });
    }
    header += '</tr>';

    header += '</thead>';
    return header;
  }

  /**
   * Generates the table body
   */
  private static generateBody(
    table: DynamicTable,
    hasDerivedVars: boolean,
    hasDerivedPeriods: boolean
  ): string {
    let body = '<tbody>';

    const varValue = table.variables[0]?.value || 0;
    const turtahunValue = hasDerivedPeriods ? table.derivedPeriods[0]?.value || 0 : 0;

    table.verticalVariables.forEach((vervar) => {
      body += '<tr>';
      body += `<td>${vervar.label}</td>`;

      if (hasDerivedVars) {
        // With derived variables
        table.derivedVariables.forEach((turvar) => {
          table.periods.forEach((tahun) => {
            const value = table.getDataValue(
              vervar.value,
              varValue,
              turvar.value,
              tahun.value,
              turtahunValue
            );
            body += `<td>${this.formatValue(value)}</td>`;
          });
        });
      } else {
        // Without derived variables
        table.periods.forEach((tahun) => {
          const value = table.getDataValue(vervar.value, varValue, 0, tahun.value, turtahunValue);
          body += `<td>${this.formatValue(value)}</td>`;
        });
      }

      body += '</tr>';
    });

    body += '</tbody>';
    return body;
  }

  /**
   * Formats a data value for display
   */
  private static formatValue(value: unknown): string {
    if (value === null || value === undefined) {
      return '-';
    }

    if (typeof value === 'number') {
      return value.toLocaleString('en-US');
    }

    return String(value);
  }
}
