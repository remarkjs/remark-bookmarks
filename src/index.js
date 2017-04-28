import remove from 'unist-util-remove';
import visit from 'unist-util-visit';
import u from 'unist-builder';

function noop() {}

function attacher(opts) {
    opts = Object.assign(
        {},
        {
            bookmarks: {},
            overwrite: false,
        },
        opts
    );
    const {overwrite} = opts;
    // All reference links should be case-insensitive.
    const bookmarks = Object.keys(opts.bookmarks).reduce((list, key) => {
        list[key.toLowerCase()] = opts.bookmarks[key];
        return list;
    }, {});
    const bookmarkKeys = Object.keys(bookmarks);
    if (bookmarkKeys.length < 1) {
        return noop;
    }
    return ast => {
        const linkReferences = {};
        visit(ast, node => {
            const {type, identifier} = node;
            if (type === 'linkReference') {
                linkReferences[identifier] = true;
            } else if (type === 'definition') {
                if (overwrite && bookmarkKeys.indexOf(identifier) > -1) {
                    remove(ast, node);
                } else if (linkReferences[identifier]) {
                    linkReferences[identifier] = node;
                }
            }
        });
        bookmarkKeys.forEach(key => {
            const url = bookmarks[key];
            if (linkReferences[key] === true) {
                ast.children.push(u('definition', {url, identifier: key}, key));
            }
        });
    };
}

export default attacher;
