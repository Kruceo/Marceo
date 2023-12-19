import Plugin from "../lib/Plugin.mjs";

export const bold = new Plugin(/\*\*/, /.+?/, /\*\*/, 'bold', (start, content, end) => `<span class="markdown bold">${content}</span>`)