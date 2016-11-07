'use strict';

/* Dependencies. */
var fs = require('fs');
var jsdom = require('jsdom');
var bail = require('bail');
var list = require('./');

var count = 0;

/* Write. */
function done() {
  count++;

  if (count === 2) {
    fs.writeFile('index.json', JSON.stringify(list.sort(), 0, 2) + '\n', bail);
  }
}

/* Crawl W3C. */
jsdom.env('http://w3c.github.io/elements-of-html/', function (err, window) {
  bail(err);

  var rows = [].slice.call(window.document.querySelectorAll('[scope="row"] code'));

  rows.forEach(function (row) {
    var data = row.textContent;

    if (data && !/\s/.test(data) && list.indexOf(data) === -1) {
      list.push(data);
    }
  });

  done();
});

/* Crawl WHATWG. */
jsdom.env('https://html.spec.whatwg.org/multipage/indices.html#elements-3', function (err, window) {
  bail(err);

  var rows = [].slice.call(window.document.querySelectorAll('tbody th code'));

  rows.forEach(function (row) {
    var data = row.children && row.children[0] && row.children[0].textContent;

    if (
      row.id &&
      row.id.slice(0, 'elements-3:'.length) === 'elements-3:' &&
      list.indexOf(data) === -1
    ) {
      list.push(data);
    }
  });

  done();
});
