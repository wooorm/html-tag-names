import fs from 'fs'
import https from 'https'
import concat from 'concat-stream'
import {bail} from 'bail'
import unified from 'unified'
import html from 'rehype-parse'
// @ts-ignore
import select from 'hast-util-select'
// @ts-ignore
import toString from 'hast-util-to-string'
import {htmlTagNames} from './index.js'

var proc = unified().use(html)

var count = 0

// Crawl W3C.
https.get('https://w3c.github.io/elements-of-html/', onw3c)

// Crawl WHATWG.
https.get('https://html.spec.whatwg.org/multipage/indices.html', onwhatwg)

/**
 * @param {import('http').IncomingMessage} response
 */
function onw3c(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  /**
   * @param {Buffer} buf
   */
  function onconcat(buf) {
    var nodes = select.selectAll('[scope="row"] code', proc.parse(buf))
    var index = -1
    /** @type {string} */
    var data

    while (++index < nodes.length) {
      data = toString(nodes[index])

      if (data && !/\s/.test(data) && !htmlTagNames.includes(data)) {
        htmlTagNames.push(data)
      }
    }

    done()
  }
}

/**
 * @param {import('http').IncomingMessage} response
 */
function onwhatwg(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  /**
   * @param {Buffer} buf
   */
  function onconcat(buf) {
    var nodes = select.selectAll('tbody th code', proc.parse(buf))
    var index = -1
    /** @type {string?} */
    var id
    /** @type {string} */
    var data

    while (++index < nodes.length) {
      id = nodes[index].properties.id
      data = toString(nodes[index])

      if (
        id &&
        id.slice(0, 'elements-3:'.length) === 'elements-3:' &&
        !htmlTagNames.includes(data)
      ) {
        htmlTagNames.push(data)
      }
    }

    done()
  }
}

function done() {
  count++

  if (count === 2) {
    fs.writeFile(
      'index.js',
      'export var htmlTagNames = ' +
        JSON.stringify(htmlTagNames.sort(), null, 2) +
        '\n',
      bail
    )
  }
}
