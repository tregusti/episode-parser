var expect = require('chai').expect

module.exports = function (filename, details) {
  context('with filename like ' + filename, function() {
    var result
    beforeEach(function() {
      result = require('../../lib/parser')(filename)
    })
    Object.keys(details).forEach(function(property) {
      var value = details[property]
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
