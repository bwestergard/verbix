var R = require('ramda');
var $http = require('http-as-promised');
var fs = require('fs');
var scrape = require('./lib/scrape');

module.exports.conjugate = function (language, verb) {
  return $http('http://www.verbix.com/webverbix/' +
               language + '/' +
               verb + '.html').
    spread(R.pipe(
      R.nthArg(1), // response, body
      scrape
    ));
};

module.exports.conjugate('German', 'mitbringen').
  then(R.curry(JSON.stringify)(R.__, null, 2)).
  then(console.log);
