import visit from 'unist-util-visit'
import collapse from 'collapse-white-space'

const defaults = {bookmarks: {}, overwrite: false}

export default function bookmarks(options) {
  const {overwrite, bookmarks} = Object.assign({}, defaults, options)

  // All reference links should be case-insensitive.
  const associations = {}
  Object.keys(bookmarks).forEach((label) => {
    associations[collapse(label).toUpperCase()] = {label, url: bookmarks[label]}
  })

  const identifiers = Object.keys(associations)

  if (identifiers.length === 0) {
    return noop
  }

  return (ast) => {
    const references = {}

    visit(ast, (node, index, parent) => {
      const {type, identifier} = node
      const normal = collapse(identifier).toUpperCase()

      if (type === 'linkReference' || type === 'imageReference') {
        references[normal] = true
      } else if (type === 'definition') {
        if (overwrite && identifiers.includes(normal)) {
          parent.children.splice(index, 1)
          return index
        }

        if (references[normal]) {
          references[normal] = node
        }
      }
    })

    identifiers.forEach((identifier) => {
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
