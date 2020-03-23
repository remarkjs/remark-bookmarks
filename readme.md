# remark-bookmarks

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to manage links.

## Install

[npm][]:

```sh
npm install remark-bookmarks
```

## Use

Say we have the following file, `example.md`:

```markdown
`remark-bookmarks` is on [npm][]!
```

And our script, `example.js`, looks as follows:

```js
const vfile = require('to-vfile')
const remark = require('remark')
const bookmarks = require('remark-bookmarks')

remark()
  .use(bookmarks, {
    bookmarks: {
      github: 'https://github.com/remarkjs/remark-bookmarks',
      npm: 'https://npmjs.com/package/remark-bookmarks'
    }
  })
  .process(vfile.readSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
`remark-bookmarks` is on [npm][]!

[npm]: https://npmjs.com/package/remark-bookmarks
```

## API

### `remark().use(bookmarks[, options])`

Manage links.

##### `options`

###### `options.bookmarks`

The URLs to share across Markdown documents (`Object.<string>`).
References are case insensitive.

###### `options.overwrite`

Pass `overwrite: true` to ensure that references are used consistently.
By default (`false`), the existing references in the file will take precedence
over anything defined globally.

## Security

`options.bookmarks` is used and injected into the tree as definitions when the
content references them.
This could open you up to a [cross-site scripting (XSS)][xss] attack if you pass
user provided content as bookmarks.

This may become a problem if the Markdown later transformed to
[**rehype**][rehype] ([**hast**][hast]) or opened in an unsafe Markdown viewer.

## Related

*   [`remark-inline-links`](https://github.com/remarkjs/remark-inline-links)
    — Transform references and definitions into normal links and images
*   [`remark-defsplit`](https://github.com/remarkjs/remark-defsplit)
    — Transform links and images into references and definitions with
    URI-based identifiers
*   [`remark-reference-links`](https://github.com/remarkjs/remark-reference-links)
    — Transform links and images into references and definitions
*   [`remark-unlink`](https://github.com/remarkjs/remark-unlink)
    — Remove all links, references and definitions

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Ben Briggs][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/remarkjs/remark-bookmarks/master.svg

[build]: https://travis-ci.org/remarkjs/remark-bookmarks

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-bookmarks.svg

[coverage]: https://codecov.io/github/remarkjs/remark-bookmarks

[downloads-badge]: https://img.shields.io/npm/dm/remark-bookmarks.svg

[downloads]: https://www.npmjs.com/package/remark-bookmarks

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-bookmarks.svg

[size]: https://bundlephobia.com/result?p=remark-bookmarks

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/master/contributing.md

[support]: https://github.com/remarkjs/.github/blob/master/support.md

[coc]: https://github.com/remarkjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: http://beneb.info

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast
