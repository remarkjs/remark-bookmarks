# remark-bookmarks

[![Build][2]][1]
[![Coverage][4]][3]
[![Downloads][6]][5]
[![Chat][8]][7]
[![Sponsors][10]][9]
[![Backers][11]][9]

Link manager for Markdown files with [remark][12].

## Installation

[npm][13]:

```bash
npm install remark-bookmarks
```

## Usage

This module allows you to manage a collection of links across Markdown files; it’s useful for use cases where you need to reference the same source several times across multiple sections of your documentation.  Given the following markdown:

```markdown
remark-bookmarks is on [npm]!
```

And we require dependencies:

```javascript
const remark = require('remark')
const remarkBookmarks = require('remark-bookmarks')
```

We can call remark-bookmarks to provide the missing reference:

```javascript
const output = remark()
  .use(remarkBookmarks, {
    bookmarks: {
      github: 'https://github.com/remarkjs/remark-bookmarks',
      npm: 'https://npmjs.com/package/remark-bookmarks'
    }
  })
  .processSync('remark-bookmarks is on [npm]!')
  .toString()
```

The output of this transform is below.

Note that only the npm link is inserted into this document, to avoid unnecessary references.

```markdown
remark-bookmarks is on [npm]!

[npm]: https://npmjs.com/package/remark-bookmarks
```

## API

### `remark.use(bookmarks[, options])`

Manage links.

By default, this module will append all of the references to the bottom of the
Markdown file, which might be problematic if you are using modules that change
whole sections of Markdown.
One such example is [`remark-license`][14].

To resolve this, we recommend that you use [`remark-inline-links`][15], which
will transform the references into inline links.

###### `options.bookmarks`

The URLs to share across Markdown documents (`Object.<string>`).
References are case insensitive.

###### `options.overwrite`

Pass `overwrite: true` to ensure that references are used consistently.
By default (`false`), the existing references in the file will take precedence
over anything defined globally.

## Related

*   [`remark-inline-links`][15]
    — Transform references and definitions into normal links and images
*   [`remark-defsplit`][16]
    — Transform links and images into references and definitions with
    URI-based identifiers
*   [`remark-reference-links`][17]
    — Transform links and images into references and definitions
*   [`remark-unlink`][18]
    — Remove all links, references and definitions

## Contribute

See [`contributing.md` in `remarkjs/remark`][19] for ways to get
started.

This organisation has a [Code of Conduct][20].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][21] © [Ben Briggs][22]

[1]: https://travis-ci.org/remarkjs/remark-bookmarks

[2]: https://img.shields.io/travis/remarkjs/remark-bookmarks.svg

[3]: https://codecov.io/github/remarkjs/remark-bookmarks

[4]: https://img.shields.io/codecov/c/github/remarkjs/remark-bookmarks.svg

[5]: https://www.npmjs.com/package/remark-bookmarks

[6]: https://img.shields.io/npm/dm/remark-bookmarks.svg

[7]: https://spectrum.chat/unified/remark

[8]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[9]: https://opencollective.com/unified

[10]: https://opencollective.com/unified/sponsors/badge.svg

[11]: https://opencollective.com/unified/backers/badge.svg

[12]: https://github.com/remarkjs/remark

[13]: https://docs.npmjs.com/cli/install

[14]: https://github.com/remarkjs/remark-license

[15]: https://github.com/remarkjs/remark-inline-links

[16]: https://github.com/remarkjs/remark-defsplit

[17]: https://github.com/remarkjs/remark-reference-links

[18]: https://github.com/remarkjs/remark-unlink

[19]: https://github.com/remarkjs/remark/blob/master/contributing.md

[20]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md

[21]: license

[22]: http://beneb.info
