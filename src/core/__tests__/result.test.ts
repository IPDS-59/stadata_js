import { ok, err } from 'neverthrow';

describe('Result', () => {
  describe('ok', () => {
    it('should create a successful result', () => {
      const result = ok(42);
      expect(result.isOk()).toBe(true);
      expect(result.isErr()).toBe(false);
      expect(result._unsafeUnwrap()).toBe(42);
    });
  });

  describe('err', () => {
    it('should create an error result', () => {
      const result = err('error message');
      expect(result.isOk()).toBe(false);
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('error message');
    });
  });

  describe('map', () => {
    it('should map successful result', () => {
      const result = ok(42).map((x) => x * 2);
      expect(result._unsafeUnwrap()).toBe(84);
    });

    it('should not map error result', () => {
      const result = err('error').map((x: number) => x * 2);
      expect(result.isErr()).toBe(true);
      expect(result._unsafeUnwrapErr()).toBe('error');
    });
  });

  describe('mapErr', () => {
    it('should map error result', () => {
      const result = err('error').mapErr((e) => `mapped ${e}`);
      expect(result._unsafeUnwrapErr()).toBe('mapped error');
    });

    it('should not map successful result', () => {
      const result = ok(42).mapErr((e: string) => `mapped ${e}`);
      expect(result.isOk()).toBe(true);
      expect(result._unsafeUnwrap()).toBe(42);
    });
  });
});
