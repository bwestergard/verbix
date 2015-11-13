var R = require('ramda');
var $http = require('http-as-promised');
var fs = require('fs');
var domFromHtml = require('./parse');

var moodHtml = fs.readFileSync('./sample_mood.html', 'utf8');

var getChildren = R.propOr([], 'children');

var extractTitle = R.pipe(
  getChildren,
  R.find(
    R.pipe(
      R.prop('name'),
      R.contains(R.__, ['h1', 'h2','h3'])
    )
  ),
  getChildren,
  R.find(R.propEq('type','text')),
  R.prop('data'),
  function (t) {
    return t.replace(/\s+/g, '_');
  },
  R.toLower
);

var extractTenseTables = R.pipe(
  getChildren,
  R.find(R.propEq('name','div')),
  getChildren,
  R.filter(R.propEq('name','div'))
);

// recursive search of element array
var recursiveElSearch = R.curry(function (predicate, elements) {
  return R.pipe(
    R.map(
      R.cond([
        [predicate, R.identity],
        [R.T, R.pipe(
          getChildren,
          recursiveElSearch(predicate)
        )]
      ])
    ),
    R.unnest
  )(elements);
});

// Given an array of dom elements, find spans recursively
var getSpans = recursiveElSearch(R.propEq('name', 'span'));

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
  getChildren,
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
    getChildren,
    // The rows are enclosed in a <p></p>
    R.find(R.propEq('name','p')),    
    getChildren,
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

var moodElPredicate = R.pipe(
  R.path(['attribs', 'class']),
  // Totally magic string
  R.equals('pure-u-1-1 pure-u-lg-1-2')
);

var tenseElPredicate = R.pipe(
  R.path(['attribs', 'class']),
  // Totally magic string
  R.equals('pure-u-1-2')
);

var summarizeMoodTable = function (el) {
  var getTenseTables = R.pipe(
    getChildren,
    recursiveElSearch(tenseElPredicate)
  );  

  return R.assoc(
    extractTitle(el),
    R.pipe(
      getTenseTables,
      R.map(summarizeTenseTable)
    )(el),
    {}
  );
};

domFromHtml(moodHtml).
then(R.head).
then(summarizeMoodTable).
then(R.curry(JSON.stringify)(R.__, null, 2)).
then(console.log);
