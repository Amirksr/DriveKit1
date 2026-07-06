import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  // Path to the Next.js app, used to load next.config.mjs and .env files.
  dir: "./",
});

// Custom Jest configuration layered on top of Next.js' recommended preset.
const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/lib/**/*.{ts,tsx}",
    "src/redux/**/*.{ts,tsx}",
    "src/components/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    // DB-backed integration tests spin up an in-memory MongoDB binary that
    // needs to be downloaded on first run; keep them out of the fast unit
    // test suite and run them explicitly via `npm run test:integration`.
    "<rootDir>/__tests__/integration/",
  ],
};

// next/jest handles transpiling TS/JSX and resolving Next-specific imports.
export default createJestConfig(customJestConfig);
