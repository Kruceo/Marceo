import Plugin from "../lib/Plugin.mjs"

export const anchor = new Plugin(/(?<!\!)(\[.+?\])\(/, /.+?/, /\)/, 'anchor', (start, content, end) => `<a class="markdown anchor" href="${content}">${start.slice(1, start.length - 2)}</a>`)