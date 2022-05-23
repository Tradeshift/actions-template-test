module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts'],
  reporters: ['default', 'github-actions'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  verbose: true,
};
