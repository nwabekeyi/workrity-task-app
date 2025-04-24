export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // Make sure this is using the installed jsdom environment
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.svg": "<rootDir>/__mocks__/fileMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
      useESM: true // Optional: if using ESM in project
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // Add TSX support explicitly
};
