/**
 * Helper class for date parsing and formatting
 */
export class DateHelper {
  /**
   * Parses a date string into a Date object
   * Handles multiple date formats commonly used in the API
   */
  static parse(dateString: string | null | undefined): Date | null {
    if (!dateString) {
      return null;
    }

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return null;
      }
      return date;
    } catch {
      return null;
    }
  }

  /**
   * Formats a Date object to ISO string
   */
  static format(date: Date | null | undefined): string | null {
    if (!date || !(date instanceof Date)) {
      return null;
    }

    try {
      return date.toISOString();
    } catch {
      return null;
    }
  }

  /**
   * Formats a Date object to a readable string
   */
  static formatReadable(date: Date | null | undefined): string | null {
    if (!date || !(date instanceof Date)) {
      return null;
    }

    try {
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return null;
    }
  }

  /**
   * Checks if a date string is valid
   */
  static isValid(dateString: string): boolean {
    const date = this.parse(dateString);
    return date !== null;
  }

  /**
   * Converts a date string to timestamp
   */
  static toTimestamp(dateString: string): number | null {
    const date = this.parse(dateString);
    return date ? date.getTime() : null;
  }

  /**
   * Creates a Date from timestamp
   */
  static fromTimestamp(timestamp: number): Date {
    return new Date(timestamp);
  }

  /**
   * Gets the current date as ISO string
   */
  static now(): string {
    return new Date().toISOString();
  }

  /**
   * Gets the current timestamp
   */
  static nowTimestamp(): number {
    return Date.now();
  }
}
