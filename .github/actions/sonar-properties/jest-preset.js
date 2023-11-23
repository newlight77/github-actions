module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    "!src/**/*.types.ts",
    '!**/__tests__/**',
    '!**/__fixtures__/**',
    '!**/__generated__/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'json'],
  displayName: {
    name: "library",
    color: "blueBright",
  },
  detectOpenHandles: true,
  forceExit: true,
  setupFiles: [
    "./global.setup.js"
  ],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: [ "js", "jsx", "json", "node", "ts"],
  modulePathIgnorePatterns: [
    "<rootDir>/test/__fixtures__",
    "<rootDir>/node_modules/",
    "<rootDir>/dist",
  ],
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: [
    '**/__tests__/**/*.(spec|test).(js|ts)',
    "**/*.(spec|test).(js|ts)"
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(ts|ts)?$": [
      "ts-jest",
    ]
  },
  transformIgnorePatterns: ["/node_modules/(?!(logger))"],
  verbose: true,
};
