const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testRegex: "/__tests__/(client|misc)/.*\\.[jt]sx?$",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: { "^~/(.*)$": "<rootDir>/$1" },
  testEnvironment: "jest-environment-jsdom",
  transform: { "^.+\\.svg$": "<rootDir>/config/jest/svgMock.js" },
};

module.exports = createJestConfig(customJestConfig);
