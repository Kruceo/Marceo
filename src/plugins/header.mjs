import Plugin from "../lib/Plugin.mjs"

export const header5 = new Plugin(/(\n)##### /, /.+?/, /\n/, 'header5', (start, content, end) => `<h5 class="markdown header5">${content}</h5>\n`)
export const header4 = new Plugin(/(\n)#### /, /.+?/, /\n/, 'header4', (start, content, end) => `<h4 class="markdown header4">${content}</h4>\n`)
export const header3 = new Plugin(/(\n)### /, /.+?/, /\n/, 'header3', (start, content, end) => `<h3 class="markdown header3">${content}</h3>\n`)
export const header2 = new Plugin(/(\n)## /, /.+?/, /\n/, 'header2', (start, content, end) => `<h2 class="markdown header2">${content}</h2>\n`)
export const header1 = new Plugin(/(\n)# /, /.+?/, /\n/, 'header1', (start, content, end) => `<h1 class="markdown header1">${content}</h1>\n`)       