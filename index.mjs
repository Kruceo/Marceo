

import Match from "./src/lib/Match.mjs"
import Plugin from "./src/lib/Plugin.mjs"

export function parse(string) {

    const NEWLINE = "\n"
    let raw = ('\n' + string + '\n')

    const collections = [
        new Plugin(/(\n)##### /, /.+?/, /\n/                   ,'header5', (start,content,end)=>`<h5 class="markdown header5">${content}</h5>\n`),
        new Plugin(/(\n)#### /, /.+?/, /\n/                    ,'header4', (start,content,end)=>`<h4 class="markdown header4">${content}</h4>\n`),
        new Plugin(/(\n)### /, /.+?/, /\n/                     ,'header3', (start,content,end)=>`<h3 class="markdown header3">${content}</h3>\n`),
        new Plugin(/(\n)## /, /.+?/, /\n/                      ,'header2', (start,content,end)=>`<h2 class="markdown header2">${content}</h2>\n`),
        new Plugin(/(\n)# /, /.+?/, /\n/                       ,'header1', (start,content,end)=>`<h1 class="markdown header1">${content}</h1>\n`),
        new Plugin(/(?<=\n)\* /, /.+?/, /(?=\n)/               ,'dotlist', (start,content,end)=>`<li class="markdown dotlist">${content}</li>\n`),
        new Plugin(/\*\*\*/, /.+?/, /\*\*\*/                   ,'bi'     , (start,content,end)=>`<span class="markdown bold italic">${content}</span>`),
        new Plugin(/\*\*/, /.+?/, /\*\*/                       ,'bold'   , (start,content,end)=>`<span class="markdown bold">${content}</span>`),
        new Plugin(/\*/, /.+?/, /\*/                           ,'italic  ',(start,content,end)=>`<span class="markdown italic">${content}</span>`),
        new Plugin(/\n_/, /_/, /_\n/                           ,'line    ',(start,content,end)=>`<div class="markdown line"/>`),
        new Plugin(/_/, /.+?/, /_/                             ,'txitalic',(start,content,end)=>`<span class="markdown italic">${content}</span>`),
        new Plugin(/\d\./, /.+?/, /\n/                         ,'numblist',(start,content,end)=>`<span class="markdown italic">${content}</span>`),
        new Plugin(/(?<!\|)\n\|/,/(.+\|\n\|.+)+?/,/\|\n(?!\|)/ ,'table',   (start,content,end)=>`<span class="markdown table">${content}</span>`), 
       
    ]
    
    collections.forEach(each=>{
        raw = each.identifyText(raw)
    })

    collections.forEach(each=>{
        // raw = each.replaceSymbols(raw)
    })

    raw = raw.replace(/@end-.+?@/g,'</span>')
    raw = raw.replace(/@.+?@/g,`<span style="color:rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255});">`)

    raw = raw.replaceAll("\n","$")
    console.log(raw+'----')
    return "<div class=\"markdown background\">\n" + raw.replaceAll(NEWLINE, '\n') + "\n</div>"
}


parse(
    `
|teste|teste|
|---|---|
|ok|ok|
`)