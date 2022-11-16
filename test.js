import assert from 'node:assert/strict'
import test from 'node:test'
import {htmlTagNames} from './index.js'

test('htmlTagNames', function () {
  let index = -1

  assert.ok(Array.isArray(htmlTagNames), 'should be an `array`')

  while (++index < htmlTagNames.length) {
    assert.equal(
      typeof htmlTagNames[index],
      'string',
      '`' + htmlTagNames[index] + '` should be a string'
    )
  }
})
