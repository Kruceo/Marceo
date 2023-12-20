import Plugin from "../lib/Plugin";

export const numlist = new Plugin(/\n\d\./, /.+?/, /\n/, 'numblist', (start:string, content:string, end:string) => `<p class="markdown numlist">${content}</p>`)