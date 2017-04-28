// This module allows you to manage a collection of links across Markdown files; it's useful for use cases where you need to reference the same source several times across multiple sections of your documentation.
// Given the following markdown:
console.log('markdown', 'remark-bookmarks is on [npm]!');
// We can call remark-bookmarks to provide the missing reference:
const remark = require('remark');
const remarkBookmarks = require('./dist/index.js');

const bookmarks = {
    github: 'https://github.com/ben-eb/remark-bookmarks',
    npm: 'https://npmjs.com/package/remark-bookmarks',
};

const processor = remark().use(remarkBookmarks, {bookmarks});
const output = processor.processSync('remark-bookmarks is on [npm]!');

// The output of this transform is below. Note that only the npm link is inserted into this document, to avoid unnecessary references.
console.log('markdown', output.contents);
