export default {
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "src/**/*.js",
    "src/**/*.jsx",
    "!src/index.js"
  ],
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js']
};
