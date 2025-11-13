import { Injector } from '../di/injector';

describe('Injector', () => {
  let injector: Injector;

  beforeEach(() => {
    injector = Injector.getInstance();
    injector.clear();
  });

  afterEach(() => {
    injector.clear();
  });

  describe('register and resolve', () => {
    it('should register and resolve a singleton', () => {
      const instance = { name: 'test' };
      injector.register('test', instance);

      const resolved = injector.resolve<typeof instance>('test');
      expect(resolved).toBe(instance);
    });

    it('should throw error when resolving unregistered dependency', () => {
      expect(() => injector.resolve('unknown')).toThrow('Dependency not found: unknown');
    });
  });

  describe('registerFactory', () => {
    it('should register and resolve from factory', () => {
      const factory = (): { name: string } => ({ name: 'test' });
      injector.registerFactory('test', factory);

      const resolved = injector.resolve<{ name: string }>('test');
      expect(resolved).toEqual({ name: 'test' });
    });

    it('should cache factory result', () => {
      let callCount = 0;
      const factory = (): { count: number } => {
        callCount++;
        return { count: callCount };
      };
      injector.registerFactory('test', factory);

      const first = injector.resolve<{ count: number }>('test');
      const second = injector.resolve<{ count: number }>('test');

      expect(first).toBe(second);
      expect(callCount).toBe(1);
    });
  });

  describe('has', () => {
    it('should return true for registered dependencies', () => {
      injector.register('test', { name: 'test' });
      expect(injector.has('test')).toBe(true);
    });

    it('should return false for unregistered dependencies', () => {
      expect(injector.has('unknown')).toBe(false);
    });
  });

  describe('remove', () => {
    it('should remove a registered dependency', () => {
      injector.register('test', { name: 'test' });
      expect(injector.has('test')).toBe(true);

      injector.remove('test');
      expect(injector.has('test')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all dependencies', () => {
      injector.register('test1', { name: 'test1' });
      injector.register('test2', { name: 'test2' });

      injector.clear();

      expect(injector.has('test1')).toBe(false);
      expect(injector.has('test2')).toBe(false);
    });
  });
});
