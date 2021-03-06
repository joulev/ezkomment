const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

// double escape like Java's regex.
const customJestConfig = {
  testRegex: "/__tests__/server/.*\\.test\\.[jt]sx?$",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: { "^~/(.*)$": "<rootDir>/$1" },
  testEnvironment: "<rootDir>/config/jest/serverEnv",
  coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/server/firebase"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
