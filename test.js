'use strict';

var test = require('tape');
var htmlTagNames = require('.');

test('htmlTagNames', function (t) {
  t.ok(
    Array.isArray(htmlTagNames),
    'should be an `array`'
  );

  htmlTagNames.forEach(function (tagName) {
    t.equal(
      typeof tagName,
      'string',
      '`' + tagName + '` should be a string'
    );
  });

  t.end();
});
