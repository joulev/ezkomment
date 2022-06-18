const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  moduleNameMapper: { "^~/(.*)$": "<rootDir>/$1" },
  transform: { "^.+\\.svg$": "<rootDir>/config/jestTransformer.js" },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
