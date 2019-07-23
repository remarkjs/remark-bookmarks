import remove from 'unist-util-remove'
import visit from 'unist-util-visit'
import collapse from 'collapse-white-space'

const defaults = {bookmarks: {}, overwrite: false}

export default function bookmarks(opts) {
  const {overwrite, bookmarks} = Object.assign({}, defaults, opts)

  // All reference links should be case-insensitive.
  const associations = Object.keys(bookmarks).reduce((map, label) => {
    map[collapse(label).toUpperCase()] = {label, url: bookmarks[label]}
    return map
  }, {})

  const identifiers = Object.keys(associations)

  if (identifiers.length === 0) {
    return noop
  }

  return ast => {
    const references = {}

    visit(ast, node => {
      const {type, identifier} = node
      const normal = collapse(identifier).toUpperCase()

      if (type === 'linkReference' || type === 'imageReference') {
        references[normal] = true
      } else if (type === 'definition') {
        if (overwrite && identifiers.indexOf(normal) !== -1) {
          remove(ast, node)
        } else if (references[normal]) {
          references[normal] = node
        }
      }
    })

    identifiers.forEach(identifier => {
      const normal = collapse(identifier).toUpperCase()
      const {url, label} = associations[normal]

      if (references[normal] === true) {
        ast.children.push({
          type: 'definition',
          url,
          identifier: normal.toLowerCase(),
          label
        })
      }
    })
  }
}

function noop() {}
