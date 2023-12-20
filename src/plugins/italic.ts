import Plugin from "../lib/Plugin";

export const italic = new Plugin(/\*/, /.+?/, /\*/, 'italic  ', (start:string, content:string, end:string) => `<span class="markdown italic">${content}</span>`)
export const unItalic = new Plugin(/_/, /.+?/, /_/, 'unitalic', (start:string, content:string, end:string) => `<span class="markdown italic">${content}</span>`)