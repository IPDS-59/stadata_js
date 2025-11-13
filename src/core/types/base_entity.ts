/**
 * Base entity interface
 */
export interface IBaseEntity {
  toJson(): Record<string, unknown>;
}

/**
 * Abstract base entity class
 */
export abstract class BaseEntity implements IBaseEntity {
  abstract toJson(): Record<string, unknown>;

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}
