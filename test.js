'use strict'

var test = require('tape')
var htmlTagNames = require('.')

test('htmlTagNames', function (t) {
  var index = -1

  t.ok(Array.isArray(htmlTagNames), 'should be an `array`')

  while (++index < htmlTagNames.length) {
    t.equal(
      typeof htmlTagNames[index],
      'string',
      '`' + htmlTagNames[index] + '` should be a string'
    )
  }

  t.end()
})
