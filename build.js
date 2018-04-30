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

/* Crawl W3C. */
https.get('https://w3c.github.io/elements-of-html/', onw3c)

/* Crawl WHATWG. */
https.get('https://html.spec.whatwg.org/multipage/indices.html', onwhatwg)

function onw3c(res) {
  res.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    selectAll('[scope="row"] code', proc.parse(buf)).forEach(each)

    done()
  }

  function each(node) {
    var data = toString(node)

    if (data && !/\s/.test(data) && list.indexOf(data) === -1) {
      list.push(data)
    }
  }
}

function onwhatwg(res) {
  res.pipe(concat(onconcat)).on('error', bail)

  function onconcat(buf) {
    selectAll('tbody th code', proc.parse(buf)).forEach(each)

    done()
  }

  function each(node) {
    var id = node.properties.id
    var data = toString(node)

    if (
      id &&
      id.slice(0, 'elements-3:'.length) === 'elements-3:' &&
      list.indexOf(data) === -1
    ) {
      list.push(data)
    }
  }
}

function done() {
  count++

  if (count === 2) {
    fs.writeFile('index.json', JSON.stringify(list.sort(), 0, 2) + '\n', bail)
  }
}
