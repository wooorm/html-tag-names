import fs from 'node:fs'
import https from 'node:https'
import concatStream from 'concat-stream'
import {bail} from 'bail'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import {selectAll} from 'hast-util-select'
import {toString} from 'hast-util-to-string'
import {htmlTagNames} from './index.js'

const proc = unified().use(rehypeParse)

let count = 0

// Crawl W3C.
https.get('https://w3c.github.io/elements-of-html/', onw3c)

// Crawl WHATWG.
https.get('https://html.spec.whatwg.org/multipage/indices.html', onwhatwg)

/**
 * @param {import('http').IncomingMessage} response
 */
function onw3c(response) {
  response.pipe(concatStream(onconcat)).on('error', bail)

  /**
   * @param {Buffer} buf
   */
  function onconcat(buf) {
    const nodes = selectAll('[scope="row"] code', proc.parse(buf))
    let index = -1

    while (++index < nodes.length) {
      const data = toString(nodes[index])

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
  response.pipe(concatStream(onconcat)).on('error', bail)

  /**
   * @param {Buffer} buf
   */
  function onconcat(buf) {
    const nodes = selectAll('tbody th code', proc.parse(buf))
    let index = -1

    while (++index < nodes.length) {
      const id = String(nodes[index].properties.id || '')
      const data = toString(nodes[index])

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
      'export const htmlTagNames = ' +
        JSON.stringify(htmlTagNames.sort(), null, 2) +
        '\n',
      bail
    )
  }
}
