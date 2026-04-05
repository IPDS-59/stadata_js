module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json',
    },
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/**/__tests__/**',
    '!src/**/index.ts',
    '!src/**/*_model.ts',
    '!src/**/models/**',
    '!src/core/base_entity.ts',
    '!src/core/injector.ts',
    '!src/core/network/http_client.ts',
  ],
  coverageThreshold: {
    global: {
      // Current baseline (Mar 2026): branches ~24%, functions ~15%, lines/statements ~17%
      // These thresholds prevent regression; target is ≥70% as test coverage improves.
      branches: 20,
      functions: 12,
      lines: 15,
      statements: 15,
    },
  },
  coverageReporters: ['text', 'lcov', 'json', 'json-summary', 'html'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
};
