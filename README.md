Verbix
=============

Conjugate verbs in a variety of languages. Screenscrapes [verbix.com](http://verbix.com), a wonderful volunteer-maintained resource you should consider [contributing to](http://www.verbix.com/webverbix/donate.html).

[![Circle CI](https://circleci.com/gh/bwestergard/verbix/tree/master.svg?style=svg)](https://circleci.com/gh/bwestergard/verbix/tree/master)
[![npm version](https://badge.fury.io/js/verbix.svg)](https://badge.fury.io/js/verbix)
[![dependencies](https://david-dm.org/bwestergard/verbix.svg)](https://david-dm.org/bwestergard/verbix)

Usage
------

Exports one method, `conjugate`, which takes [a language](http://www.verbix.com/languages/) as the first argument and [a verb infinitive](https://en.wikipedia.org/wiki/Infinitive) as the second. It returns a [promise](https://promisesaplus.com/) for a plain javascript object with of the structure `obj[mood][tense][pronoun]` (e.g. `indicative.present.ich`). The terminal elements are arrays, as in some languages there are multiple conjugations for a given mood/tense/pronoun combination.

```javascript
require('verbix').
  conjugate('German', 'tanzen').
  then(function (tanzen) { console.log(tanzen.indicative.present.ich[0] ); })
// logs "tanze" 
```

These values are scraped from [pages like these](http://www.verbix.com/webverbix/German/tanzen.html). Grammatical moods without nested tense tables (e.g. the imperative in Germanic languages) are not parsed properly at the moment. A pull request to fix that would be happily accepted.

Disclaimers
------------

This is provided as-is without guarantees of any kind. I am not affiliated with the maintainers of `verbix.com`. Screenscraping has been an expedient for my own study of German; but it be forewarned: it is an inherently fragile approach. I have an incentive to keep it working for German for the forseeable future, but beyond that, you shouldn't expect much.

If I make ansome effort to ensure the tables for other languages are parsed properly, it will likely be half-hearted and infrequent.

Contributing
------------

`npm run check` before submitting a pull request.