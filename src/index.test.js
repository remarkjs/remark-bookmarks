import test from 'ava';
import remark from 'remark';
import bookmarks from './';

function equal(t, fixture, expected, options) {
    const output = remark().use(bookmarks, options).processSync(fixture);
    t.deepEqual(expected, output.contents);
}

test(equal, '[pass through]\n', '[pass through]\n');
test(equal, '[pass through][]\n', '[pass through][]\n');

test(
    equal,
    '[description][caseInsensitive]\n',
    '[description][caseinsensitive]\n\n[caseinsensitive]: https://twitter.com/ben_eb\n',
    {bookmarks: {caseInsensitive: `https://twitter.com/ben_eb`}}
);

test(
    equal,
    '[twitter][]\n',
    '[twitter][]\n\n[twitter]: https://twitter.com/ben_eb\n',
    {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
);

test(
    equal,
    '[twitter]\n',
    '[twitter]\n\n[twitter]: https://twitter.com/ben_eb\n',
    {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
);

test(
    equal,
    '[twitter][twitter]\n',
    '[twitter][twitter]\n\n[twitter]: https://twitter.com/ben_eb\n',
    {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
);

test(
    equal,
    '[longer description][twitter]\n',
    '[longer description][twitter]\n\n[twitter]: https://twitter.com/ben_eb\n',
    {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
);

test(
    equal,
    '[already exists][twitter]\n\n[twitter]: https://twitter.com/wooorm\n',
    '[already exists][twitter]\n\n[twitter]: https://twitter.com/wooorm\n',
    {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
);

test(
    equal,
    '[overwrite][twitter]\n\n[twitter]: https://twitter.com/wooorm\n',
    '[overwrite][twitter]\n\n[twitter]: https://twitter.com/ben_eb\n',
    {bookmarks: {twitter: `https://twitter.com/ben_eb`}, overwrite: true}
);

test(
    equal,
    '-   [github]\n-   [overwrite][twitter]\n\n[github]: https://github.com/ben-eb\n[twitter]: https://twitter.com/wooorm\n',
    '-   [github]\n-   [overwrite][twitter]\n\n[github]: https://github.com/ben-eb\n\n[twitter]: https://twitter.com/ben_eb\n',
    {bookmarks: {twitter: `https://twitter.com/ben_eb`}, overwrite: true}
);

test(
    equal,
    '[github]: https://github.com/ben-eb\n\n[github link].\n',
    '[github]: https://github.com/ben-eb\n\n[github link].\n',
    {bookmarks: {twitter: `https://twitter.com/ben_eb`}, overwrite: true}
);
