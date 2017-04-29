# [remark][1]-bookmarks [![Build Status][3]][2] [![NPM version][5]][4] [![Dependency Status][7]][6]

> A link manager for Markdown files.


## Table of Contents

* [Install][8]

* [Usage][9]

* [API][10]

  * [remark().use(remarkBookmarks, options)][11]

* [Tips][12]

* [Contributors][13]

* [License][14]


## Install

With [npm][15] do:

```
npm install remark-bookmarks --save-dev
```


## Usage

This module allows you to manage a collection of links across Markdown files; it's useful for use cases where you need to reference the same source several times across multiple sections of your documentation.

Given the following markdown:

```markdown
remark-bookmarks is on [npm]!
```

We can call remark-bookmarks to provide the missing reference:

```javascript
const remark = require('remark');
const remarkBookmarks = require('remark-bookmarks');
const bookmarks = {
    github: 'https://github.com/ben-eb/remark-bookmarks',
    npm: 'https://npmjs.com/package/remark-bookmarks',
};
const processor = remark().use(remarkBookmarks, {bookmarks});
const output = processor.processSync('remark-bookmarks is on [npm]!');
```

The output of this transform is below. Note that only the npm link is inserted into this document, to avoid unnecessary references.

```markdown
remark-bookmarks is on [npm]!

[npm]: https://npmjs.com/package/remark-bookmarks
```


## API

### remark().use(remarkBookmarks[, options])

#### options

##### bookmarks

Type: `Object`<br />
Default: `{}`

Pass the links in that you would like to share across Markdown documents. Note
that the references are case insensitive.

##### overwrite

Type: `Boolean`<br />
Default: `false`

By default, the existing references in the file will take precedence over
anything defined globally. You can pass `true` to this option to ensure that
references are used consistently.


## Tips

By default, this module will append all of the references to the bottom of the
Markdown file, which might be problematic if you are using modules that change
whole sections of Markdown. One such example is [remark-license][16].

To resolve this, we recommend that you use [remark-inline-links][17], which will
transform the references into inline links.


## Contributors

Thanks goes to these wonderful people ([emoji key][18]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars2.githubusercontent.com/u/1282980?v=3" width="100px;"/><br /><sub>Ben Briggs</sub>][19]<br />[💻][20] [📖][21] [⚠️][22] |
| :-----------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][23] specification.
Contributions of any kind are welcome!


## License

MIT © [Ben Briggs][24]

[1]: https://github.com/wooorm/remark

[2]: https://travis-ci.org/ben-eb/remark-bookmarks

[3]: https://travis-ci.org/ben-eb/remark-bookmarks.svg?branch=master

[4]: http://badge.fury.io/js/remark-bookmarks

[5]: https://badge.fury.io/js/remark-bookmarks.svg

[6]: https://gemnasium.com/ben-eb/remark-bookmarks

[7]: https://gemnasium.com/ben-eb/remark-bookmarks.svg

[8]: #install

[9]: #usage

[10]: #api

[11]: #remarkuseremarkbookmarks-options

[12]: #tips

[13]: #contributors

[14]: #license

[15]: https://npmjs.com/package/remark-bookmarks

[16]: https://github.com/wooorm/remark-license

[17]: https://github.com/wooorm/remark-inline-links

[18]: https://github.com/kentcdodds/all-contributors#emoji-key

[19]: http://beneb.info

[24]: http://beneb.info

[20]: https://github.com/ben-eb/remark-bookmarks/commits?author=ben-eb "Code"

[21]: https://github.com/ben-eb/remark-bookmarks/commits?author=ben-eb "Documentation"

[22]: https://github.com/ben-eb/remark-bookmarks/commits?author=ben-eb "Tests"

[23]: https://github.com/kentcdodds/all-contributors
