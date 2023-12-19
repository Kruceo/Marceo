import Plugin from "../lib/Plugin.mjs";

export const italic = new Plugin(/\*/, /.+?/, /\*/, 'italic  ', (start, content, end) => `<span class="markdown italic">${content}</span>`)

export const unItalic = new Plugin(/_/, /.+?/, /_/, 'unitalic', (start, content, end) => `<span class="markdown italic">${content}</span>`)