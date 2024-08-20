import Plugin from "./lib/Plugin"
import { anchor } from "./plugins/anchor"
import { bold } from "./plugins/bold"
import { codeBlock } from "./plugins/codeBlock"
import { dotlist } from "./plugins/dotlist"
import { header5, header4, header3, header2, header1 } from "./plugins/header"
import { image } from "./plugins/image"
import { inlineCode } from "./plugins/inlineCode"
import { italic, unItalic } from "./plugins/italic"
import { line } from "./plugins/line"
import { quote } from "./plugins/quote"
import { scratched } from "./plugins/scratched"
import { task } from "./plugins/task"
import { markdownTable } from "./plugins/table"
import { closedHtml, html } from "./plugins/html"

var collections:Plugin[] = [
    codeBlock,
    closedHtml,
    header5,
    header4,
    header3,
    header2,
    header1,
    dotlist,
    anchor,
    bold,
    italic,
    line,
    unItalic,
    markdownTable,
    image,
    quote,
    inlineCode,
    task,
    scratched,
]

function parse(text:string) {

    let raw = ('\n' + text + '\n')

    const ordenedCollections:Plugin[] = collections.sort((a,b)=>(a.options.hideContent?0:1) - (b.options.hideContent?0:1))
    ordenedCollections.forEach(plugin => {
        raw = plugin.identifyText(raw)
    })

    ordenedCollections.forEach(plugin => {
        raw = plugin.replaceSymbols(raw)
    })

    return raw
}

export {parse,Plugin,collections}
