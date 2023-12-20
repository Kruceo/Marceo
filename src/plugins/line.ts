import Plugin from "../lib/Plugin"

export const line =  new Plugin(/(?<=\n)_/, /(_)+/, /_(?=\n)/, 'line    ', () => `<div class="markdown line"></div>`)