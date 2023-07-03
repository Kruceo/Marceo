import { numList } from './src/plugins/numlist.mjs'
import { headers } from './src/plugins/header.mjs'

import { line } from './src/plugins/line.mjs'
import { dotList } from './src/plugins/dotlist.mjs'
import { quote } from './src/plugins/quote.mjs'
import { codeBlock } from './src/plugins/codeBlock.mjs'
import { bold } from './src/plugins/bold.mjs'
import { italic } from './src/plugins/italic.mjs'

import { inlineCode } from './src/plugins/inlineCode.mjs'
import { image } from './src/plugins/image.mjs'
import { anchor } from './src/plugins/anchor.mjs'
import { emojiElement } from './src/plugins/emoji.mjs'
import { scratched } from './src/plugins/scratched.mjs'
import { task } from './src/plugins/task.mjs'
import { table, tableElement } from './src/plugins/table.mjs'
import Regex from './src/lib/Regex.mjs'
import {differentTableElement} from './src/plugins/differentTable.mjs'
import { tabBlock } from './src/plugins/tabBlock.mjs'
import { htmlTag } from './src/plugins/htmlTag.mjs'
import { breakline } from './src/plugins/breakline.mjs'



export function parse(string) {

    const NEWLINE = "\n"
    let raw = ('\n' + string + '\n')
    
    const plugins = [
        codeBlock,
        tabBlock,
        inlineCode,
        htmlTag,
        task,
        table,
        image,
        anchor,
        headers,
        quote,
        bold,
        italic,
        numList,
        dotList,
        scratched,
        line,
        new Regex('\\:'                                , "[\\w]+"              , "\\:"                  , emojiElement),
        breakline
    ]

    plugins.forEach((each, index) => {
        raw = each.applyToString(raw);
    })

    return "<div class=\"markdown background\">\n" + raw.replaceAll(NEWLINE,'\n') + "\n</div>"
}