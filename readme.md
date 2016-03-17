# html-tag-names [![Build Status][build-badge]][build-page] [![Coverage Status][coverage-badge]][coverage-page]

List of known HTML tag-names.  Includes ancient (for example,
`nextid` and `basefont`) and modern (for example, `shadow` and
`template`) tag-names from both W3C and WHATWG.

The repo includes a script to crawl W3C and WHATWG to include newly
introduced tag-names.

## Installation

[npm][]:

```bash
npm install html-tag-names
```

**html-tag-names** is also available as an AMD, CommonJS, and globals
module, [uncompressed and compressed][releases].

## Usage

Dependencies:

```javascript
var htmlTagNames = require('html-tag-names');
```

Slicing the first 20:

```javascript
var first = htmlTagNames.slice(0, 20);
```

Yields:

```js
[ 'a',
  'abbr',
  'acronym',
  'address',
  'applet',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'basefont',
  'bdi',
  'bdo',
  'bgsound',
  'big',
  'blink',
  'blockquote',
  'body',
  'br' ]
```

And `length`:

```javascript
var length = htmlTagNames.length;
```

Yields:

```js
147
```

## API

### `htmlTagNames`

`Array.<string>` — List of lower-case tag-names.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/html-tag-names.svg

[build-page]: https://travis-ci.org/wooorm/html-tag-names

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/html-tag-names.svg

[coverage-page]: https://codecov.io/github/wooorm/html-tag-names?branch=master

[npm]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/html-tag-names/releases

[license]: LICENSE

[author]: http://wooorm.com
