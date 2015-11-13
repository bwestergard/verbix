var assert = require('assert');
var verbix = require('../index');

describe('Invocations with Live HTTP calls', function () {
  it('should conjugate sprechen correctly',function(done){
    verbix.conjugate('German', 'sprechen').
      then(function (sprechen) {
        assert.equal(
          'spreche',
          sprechen.indicative.present.ich
        );
        assert.equal(
          'sprichst',
          sprechen.indicative.present.du
        );
      }).
      nodeify(done);
  });
  it('should conjugate schreien correctly',function(done){
    verbix.conjugate('German', 'schreien').
      then(function (sprechen) {
        assert.equal(
          'habe geschrieen; geschrien',
          sprechen.indicative.perfect.ich
        );
      }).
      nodeify(done);
  });
})
