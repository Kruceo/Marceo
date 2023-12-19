import Plugin from "../lib/Plugin.mjs"

export const line =  new Plugin(/\n_/, /_/, /_\n/, 'line    ', (start, content, end) => `<div class="markdown line"/>`)