var Promise = require('bluebird')
var htmlparser = require('htmlparser2')

module.exports = function (html) {
  return new Promise(function (resolve, reject) {
    var handler = new htmlparser.DomHandler(function (err, dom) {
      if (err) reject(err)
      resolve(dom)
    })

    new htmlparser.Parser(handler).parseComplete(html)
  })
}
