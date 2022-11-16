import fs from 'node:fs/promises'
import fetch from 'node-fetch'
import {fromHtml} from 'hast-util-from-html'
import {selectAll} from 'hast-util-select'
import {toString} from 'hast-util-to-string'
import {htmlTagNames} from './index.js'

// Crawl W3C.
const responseW3c = await fetch('https://w3c.github.io/elements-of-html/')
const textW3c = await responseW3c.text()

const nodesW3c = selectAll('[scope="row"] code', fromHtml(textW3c))
let index = -1

while (++index < nodesW3c.length) {
  const data = toString(nodesW3c[index])

  if (data && !/\s/.test(data)) {
    htmlTagNames.push(data)
  }
}

// Crawl WHATWG.
const responseWhatwg = await fetch(
  'https://html.spec.whatwg.org/multipage/indices.html'
)
const textWhatwg = await responseWhatwg.text()

const nodesWhatwg = selectAll('tbody th code', fromHtml(textWhatwg))
index = -1

while (++index < nodesWhatwg.length) {
  const node = nodesWhatwg[index]
  const id = String((node.properties || {}).id || '')
  const data = toString(node)

  if (id && id.slice(0, 'elements-3:'.length) === 'elements-3:') {
    htmlTagNames.push(data)
  }
}

const list = [...new Set(htmlTagNames)].sort()

await fs.writeFile(
  'index.js',
  [
    '/**',
    ' * List of known HTML tag names.',
    ' *',
    ' * @type {Array<string>}',
    ' */',
    'export const htmlTagNames = ' + JSON.stringify(list, null, 2),
    ''
  ].join('\n')
)
