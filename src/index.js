import remove from 'unist-util-remove'
import visit from 'unist-util-visit'

const defaults = {bookmarks: {}, overwrite: false}

export default function bookmarks(opts) {
  const {overwrite, bookmarks} = Object.assign({}, defaults, opts)

  // All reference links should be case-insensitive.
  const associations = Object.keys(bookmarks).reduce((map, label) => {
    map[label.toLowerCase()] = {label, url: bookmarks[label]}
    return map
  }, {})

  const identifiers = Object.keys(associations)

  if (identifiers.length === 0) {
    return noop
  }

  return ast => {
    const linkReferences = {}

    visit(ast, node => {
      const {type, identifier} = node

      if (type === 'linkReference') {
        linkReferences[identifier] = true
      } else if (type === 'definition') {
        if (overwrite && identifiers.indexOf(identifier) > -1) {
          remove(ast, node)
        } else if (linkReferences[identifier]) {
          linkReferences[identifier] = node
        }
      }
    })

    identifiers.forEach(identifier => {
      const {url, label} = associations[identifier]

      if (linkReferences[identifier] === true) {
        ast.children.push({type: 'definition', url, identifier, label})
      }
    })
  }
}

function noop() {}
