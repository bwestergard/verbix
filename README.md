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

Contributing
------------

`npm run check` before submitting a pull request.

Disclaimers
-------------------

I am not affiliated with the maintainers of `verbix.com`. Screenscraping has been an expedient for my study of German with [Anki](http://ankisrs.net/); but it be forewarned: it is an inherently fragile approach. I have an incentive to keep it working for German for the next few years, but other than that you shouldn't expect much.

If I make an effort to ensure the tables for other languages are parsed properly, it will likely be half-hearted and infrequent.

License
--------


This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>