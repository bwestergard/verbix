/* global describe it */

var assert = require('assert')
var verbix = require('../index')

describe('Invocations with Live HTTP calls', function () {
  it('should conjugate sprechen correctly', function (done) {
    verbix.conjugate('German', 'sprechen').then(function (sprechen) {
      assert.equal(
        'spreche',
        sprechen.indicative.present.ich[0]
      )
    }).nodeify(done)
  })

  it('should conjugate schreien correctly', function (done) {
    verbix.conjugate('German', 'schreien').then(function (schreien) {
      assert.deepEqual(
        ['habe geschrieen', 'geschrien'],
        schreien.indicative.perfect.ich
      )
    }).nodeify(done)
  })

  it('should conjugate tanzen correctly', function (done) {
    verbix.conjugate('German', 'tanzen').then(function (tanzen) {
      assert.deepEqual(
        ['tanzen'],
        tanzen.indicative.present.Sie
      )
    }).nodeify(done)
  })
})
