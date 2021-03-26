'use strict'

var fs = require('fs')
var https = require('https')
var concat = require('concat-stream')
var bail = require('bail')
var unified = require('unified')
var html = require('rehype-parse')
var selectAll = require('hast-util-select').selectAll
var toString = require('hast-util-to-string')
var list = require('.')

var proc = unified().use(html)

var count = 0

// Crawl W3C.
https.get('https://w3c.github.io/elements-of-html/', onw3c)

// Crawl WHATWG.
https.get('https://html.spec.whatwg.org/multipage/indices.html', onwhatwg)

function onw3c(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var nodes = selectAll('[scope="row"] code', proc.parse(buf))
    var index = -1
    var data

    while (++index < nodes.length) {
      data = toString(nodes[index])

      if (data && !/\s/.test(data) && !list.includes(data)) {
        list.push(data)
      }
    }

    done()
  }
}

function onwhatwg(response) {
  response.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    var nodes = selectAll('tbody th code', proc.parse(buf))
    var index = -1
    var id
    var data

    while (++index < nodes.length) {
      id = nodes[index].properties.id
      data = toString(nodes[index])

      if (
        id &&
        id.slice(0, 'elements-3:'.length) === 'elements-3:' &&
        !list.includes(data)
      ) {
        list.push(data)
      }
    }

    done()
  }
}

function done() {
  count++

  if (count === 2) {
    fs.writeFile('index.json', JSON.stringify(list.sort(), 0, 2) + '\n', bail)
  }
}
