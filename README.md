# episode-parser

[![CircleCI](https://img.shields.io/circleci/project/tregusti/episode-parser/master.svg)][circleci]
[![NPM release](https://img.shields.io/npm/v/episode-parser.svg)][npm-module]
[![License](https://img.shields.io/npm/l/episode-parser.svg)][license]
[![bitHound](https://www.bithound.io/github/tregusti/episode-parser/badges/score.svg)][bithound]

  [circleci]: https://circleci.com/gh/tregusti/episode-parser
  [npm-module]: https://www.npmjs.com/package/episode-parser
  [license]: http://tregusti.mit-license.org/
  [bithound]: https://www.bithound.io/github/tregusti/episode-parser

A javascript utility for parsing file names in a format that sometimes is used
for tv shows.

It parses a file name like this `Fake.Blood.2013.S07E06.Karma.Sucks.PROPER.720p.HDTV.x264-STALKERS.srt`
into an object with the following possible properties:

  - `show`, string: The name of the show, `'Fake Blood'`.
  - `year`, integer: The release year, `2013`.
  - `season`, integer: The season number, `7`.
  - `episode`, integer: The episode number, `6`.
  - `name`, string: The name of the episode, `'Karma Sucks'`.
  - `quality`, integer: The quality taken from `720p` or `1080p`. In this case `720`.
  - `source`, string: Available values are `'hdtv'`, `'webdl'`, In this case `'hdtv'`.
  - `codec`, string: Codec used, `'x264'`.
  - `group`, string: Release group, `'STALKERS'`.
  - `ext`, string: File extension, `'srt'`.

## Supported formats

Take a look in [the tests][examples] for examples of what file name formats are
supported.

  [examples]: https://github.com/tregusti/episode-parser/blob/master/test/parser.test.js

## Usage

Simply require the module and you get a parsing function that you invoke with
the file name to parse:

```js
var parser = require('episode-parser')
var filename = 'Fake Blood 2x06 I Need Blood.srt'
var result = parser(filename)
console.log(result.show) //= 'Fake Blood'
console.log(result.year) //= undefined
console.log(result.season) //= 2
console.log(result.codec) //= undefined
```

If the parser can't parse the file name, `null` will be returned. If the parser
can't parse out a specific details, the property for that detail will be missing
from the result.

## Installation

```sh
npm install episode-parser
```

## Versioning

This package uses [semver](http://semver.org/spec/v2.0.0.html).

## Contributing

If you feel something is missing, which is highly probable since I made this for
my personal needs, please create a [pull request][pr-help], with tests covering
your case. If you feel somewhat lazy, create an issue instead and I might look
into it.

  [pr-help]: https://help.github.com/articles/using-pull-requests/

## Thank you

[![Flattr](http://img.shields.io/badge/flattr-donate-brightgreen.svg)](https://flattr.com/profile/tregusti)

Building good software and tools takes time. Please do support a future for this project if you are
using it. Thank you!
