import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

/**
 * Separate Jest project for DB-backed integration tests. These spin up a
 * real (in-memory) MongoDB instance via `mongodb-memory-server`, which
 * downloads a `mongod` binary on first run — so they're kept out of the
 * default `npm test` run and executed explicitly with
 * `npm run test:integration` (see package.json).
 */
const customJestConfig: Config = {
  displayName: "integration",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["<rootDir>/__tests__/integration/**/*.test.ts"],
  testTimeout: 60_000,
};

export default createJestConfig(customJestConfig);
