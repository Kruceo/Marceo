import Plugin from "../lib/Plugin.mjs";

export const numlist = new Plugin(/\n\d\./, /.+?/, /\n/, 'numblist', (start, content, end) => `<p class="markdown numlist">${content}</p>`)