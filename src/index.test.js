import test from 'ava'
import remark from 'remark'
import bookmarks from '.'

function equal(t, fixture, expected, options) {
  const output = remark()
    .use(bookmarks, options)
    .processSync(fixture)
  t.deepEqual(expected, output.contents)
}

test('#1', equal, '[pass through]\n', '[pass through]\n')
test('#2', equal, '[pass through][]\n', '[pass through][]\n')

test(
  '#3',
  equal,
  '[description][caseInsensitive]\n',
  '[description][caseInsensitive]\n\n[caseInsensitive]: https://twitter.com/ben_eb\n',
  {bookmarks: {caseInsensitive: `https://twitter.com/ben_eb`}}
)

test(
  '#4',
  equal,
  '[twitter][]\n',
  '[twitter][]\n\n[twitter]: https://twitter.com/ben_eb\n',
  {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
)

test(
  '#5',
  equal,
  '[twitter]\n',
  '[twitter]\n\n[twitter]: https://twitter.com/ben_eb\n',
  {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
)

test(
  '#6',
  equal,
  '[twitter][twitter]\n',
  '[twitter][twitter]\n\n[twitter]: https://twitter.com/ben_eb\n',
  {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
)

test(
  '#7',
  equal,
  '[longer description][twitter]\n',
  '[longer description][twitter]\n\n[twitter]: https://twitter.com/ben_eb\n',
  {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
)

test(
  '#8',
  equal,
  '[already exists][twitter]\n\n[twitter]: https://twitter.com/wooorm\n',
  '[already exists][twitter]\n\n[twitter]: https://twitter.com/wooorm\n',
  {bookmarks: {twitter: `https://twitter.com/ben_eb`}}
)

test(
  '#9',
  equal,
  '[overwrite][twitter]\n\n[twitter]: https://twitter.com/wooorm\n',
  '[overwrite][twitter]\n\n[twitter]: https://twitter.com/ben_eb\n',
  {bookmarks: {twitter: `https://twitter.com/ben_eb`}, overwrite: true}
)

test(
  '#10',
  equal,
  '-   [github]\n-   [overwrite][twitter]\n\n[github]: https://github.com/ben-eb\n[twitter]: https://twitter.com/wooorm\n',
  '-   [github]\n-   [overwrite][twitter]\n\n[github]: https://github.com/ben-eb\n\n[twitter]: https://twitter.com/ben_eb\n',
  {bookmarks: {twitter: `https://twitter.com/ben_eb`}, overwrite: true}
)

test(
  '#11',
  equal,
  '[github]: https://github.com/ben-eb\n\n[github link].\n',
  '[github]: https://github.com/ben-eb\n\n[github link].\n',
  {bookmarks: {twitter: `https://twitter.com/ben_eb`}, overwrite: true}
)
