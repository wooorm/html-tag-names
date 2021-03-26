# html-tag-names

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

List of known HTML tag names.
Includes ancient (for example, `nextid` and `basefont`) and modern (for example,
`shadow` and `template`) names from the HTML living standard.

The repo includes a script to crawl specs to include newly introduced names.

## Install

This package is ESM only: Node 12+ is needed to use it and it must be `import`ed
instead of `require`d.

[npm][]:

```sh
npm install html-tag-names
```

## Use

```js
import {htmlTagNames} from 'html-tag-names'

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

This package exports the following identifiers: `htmlTagNames`.
There is no default export.

### `htmlTagNames`

`string[]` — List of lowercase tag names.

## Related

*   [`mathml-tag-names`](https://github.com/wooorm/mathml-tag-names)
    — List of MathML tags
*   [`svg-tag-names`](https://github.com/wooorm/svg-tag-names)
    — List of SVG tags
*   [`react-tag-names`](https://github.com/jgierer12/react-tag-names)
    — List of React’s HTML and SVG tag names
*   [`svg-element-attributes`](https://github.com/wooorm/svg-element-attributes)
    — Map of SVG elements to allowed attributes
*   [`html-element-attributes`](https://github.com/wooorm/html-element-attributes)
    — Map of HTML elements to allowed attributes
*   [`aria-attributes`](https://github.com/wooorm/aria-attributes)
    — List of ARIA attributes

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definition -->

[build-badge]: https://github.com/wooorm/html-tag-names/workflows/main/badge.svg

[build]: https://github.com/wooorm/html-tag-names/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/html-tag-names.svg

[coverage]: https://codecov.io/github/wooorm/html-tag-names

[downloads-badge]: https://img.shields.io/npm/dm/html-tag-names.svg

[downloads]: https://www.npmjs.com/package/html-tag-names

[size-badge]: https://img.shields.io/bundlephobia/minzip/html-tag-names.svg

[size]: https://bundlephobia.com/result?p=html-tag-names

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com
