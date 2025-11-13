/**
 * Base entity interface for all domain entities
 */
export interface IBaseEntity {
  /**
   * Converts the entity to a JSON object
   */
  toJson(): Record<string, unknown>;

  /**
   * Compares this entity with another entity for equality
   */
  equals(other: unknown): boolean;
}

/**
 * Abstract base class for all domain entities
 * Provides common functionality like equality comparison and JSON serialization
 */
export abstract class BaseEntity implements IBaseEntity {
  /**
   * Converts the entity to a JSON object
   * Must be implemented by subclasses
   */
  abstract toJson(): Record<string, unknown>;

  /**
   * String representation of the entity
   */
  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }

  /**
   * Compares this entity with another entity for equality
   * Default implementation compares JSON representations
   */
  equals(other: unknown): boolean {
    if (!(other instanceof BaseEntity)) {
      return false;
    }
    return JSON.stringify(this.toJson()) === JSON.stringify(other.toJson());
  }

  /**
   * Creates a shallow copy of the entity
   */
  copyWith(updates: Partial<Record<string, unknown>>): this {
    const json = this.toJson();
    const merged = { ...json, ...updates };
    // This is a generic implementation, subclasses may override
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.assign(Object.create(Object.getPrototypeOf(this)), merged) as this;
  }
}
