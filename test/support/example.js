var expect = require('chai').expect

module.exports = function (filename, details) {
  context('with filename like ' + filename, function() {
    var result
    beforeEach(function() {
      result = require('../../lib/parser')(filename)
    })
    Object.keys(details).forEach(function(property) {
      var value = details[property]
      var desc = value === undefined
        ? 'does not find the ' + property
        : 'finds the ' + property

      it(desc, function() {
        expect(result).to.have.a.property(property, value)
      })
    })
  })
}
