var assert = require('assert');
var verbix = require('../index');

describe('Invocations with Live HTTP calls', function () {

  it('should conjugate sprechen correctly', function (done){
    verbix.conjugate('German', 'sprechen').
      then(function (sprechen) {
        console.log('sprechen', JSON.stringify(sprechen.indicative.present.ich, null, 2));
        assert.equal(
          'spreche',
          sprechen.indicative.present.ich[0]
        );        
      }).
      nodeify(done);
  });

  it('should conjugate schreien correctly', function (done){
    verbix.conjugate('German', 'schreien').
      then(function (schreien) {
        assert.deepEqual(
          ['habe geschrieen', 'geschrien'],
          schreien.indicative.perfect.ich
        );
      }).
      nodeify(done);
  });

})
