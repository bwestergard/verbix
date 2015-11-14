var R = require('ramda')
var $http = require('http-as-promised')
var scrape = require('./lib/scrape')

module.exports.conjugate = R.curry(function (language, verb) {
  return $http('http://www.verbix.com/webverbix/' +
    language + '/' +
    verb + '.html')
    .spread(R.pipe(
      R.nthArg(1), // response, body
      scrape
    ))
})
