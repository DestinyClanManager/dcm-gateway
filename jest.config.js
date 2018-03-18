const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  setupTestFrameworkScriptFile: '<rootDir>/td.setup',
  mapCoverage: true,
  coverageDirectory: '<rootDir>/.test/unit/coverage',
  collectCoverageFrom: ['src/**/*.{js}', '!src/**/*.spec.js', '!**/node_modules/**']
}
