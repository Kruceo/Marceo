import Plugin from "../lib/Plugin"

export const header5 = new Plugin(/(\n)##### /, /.+?/, /\n/, 'header5', (start:string, content:string, end:string) => `<h5 class="markdown header5">${content}</h5>\n`)
export const header4 = new Plugin(/(\n)#### /, /.+?/, /\n/, 'header4',  (start:string, content:string, end:string) => `<h4 class="markdown header4">${content}</h4>\n`)
export const header3 = new Plugin(/(\n)### /, /.+?/, /\n/, 'header3',   (start:string, content:string, end:string) => `<h3 class="markdown header3">${content}</h3>\n`)
export const header2 = new Plugin(/(\n)## /, /.+?/, /\n/, 'header2',    (start:string, content:string, end:string) => `<h2 class="markdown header2">${content}</h2>\n`)
export const header1 = new Plugin(/(\n)# /, /.+?/, /\n/, 'header1',     (start:string, content:string, end:string) => `<h1 class="markdown header1">${content}</h1>\n`)       