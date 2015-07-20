'use strict'

var expect = require('chai').expect

function run(filename, details, context) {
  context('with filename like ' + filename, function() {
    var result
    beforeEach(function() {
      result = require('../../lib/parser')(filename)
    })
    Object.keys(details).forEach(function(property) {
      var value = details[property]
      /* eslint curly:0 */
      if (value === undefined) {
        it('does not find the ' + property, function() {
          expect(result).to.not.have.a.property(property)
        })
      } else {
        it('finds the ' + property, function() {
          expect(result).to.have.a.property(property, value)
        })
      }
    })
  })
}

module.exports = function(filename, details) {
  run(filename, details, context)
}
module.exports.only = function(filename, details) {
  run(filename, details, context.only)
}
module.exports.skip = function(filename, details) {
  run(filename, details, context.skip)
}
