var R = require('ramda');
var $http = require('http-as-promised');
var fs = require('fs');
var domFromHtml = require('./parse');

var moodHtml = fs.readFileSync('./sample_mood.html', 'utf8');

var extractTitle = R.pipe(
  R.prop('children'),
  R.find(
    R.pipe(
      R.prop('name'),
      R.contains(R.__, ['h1', 'h2','h3'])
    )
  ),
  R.prop('children'),
  R.find(R.propEq('type','text')),
  R.prop('data'),
  function (t) {
    return t.replace(/\s+/g, '');
  },
  R.toLower
);

var extractTenseTables = R.pipe(
  R.prop('children'),
  R.find(R.propEq('name','div')),
  R.prop('children'),
  R.filter(R.propEq('name','div'))
);

// Given an array of dom elements, find spans recursively
var getSpans = function (elements) {
  return R.pipe(
    R.map(
      R.cond([
        [R.propEq('name', 'span'), R.identity],
        [R.T, R.pipe(
          R.prop('children'),
          R.defaultTo([]),
          getSpans
        )]
      ])
    ),
    R.unnest
  )(elements);
};

// https://github.com/ramda/ramda/issues/1515
var splitOn = R.curry(function (predicate, arr) {
  return R.reduce(function (acc, val) {
    return predicate(val) ?
      R.concat(acc, [[]]) :
      R.concat(R.init(acc),
               [R.concat(R.last(acc), [val])]
              );
  }, [[]], arr);
});

var extractTextFromSpan = R.pipe(
  R.prop('children'),
  // A text element is the span's only child
  R.head,
  R.prop('data'),
  R.trim
);

var splitDoublePronouns = function (rows) {
  return R.pipe(
    R.map(function (row) {
      var pronouns = R.slice(0, -1, row);
      return R.map(function (extra) {
        return [extra, R.last(row)];
      })(pronouns);
    }),
    R.unnest
  )(rows);
};

var summarizeTenseTable = function (el) {
  var getPronounConjugationMap = R.pipe(
    R.prop('children'),
    // The rows are enclosed in a <p></p>
    R.find(R.propEq('name','p')),
    R.prop('children'),
    // The rows are separated by brs
    splitOn(R.propEq('name', 'br')),
    // There are font tags around some of the spans
    R.map(getSpans),
    R.map(R.map(extractTextFromSpan)),
    // A row must have at least two elements
    R.filter(R.pipe(R.length, R.gte(R.__, 2))),
    splitDoublePronouns,
    R.fromPairs
  );

  return R.assoc(extractTitle(el), getPronounConjugationMap(el), {});
};

domFromHtml(moodHtml).then(
  R.pipe(
    R.head,
    extractTenseTables,    
    R.map(summarizeTenseTable),
    R.reduce(R.merge, {})
  )
).then(console.log);
