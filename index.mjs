

import Match from "./src/lib/Match.mjs"
import Plugin from "./src/lib/Plugin.mjs"
import { textify } from "./src/lib/util.mjs"
import { anchor } from "./src/plugins/anchor.mjs"
import { bold } from "./src/plugins/bold.mjs"
import { breakline } from "./src/plugins/breakline.mjs"
import { codeBlock } from "./src/plugins/codeBlock.mjs"
import { dotlist } from "./src/plugins/dotlist.mjs"
import { header1, header2, header3, header4, header5 } from "./src/plugins/header.mjs"
import { image } from "./src/plugins/image.mjs"
import { inlineCode } from "./src/plugins/inlineCode.mjs"
import { italic, unItalic } from "./src/plugins/italic.mjs"
import { line } from "./src/plugins/line.mjs"
import { numlist } from "./src/plugins/numlist.mjs"
import { quote } from "./src/plugins/quote.mjs"
import { scratched } from "./src/plugins/scratched.mjs"
import { table, tableElement } from "./src/plugins/table.mjs"
import { task } from "./src/plugins/task.mjs"

export function parse(string) {

    const NEWLINE = "\n"
    let raw = ('\n' + string + '\n')

    const collections = [
        
        header5,
        header4,
        header3,
        header2,
        header1,
        dotlist,
        new Plugin(/\*\*\*/, /.+?/, /\*\*\*/, 'bolditalic', (start, content, end) => `<span class="markdown bold italic">${content}</span>`),
        bold,
        italic,
        line,
        unItalic,
        numlist,
        table,
        anchor,
        image,
        codeBlock,
        quote,
        inlineCode,
        task,
        scratched,
        // breakline

    ]

    collections.forEach(plugin => {
        raw = plugin.identifyText(raw)
    })

    collections.forEach(plugin => {
        raw = plugin.replaceSymbols(raw)
    })

    raw = raw.replaceAll("\n","_")
    // raw = textify(raw)
    // raw = raw.replaceAll("\n","$")
    return "<div class=\"markdown background\">\n" + raw.replaceAll(NEWLINE, '\n') + "\n</div>"
}
