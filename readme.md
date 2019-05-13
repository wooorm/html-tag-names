# html-tag-names

[![Build][build-badge]][build]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

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

## Usage

```javascript
var htmlTagNames = require('html-tag-names')

console.log(htmlTagNames.length) // => 148

console.log(htmlTagNames.slice(0, 20))
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

## API

### `htmlTagNames`

`Array.<string>` — List of lower-case tag-names.

## Related

*   [`mathml-tag-names`](https://github.com/wooorm/mathml-tag-names)
    — List of MathML tags
*   [`svg-tag-names`](https://github.com/wooorm/svg-tag-names)
    — List of SVG tags
*   [`svg-element-attributes`](https://github.com/wooorm/svg-element-attributes)
    — Map of SVG elements to allowed attributes
*   [`html-element-attributes`](https://github.com/wooorm/html-element-attributes)
    — Map of HTML elements to allowed attributes
*   [`aria-attributes`](https://github.com/wooorm/aria-attributes)
    — List of ARIA attributes

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://img.shields.io/travis/wooorm/html-tag-names.svg

[build]: https://travis-ci.org/wooorm/html-tag-names

[downloads-badge]: https://img.shields.io/npm/dm/html-tag-names.svg

[downloads]: https://www.npmjs.com/package/html-tag-names

[size-badge]: https://img.shields.io/bundlephobia/minzip/html-tag-names.svg

[size]: https://bundlephobia.com/result?p=html-tag-names

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
