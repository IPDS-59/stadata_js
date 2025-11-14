import { BaseEntity } from '../../../../core';

/**
 * Full variable information including metadata
 */
export class VariableInfo extends BaseEntity {
  constructor(
    public readonly value: number,
    public readonly label: string,
    public readonly unit: string,
    public readonly subject: string,
    public readonly definition: string,
    public readonly notes: string,
    public readonly decimal?: number
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      val: this.value,
      label: this.label,
      unit: this.unit,
      subj: this.subject,
      def: this.definition,
      note: this.notes,
      ...(this.decimal !== undefined && { decimal: this.decimal }),
    };
  }

  static fromJson(json: Record<string, unknown>): VariableInfo {
    return new VariableInfo(
      Number(json.val || 0),
      String(json.label || ''),
      String(json.unit || ''),
      String(json.subj || ''),
      String(json.def || ''),
      String(json.note || ''),
      json.decimal !== undefined ? Number(json.decimal) : undefined
    );
  }
}

/**
 * Simple value/label pair for vertical variables and periods
 */
export class VerticalVariableInfo extends BaseEntity {
  constructor(
    public readonly value: number | string,
    public readonly label: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      val: this.value,
      label: this.label,
    };
  }

  static fromJson(json: Record<string, unknown>): VerticalVariableInfo {
    const val = json.val;
    return new VerticalVariableInfo(
      typeof val === 'number' ? val : String(val || ''),
      String(json.label || '')
    );
  }
}

/**
 * Period information (same structure as VerticalVariableInfo)
 */
export class PeriodInfo extends VerticalVariableInfo {
  static fromJson(json: Record<string, unknown>): PeriodInfo {
    const val = json.val;
    return new PeriodInfo(
      typeof val === 'number' ? val : String(val || ''),
      String(json.label || '')
    );
  }
}

/**
 * Subject information
 */
export class SubjectInfo extends BaseEntity {
  constructor(
    public readonly value: number,
    public readonly label: string
  ) {
    super();
  }

  toJson(): Record<string, unknown> {
    return {
      val: this.value,
      label: this.label,
    };
  }

  static fromJson(json: Record<string, unknown>): SubjectInfo {
    return new SubjectInfo(Number(json.val || 0), String(json.label || ''));
  }
}
