import { numList } from './src/types/numlist.mjs'
import { headers } from './src/types/header.mjs'

import { line } from './src/types/line.mjs'
import { dotList } from './src/types/dotlist.mjs'
import { quote } from './src/types/quote.mjs'
import { codeBlock } from './src/types/codeBlock.mjs'
import { bold } from './src/types/bold.mjs'
import { italic } from './src/types/italic.mjs'

import { inlineCode } from './src/types/inlineCode.mjs'
import { image } from './src/types/image.mjs'
import { anchor } from './src/types/anchor.mjs'
import { emojiElement } from './src/types/emoji.mjs'
import { scratched } from './src/types/scratched.mjs'
import { task } from './src/types/task.mjs'
import { table, tableElement } from './src/types/table.mjs'
import Regex from './src/lib/Regex.mjs'
import {differentTableElement} from './src/types/differentTable.mjs'
import { tabBlock } from './src/types/tabBlock.mjs'
import { htmlTag } from './src/types/htmlTag.mjs'
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