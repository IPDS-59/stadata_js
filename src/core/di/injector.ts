/**
 * Simple dependency injection container
 */
export class Injector {
  private static instance: Injector;
  private container: Map<string, unknown> = new Map();
  private factories: Map<string, () => unknown> = new Map();

  private constructor() {}

  static getInstance(): Injector {
    if (!Injector.instance) {
      Injector.instance = new Injector();
    }
    return Injector.instance;
  }

  /**
   * Register a singleton instance
   */
  register<T>(key: string, instance: T): void {
    this.container.set(key, instance);
  }

  /**
   * Register a factory function
   */
  registerFactory<T>(key: string, factory: () => T): void {
    this.factories.set(key, factory);
  }

  /**
   * Resolve a dependency
   */
  resolve<T>(key: string): T {
    // Check if instance exists in container
    if (this.container.has(key)) {
      return this.container.get(key) as T;
    }

    // Check if factory exists
    if (this.factories.has(key)) {
      const factory = this.factories.get(key);
      if (factory) {
        const instance = factory() as T;
        this.container.set(key, instance);
        return instance;
      }
    }

    throw new Error(`Dependency not found: ${key}`);
  }

  /**
   * Check if a dependency is registered
   */
  has(key: string): boolean {
    return this.container.has(key) || this.factories.has(key);
  }

  /**
   * Clear all dependencies
   */
  clear(): void {
    this.container.clear();
    this.factories.clear();
  }

  /**
   * Remove a specific dependency
   */
  remove(key: string): void {
    this.container.delete(key);
    this.factories.delete(key);
  }
}

/**
 * Helper function to get the injector instance
 */
export function getInjector(): Injector {
  return Injector.getInstance();
}
