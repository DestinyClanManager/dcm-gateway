global.td = require('testdouble')
require('testdouble-jest')(td, jest) // eslint-disable-line

afterEach(function() {
  td.reset() // eslint-disable-line
})
