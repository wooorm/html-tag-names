import test from 'tape'
import {htmlTagNames} from './index.js'

test('htmlTagNames', function (t) {
  let index = -1

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
